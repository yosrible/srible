<script>
	import { onMount, createEventDispatcher, onDestroy, tick } from 'svelte';

	export let value = '';
	export const placeholder = 'Start writing...';
	export let height = '500px';

	// State for Add menu and modals
	let showAddMenu = false;
	let addMenuPosition = { x: 0, y: 0 };
	let showImageModal = false;
	let showLinkDialog = false;
	let linkUrl = 'https://'; // Default value for link
	let linkText = ''; // Text to link
	let imageType = 'online'; // 'online' or 'system'
	
	// Mutation observer for tracking changes
	let observer = null;
	
	// History tracking for undo/redo
	let editorHistory = [];
	let historyIndex = -1;
	let isUndoRedoOperation = false;
	
	// Selection state
	let savedSelection = null;

	// Editor state
	let editor;
	let renderedHTML = '';
	let preview;
	let selectionRange = null;
	let headingDropdownOpen = false;
	let lastSavedTime = null;
	let editableDiv; // Reference to contenteditable div
	let isComposing = false; // For handling IME input
	let isInEditMode = true; // Control whether we're in edit mode or preview mode
	let wordCount = 0; // Track word count
	let markdownValue = ''; // Internal markdown representation

	const dispatch = createEventDispatcher();

	// Calculate word count
	function countWords(text) {
		if (!text) return 0;
		return text
			.trim()
			.split(/\s+/)
			.filter((word) => word.length > 0).length;
	}

	// Format the last saved time for display
	function formatLastSaved() {
		if (!lastSavedTime) return '';

		const saved = new Date(lastSavedTime);
		const now = new Date();
		const diffMs = now - saved;
		const diffSec = Math.floor(diffMs / 1000);

		if (diffSec < 5) return 'Just now';
		if (diffSec < 60) return `${diffSec} seconds ago`;
		if (diffSec < 3600)
			return `${Math.floor(diffSec / 60)} minute${Math.floor(diffSec / 60) > 1 ? 's' : ''} ago`;
		if (diffSec < 86400)
			return `${Math.floor(diffSec / 3600)} hour${Math.floor(diffSec / 3600) > 1 ? 's' : ''} ago`;
		return saved.toLocaleDateString();
	}

	// Convert markdown to HTML for preview
	function renderMarkdown(markdown) {
		if (!markdown) return '';

		// Convert headers
		let html = markdown
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			// Bold and italic - handle bold first because it has more asterisks
			.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
			.replace(/\*(.*?)\*/gim, '<em>$1</em>')
			// Underline and strikethrough
			.replace(/__(.*?)__/gim, '<u>$1</u>')
			.replace(/~~(.*?)~~/gim, '<s>$1</s>')
			// Links
			.replace(
				/\[([^\]]+)\]\(([^)]+)\)/gim,
				'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
			)
			// Images
			.replace(/!\[([^\]]+)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="editor-image">')
			// Code blocks
			.replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')
			// Inline code
			.replace(/`([^`]+)`/gim, '<code>$1</code>')
			// Lists - unordered
			.replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
			.replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
			// Lists - ordered
			.replace(/^\d\. (.*$)/gim, '<ol><li>$1</li></ol>')
			// Blockquotes
			.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
			// Horizontal rules
			.replace(/^---$/gim, '<hr>')
			// Paragraphs
			.replace(/\n\s*\n/gim, '</p><p>');

		// Clean up list items (remove duplicate ul/ol tags)
		html = html.replace(/<\/ul><ul>/gim, '').replace(/<\/ol><ol>/gim, '');

		// Wrap with paragraph if not starting with a block element
		if (
			!html.startsWith('<h1>') &&
			!html.startsWith('<h2>') &&
			!html.startsWith('<h3>') &&
			!html.startsWith('<ul>') &&
			!html.startsWith('<ol>') &&
			!html.startsWith('<blockquote>') &&
			!html.startsWith('<pre>')
		) {
			html = '<p>' + html;
		}

		if (
			!html.endsWith('</p>') &&
			!html.endsWith('</h1>') &&
			!html.endsWith('</h2>') &&
			!html.endsWith('</h3>') &&
			!html.endsWith('</blockquote>') &&
			!html.endsWith('</pre>')
		) {
			html = html + '</p>';
		}

		return html;
	}

	// Save selection range
	function saveSelection() {
		if (!isInEditMode || !editableDiv) return;
		
		const selection = window.getSelection();
		if (selection.rangeCount > 0) {
			selectionRange = selection.getRangeAt(0).cloneRange();
			savedSelection = selectionRange;
		}
	}

	// Restore selection
	function restoreSelection() {
		if (!isInEditMode || !editableDiv || !selectionRange) return;

		// Make sure we have focus
		editableDiv.focus();
		
		try {
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(selectionRange);
		} catch (e) {
			console.error('Error restoring selection:', e);
		}
	}

	// Handle paste events to preserve formatting
	function handlePaste(e) {
		// Prevent the default paste
		e.preventDefault();
		
		// Get text representation
		const text = e.clipboardData.getData('text/plain');
		const html = e.clipboardData.getData('text/html');
		
		// If we have HTML, use it (with sanitization)
		if (html) {
			// Use the cleanHTML function to sanitize the pasted HTML
			const cleanHtml = html
				.replace(/<\/?(meta|script|link|xml|script)[^>]*>/gi, '') // Remove dangerous tags
				.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ''); // Remove style tags
				
			// Insert at cursor
			document.execCommand('insertHTML', false, cleanHtml);
		} else {
			// Fall back to plain text
			document.execCommand('insertText', false, text);
		}
		
		// Make sure to update our storage
		handleChange();
	}

	// Convert HTML content to markdown for storage
	function htmlToMarkdown(html) {
		// This is a simple conversion - in production you'd want a more robust solution
		let markdown = html
			.replace(/<strong>(.*?)<\/strong>/gim, '**$1**')
			.replace(/<em>(.*?)<\/em>/gim, '*$1*')
			.replace(/<h1>(.*?)<\/h1>/gim, '# $1')
			.replace(/<h2>(.*?)<\/h2>/gim, '## $1')
			.replace(/<h3>(.*?)<\/h3>/gim, '### $1')
			.replace(/<a href="(.*?)".*?>(.*?)<\/a>/gim, '[$2]($1)')
			.replace(/<img src="(.*?)".*?>/gim, '![]($1)')
			.replace(/<pre><code>(.*?)<\/code><\/pre>/gims, '```$1```')
			.replace(/<code>(.*?)<\/code>/gim, '`$1`')
			.replace(/<ul><li>(.*?)<\/li><\/ul>/gim, '* $1')
			.replace(/<ol><li>(.*?)<\/li><\/ol>/gim, '1. $1')
			.replace(/<blockquote>(.*?)<\/blockquote>/gim, '> $1')
			.replace(/<hr>/gim, '---')
			.replace(/<p>(.*?)<\/p>/gim, '$1\n\n')
			.replace(/<br>/gim, '\n');
		
		// Clean up any remaining HTML tags and entities
		markdown = markdown.replace(/<[^>]*>/g, '');
		return markdown.trim();
	}

	// Handle content change and dispatch events
	// Reactive declarations for save status
	let isSaving = false;
	let saveTimer;
	let saveStatusText = '';
	let saveInterval;

	// Initialize save status
	onMount(() => {
		saveStatusText = formatLastSaved();
		saveInterval = setInterval(() => {
			if (!isSaving) {
					saveStatusText = formatLastSaved();
			}
		}, 10000); // Update every 10 seconds

		return () => {
			if (saveInterval) clearInterval(saveInterval);
			if (saveTimer) clearTimeout(saveTimer);
		};
	});

	// Custom undo operation that works consistently
	function undoOperation() {
		if (historyIndex > 0) {
			isUndoRedoOperation = true;
			historyIndex--;
			if (editableDiv && editorHistory[historyIndex]) {
				editableDiv.innerHTML = editorHistory[historyIndex];
			}
			isUndoRedoOperation = false;
			handleChange();
		}
	}
	
	// Custom redo operation that works consistently
	function redoOperation() {
		if (historyIndex < editorHistory.length - 1) {
			isUndoRedoOperation = true;
			historyIndex++;
			if (editableDiv && editorHistory[historyIndex]) {
				editableDiv.innerHTML = editorHistory[historyIndex];
			}
			isUndoRedoOperation = false;
			handleChange();
		}
	}

	function handleChange() {
		// When editableDiv content changes, convert HTML to markdown for storage
		if (editableDiv) {
			// Get the HTML content from the editable div
			const htmlContent = editableDiv.innerHTML;
			
			// Don't process empty content
			if (!htmlContent.trim()) {
				value = '';
				markdownValue = '';
				wordCount = 0;
				dispatch('change', value);
				return;
			}
			
			// Add to history if this is not an undo/redo operation
			if (!isUndoRedoOperation) {
				// If we're in the middle of the history, truncate
				if (historyIndex < editorHistory.length - 1) {
					editorHistory = editorHistory.slice(0, historyIndex + 1);
				}
				
				// Add current state to history
				editorHistory.push(htmlContent);
				historyIndex = editorHistory.length - 1;
			}
			
			// Convert HTML to markdown for storage
			try {
				markdownValue = htmlToMarkdown(htmlContent);
				value = markdownValue; // Update the bound value
				
				// Update word count
				wordCount = countWords(markdownValue);
				
				// Dispatch change event
				dispatch('change', value);
			} catch (e) {
				console.error('Error converting HTML to markdown:', e);
			}
		}

		// Set saving status
		isSaving = true;
		saveStatusText = 'Saving...';

		// Clear previous save timer
		if (saveTimer) clearTimeout(saveTimer);

		// Save to local storage with debounce
		if (typeof localStorage !== 'undefined') {
			saveTimer = setTimeout(() => {
				const data = {
					content: value,
					timestamp: new Date().toISOString(),
					wordCount: wordCount
				};
				localStorage.setItem('srible_editor_content', JSON.stringify(data));
				lastSavedTime = data.timestamp;

				// Reset saving status after saving
				isSaving = false;
				saveStatusText = formatLastSaved();
			}, 1000); // Debounce saving by 1 second
		}

		if (!isInEditMode && preview) {
			preview.innerHTML = renderMarkdown(value);
		}
	}

	// Apply formatting to selected text
	function insertFormatting(type) {
		if (!isInEditMode || !editableDiv) return;

		// Make sure the editor has focus
		editableDiv.focus();
		
		// Get selected text and range
		const selection = window.getSelection();
		let selectedText = '';
		
		if (selection.rangeCount > 0) {
			selectedText = selection.toString();
		}
		
		// Apply formatting based on type using document.execCommand
		console.log('Applying formatting:', type, 'to selection:', selectedText);
		switch (type) {
			case 'h1':
				// Only apply to selection or current line
				if (selectedText) {
					// If text is selected, wrap it in h1 tags
					const h1Element = document.createElement('h1');
					h1Element.textContent = selectedText;
					
					// Replace the selection with the h1 element
					selection.deleteFromDocument();
					selection.getRangeAt(0).insertNode(h1Element);
				} else {
					// If no selection, apply to current line/paragraph
					document.execCommand('formatBlock', false, '<h1>');
				}
				break;
			case 'h2':
				if (selectedText) {
					// If text is selected, wrap it in h2 tags
					const h2Element = document.createElement('h2');
					h2Element.textContent = selectedText;
					
					// Replace the selection with the h2 element
					selection.deleteFromDocument();
					selection.getRangeAt(0).insertNode(h2Element);
				} else {
					// If no selection, apply to current line/paragraph
					document.execCommand('formatBlock', false, '<h2>');
				}
				break;
			case 'h3':
				if (selectedText) {
					// If text is selected, wrap it in h3 tags
					const h3Element = document.createElement('h3');
					h3Element.textContent = selectedText;
					
					// Replace the selection with the h3 element
					selection.deleteFromDocument();
					selection.getRangeAt(0).insertNode(h3Element);
				} else {
					// If no selection, apply to current line/paragraph
					document.execCommand('formatBlock', false, '<h3>');
				}
				break;
			case 'normal':
				if (selectedText) {
					// If text is selected, wrap it in p tags
					const pElement = document.createElement('p');
					pElement.textContent = selectedText;
					
					// Replace the selection with the p element
					selection.deleteFromDocument();
					selection.getRangeAt(0).insertNode(pElement);
				} else {
					// If no selection, apply to current line/paragraph
					document.execCommand('formatBlock', false, '<p>');
				}
				break;

			case 'bold':
				document.execCommand('bold', false, null);
				break;

			case 'italic':
				document.execCommand('italic', false, null);
				break;

			case 'strikethrough':
				document.execCommand('strikeThrough', false, null);
				break;

			case 'underline':
				document.execCommand('underline', false, null);
				break;

			case 'link':
				// Use a better link dialog instead of prompt
				showLinkDialog = true;
				// Save selection state for when dialog completes
				saveSelection();
				break;

			case 'image':
				// Show the image selection modal instead of prompt
				showImageModal = true;
				break;

			case 'code':
				if (selection.toString()) {
					// Inline code for selection
					const codeElement = document.createElement('code');
					codeElement.textContent = selection.toString();
					
					// Replace the selection with the code element
					selection.deleteFromDocument();
					selection.getRangeAt(0).insertNode(codeElement);
				} else {
					// Insert a new code element
					const codeElement = document.createElement('code');
					codeElement.textContent = 'code';
					selection.getRangeAt(0).insertNode(codeElement);
				}
				break;

			case 'codeblock':
				// Create a pre element for code block
				const preElement = document.createElement('pre');
				const codeElement = document.createElement('code');
				
				if (selection.toString()) {
					codeElement.textContent = selection.toString();
				} else {
					codeElement.textContent = 'Code block';
				}
				
				preElement.appendChild(codeElement);
				
				// Replace the selection with the pre element
				selection.deleteFromDocument();
				selection.getRangeAt(0).insertNode(preElement);
				break;

			case 'quote':
				document.execCommand('formatBlock', false, 'blockquote');
				break;

			case 'ul':
				document.execCommand('insertUnorderedList', false, null);
				break;

			case 'ol':
				document.execCommand('insertOrderedList', false, null);
				break;

			case 'hr':
				document.execCommand('insertHorizontalRule', false, null);
				break;
		}

		// Make sure the editable div has focus
		editableDiv.focus();
		
		// This will trigger handleChange to update markdown and storage
		handleChange();
	}

	// Handle focus event on editor
	function handleFocus(event) {
		// Dispatch focus event
		dispatch('focus', event);
	}

	// Handle blur event on editor
	function handleBlur(event) {
		// Dispatch blur event
		dispatch('blur', event);
	}

	// Handle keydown event on editor
	function handleKeyDown(event) {
		// Only need to handle special keys, normal typing works automatically
		if (event.key === 'Enter' && !event.shiftKey) {
			// Normal enter should create a new paragraph
			event.preventDefault();
			document.execCommand('insertParagraph', false, null);
		} else if (event.key === 'Enter' && event.shiftKey) {
			// Shift+Enter for line break
			event.preventDefault();
			document.execCommand('insertLineBreak', false, null);
		}
	}

	// Handle select event on editor
	function handleSelect(event) {
		// Update selection range
		saveSelection();
	}

	// Process the markdown to HTML when component initializes
	function processMarkdown() {
		if (value) {
			renderedHTML = renderMarkdown(value);
			
			// Important: Update the editableDiv with the rendered HTML if it exists
			if (editableDiv) {
				editableDiv.innerHTML = renderedHTML;
				
				// Add delete controls to images after rendering
				addImageControls();
			}
		}
	}

	// Add delete controls to all images in the editor
	function addImageControls() {
		if (!editableDiv) return;
		
		const images = editableDiv.querySelectorAll('img:not(.has-controls)');
		if (images.length === 0) return; // No new images to process
		
		console.log('Adding controls to', images.length, 'images');
		
		images.forEach(img => {
			// Add control class
			img.classList.add('has-controls');
			
			// Create container for image and controls
			const container = document.createElement('div');
			container.className = 'image-container';
			
			// Set image styling directly
			img.style.maxWidth = '100%';
			img.style.display = 'block';
			img.style.cursor = 'pointer';
			
			// Create delete button
			const deleteBtn = document.createElement('button');
			deleteBtn.className = 'image-delete-btn';
			deleteBtn.innerHTML = 'Delete';
			deleteBtn.title = 'Delete image';
			
			// Add the event listener
			deleteBtn.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				container.remove();
				handleChange();
			});
			
			// Show delete button when image is clicked
			let isDeleteVisible = false;
			img.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				// Toggle delete button visibility
				isDeleteVisible = !isDeleteVisible;
				deleteBtn.style.display = isDeleteVisible ? 'flex' : 'none';
			});
			
			// Handle clicking outside to hide delete button
			document.addEventListener('click', function(e) {
				if (e.target !== img && e.target !== deleteBtn) {
					isDeleteVisible = false;
					deleteBtn.style.display = 'none';
				}
			});
			
			// Replace the image with our container
			if (img.parentNode) {
				// Apply container styles inline to ensure they're applied
				container.style.display = 'inline-block';
				container.style.position = 'relative';
				container.style.margin = '5px 0';
				
				// Apply delete button styles inline for better visibility
				deleteBtn.style.position = 'absolute';
				deleteBtn.style.top = '0';
				deleteBtn.style.right = '0';
				deleteBtn.style.backgroundColor = 'red';
				deleteBtn.style.color = 'white';
				deleteBtn.style.border = 'none';
				deleteBtn.style.padding = '4px 8px';
				deleteBtn.style.fontSize = '12px';
				deleteBtn.style.cursor = 'pointer';
				deleteBtn.style.display = 'none'; // Initially hidden
				deleteBtn.style.zIndex = '999';
				
				img.parentNode.insertBefore(container, img);
				container.appendChild(img);
				container.appendChild(deleteBtn);
			}
		});
	}
	
	// Initialize the editor with the proper content
	function initializeEditor() {
		if (!editableDiv) return;
		
		// Make sure we use sanitized HTML
		const sanitizeOptions = {
			ALLOWED_TAGS: ['strong', 'em', 'p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img', 'hr', 'br', 'div', 'span', 'u', 's'],
			ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style']
		};
		
		// Start with clean slate
		editableDiv.innerHTML = '';
		
		// If there's saved content, render it
		if (value) {
			console.log('Initializing editor with value:', value);
			editableDiv.innerHTML = renderMarkdown(value);
		}
		
		// Make sure paste events also work with formatting
		editableDiv.addEventListener('paste', handlePaste);
		
		// Use the existing saveSelection function defined at the top level
		
		// Use the existing restoreSelection function defined at the top level

		// Add mutation observer to keep markdown sync with HTML
		function setupMutationObserver() {
			if (!editableDiv) return;
			
			// Disconnect any existing observer
			if (observer) {
				observer.disconnect();
			}
			
			// Create new mutation observer
			observer = new MutationObserver((mutations) => {
				// Process mutations
				handleChange();
				
				// Look for images and add controls
				addImageControls();
			});
			
			// Start observing
			observer.observe(editableDiv, {
				childList: true,
				subtree: true,
				characterData: true,
				attributes: true
			});
		}
		
		// Initialize mutation observer
		setupMutationObserver();
	}

	onMount(async () => {
		// Wait for the DOM to be ready
		await tick();
		
		// Initialize the editor with content
		initializeEditor();

		// Force re-render to ensure proper initialization
		await tick();
		
		// Apply saved content to editable div
		if (editableDiv && value) {
			// Convert markdown to HTML for the editable div
			editableDiv.innerHTML = renderMarkdown(value);
		}

		// Apply keyboard shortcuts for formatting
		if (editableDiv) {
			// Make sure execCommand works by adding appropriate event handlers
			editableDiv.addEventListener('keydown', (e) => {
				// Bold: Ctrl+B
				if (e.ctrlKey && e.key === 'b') {
					e.preventDefault();
					document.execCommand('bold', false, null);
				}
				// Italic: Ctrl+I
				else if (e.ctrlKey && e.key === 'i') {
					e.preventDefault();
					document.execCommand('italic', false, null);
				}
				// Underline: Ctrl+U
				else if (e.ctrlKey && e.key === 'u') {
					e.preventDefault();
					document.execCommand('underline', false, null);
				}
			});
		}

		console.log('Editor mounted, isInEditMode:', isInEditMode);
	});

	// Clean up event listeners on destroy
	onDestroy(() => {
		if (editableDiv) {
			editableDiv.removeEventListener('paste', handlePaste);
			editableDiv.removeEventListener('keydown', handleKeyDown);
		}
		
		// Disconnect the mutation observer
		if (observer) {
			observer.disconnect();
		}
	});

	// Get any previously saved content
	try {
		const savedContent = localStorage.getItem('srible_editor_content') || '';
		if (savedContent) {
			const savedData = JSON.parse(savedContent);
			value = savedData.content || '';
			lastSavedTime = savedData.timestamp || null;
			
			// Make sure to process the loaded markdown
			markdownValue = value;
			renderedHTML = renderMarkdown(value);
		}
	} catch (e) {
		console.error('Error loading saved content:', e);
	}
</script>

<div class="editor-canvas">
	<!-- Toolbar at the top -->
	<div class="editor-toolbar">
		<div class="toolbar-left">
			<button
				type="button"
				class="back-button"
				on:click={() => window.history.back()}
				title="Back to Posts"
				aria-label="Back to Posts"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg
				>
				<span>Posts</span>
			</button>
		</div>

		<div class="toolbar-center">
			<button
				type="button"
				class="toolbar-button"
				on:click={() => {
					if (editableDiv) {
						// Ensure focus before undo
						editableDiv.focus();
						
						// Direct undo implementation that works consistently
						undoOperation();
					}
				}}
				title="Undo"
				aria-label="Undo"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></svg
				>
			</button>

			<button
				type="button"
				class="toolbar-button"
				on:click={() => {
					if (editableDiv) {
						// Ensure focus before redo
						editableDiv.focus();
						
						// Direct redo implementation that works consistently
						redoOperation();
					}
				}}
				title="Redo"
				aria-label="Redo"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="m15 14 5-5-5-5" /><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" /></svg
				>
			</button>

			<div class="toolbar-separator"></div>

			<!-- Heading buttons -->
			<button
				type="button"
				class="toolbar-button heading-button"
				on:click={() => insertFormatting('h1')}
				aria-label="Heading 1"
				title="Heading 1"
			>
				<span class="heading-label">H1</span>
			</button>

			<button
				type="button"
				class="toolbar-button heading-button"
				on:click={() => insertFormatting('h2')}
				aria-label="Heading 2"
				title="Heading 2"
			>
				<span class="heading-label">H2</span>
			</button>

			<button
				type="button"
				class="toolbar-button heading-button"
				on:click={() => insertFormatting('h3')}
				aria-label="Heading 3"
				title="Heading 3"
			>
				<span class="heading-label">H3</span>
			</button>

			<button
				type="button"
				class="toolbar-button heading-button"
				on:click={() => insertFormatting('normal')}
				aria-label="Normal text"
				title="Normal text"
			>
				<span class="heading-label">T</span>
			</button>

			<div class="toolbar-separator"></div>

			<!-- List options -->
			<button
				type="button"
				class="toolbar-button"
				on:click={() => insertFormatting('ul')}
				title="Bulleted List"
				aria-label="Insert bulleted list"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"
					></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"
					></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line
						x1="3"
						y1="18"
						x2="3.01"
						y2="18"
					></line></svg
				>
			</button>

			<button
				type="button"
				class="toolbar-button"
				on:click={() => insertFormatting('ol')}
				title="Numbered List"
				aria-label="Insert numbered list"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"
					></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path
						d="M4 10h2"
					></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg
				>
			</button>

			<div class="toolbar-separator"></div>

			<!-- Text formatting -->
			<button
				type="button"
				class="toolbar-button"
				on:click={() => insertFormatting('bold')}
				title="Bold"
				aria-label="Make text bold"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M14 12a4 4 0 0 0 0-8H6v8" /><path d="M15 20a4 4 0 0 0 0-8H6v8Z" /></svg
				>
			</button>

			<button
				type="button"
				class="toolbar-button"
				on:click={() => insertFormatting('italic')}
				title="Italic"
				aria-label="Italicize text"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><line x1="19" x2="10" y1="4" y2="4" /><line x1="14" x2="5" y1="20" y2="20" /><line
						x1="15"
						x2="9"
						y1="4"
						y2="20"
					/></svg
				>
			</button>

			<button
				type="button"
				class="toolbar-button"
				on:click={() => insertFormatting('strikethrough')}
				title="Strikethrough"
				aria-label="Strikethrough text"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M17 9V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v3" /><path
						d="M16 15v2a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2"
					/><path d="M3 9h18" /></svg
				>
			</button>

			<button
				type="button"
				class="toolbar-button"
				on:click={() => insertFormatting('underline')}
				title="Underline"
				aria-label="Underline text"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4" /><path d="M4 20h16" /></svg
				>
			</button>

			<div class="toolbar-separator"></div>

			<!-- Additional formatting -->
			<button
				type="button"
				class="toolbar-button"
				on:click={() => insertFormatting('link')}
				title="Link"
				aria-label="Insert link"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path
						d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
					/></svg
				>
			</button>

			<button
				type="button"
				class="toolbar-button"
				on:click={() => insertFormatting('code')}
				title="Code"
				aria-label="Insert code"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg
				>
			</button>

			<div class="toolbar-separator"></div>

			<button
				type="button"
				class="toolbar-button add-button"
				on:click={(e) => {
					showAddMenu = !showAddMenu;
					const rect = e.currentTarget.getBoundingClientRect();
					addMenuPosition = { x: rect.left, y: rect.bottom };
				}}
				title="Add"
				aria-label="Add elements"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></svg
				>
				<span>Add</span>
			</button>
			
			{#if showAddMenu}
			<div class="add-menu" style="left: {addMenuPosition.x}px; top: {addMenuPosition.y}px;">
				<button class="add-item" on:click={() => { insertFormatting('image'); showAddMenu = false; }}>Image</button>
				<button class="add-item" on:click={() => { insertFormatting('link'); showAddMenu = false; }}>Link</button>
				<button class="add-item" on:click={() => { insertFormatting('codeblock'); showAddMenu = false; }}>Code Block</button>
				<button class="add-item" on:click={() => { insertFormatting('quote'); showAddMenu = false; }}>Quote</button>
				<button class="add-item" on:click={() => { insertFormatting('hr'); showAddMenu = false; }}>Horizontal Rule</button>
			</div>
			{/if}
		</div>

		<div class="toolbar-right">
			{#if lastSavedTime}
				<div class="save-status" class:saving={isSaving}>{saveStatusText}</div>
			{/if}
		</div>
	</div>

	<div class="editor-container">
		<!-- Title area integrated in the canvas -->
		<div class="title-area">
			<input type="text" class="title-input" placeholder="Title" />
			<input type="text" class="subtitle-input" placeholder="Subtitle" />
			<button class="featured-image-button" on:click={() => {
				// Show image upload modal for featured image
				imageType = 'system'; // Default to file upload for featured images
				showImageModal = true;
			}}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle
						cx="8.5"
						cy="8.5"
						r="1.5"
					></circle><polyline points="21 15 16 10 5 21"></polyline></svg
				>
				Add featured image
			</button>
		</div>

		<div class="editor-content" style="min-height: {height};">
			{#if isInEditMode}
				<div
					bind:this={editableDiv}
					role="textbox"
					tabindex="0"
					aria-multiline="true"
					aria-label="Text editor"
					class="markdown-editor-contenteditable"
					contenteditable="true"
					on:input={handleChange}
					on:focus={() => {
						isEditing = true;
						dispatch('focus');
					}}
					on:blur={() => {
						isEditing = false;
						dispatch('blur');
					}}
					on:keydown={handleKeyDown}
					on:keyup={() => {
						// Check for key combos?
					}}
					on:mouseup={() => {
						// Check selection?
					}}
					data-placeholder="Start writing your story..."
					style="min-height: {height};"
				></div>
				<!-- Word count display -->
				<div class="word-count">
					Word count: {wordCount}
				</div>
			{:else}
				<div class="markdown-viewer" transition:fade={{ duration: 150 }}>
					{@html renderedHTML}
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Image Selection Modal - Simplified Version -->
{#if showImageModal}
<div class="modal-overlay">
	<div class="image-modal simplified">
		<div class="tabs">
			<button class={imageType === 'online' ? 'active' : ''} on:click={() => imageType = 'online'}>URL</button>
			<button class={imageType === 'system' ? 'active' : ''} on:click={() => imageType = 'system'}>Upload</button>
		</div>
		
		<div class="modal-content">
			{#if imageType === 'online'}
				<input type="text" placeholder="Paste image URL here" id="image-url-input" autocomplete="off">
			{:else}
				<input type="file" accept="image/*" id="image-file-input">
			{/if}
		</div>
		
		<div class="modal-buttons">
			<button class="cancel" on:click={() => showImageModal = false}>Cancel</button>
			<button class="insert" on:click={() => {
				// Make sure editor has focus first
				editableDiv.focus();
				
				if (imageType === 'online') {
					const imageUrl = document.getElementById('image-url-input').value;
					if (imageUrl) {
						// Instead of using execCommand, manually create and insert the image
						const imgElement = document.createElement('img');
						imgElement.src = imageUrl;
						imgElement.alt = 'Inserted image';
						imgElement.style.maxWidth = '100%';
						
						// Insert at cursor position
						const selection = window.getSelection();
						if (selection.rangeCount > 0) {
							const range = selection.getRangeAt(0);
							range.insertNode(imgElement);
						}
					}
				} else {
					// Handle file upload
					const fileInput = document.getElementById('image-file-input');
					if (fileInput.files && fileInput.files[0]) {
						// Create a placeholder image with local URL
						const file = fileInput.files[0];
						const reader = new FileReader();
						reader.onload = function(e) {
							// Create and insert image element manually
							const imgElement = document.createElement('img');
							imgElement.src = e.target.result;
							imgElement.alt = 'Uploaded image';
							imgElement.style.maxWidth = '100%';
							
							// Insert at cursor position
							const selection = window.getSelection();
							if (selection.rangeCount > 0) {
								const range = selection.getRangeAt(0);
								range.insertNode(imgElement);
							}
							
							// Trigger change event to save content
							handleChange();
						};
						reader.readAsDataURL(file);
					}
				}
				
				// Trigger change event
				handleChange();
				showImageModal = false;
			}}>Insert Image</button>
		</div>
	</div>
</div>
{/if}

<!-- Link Dialog - Minimal Version -->
{#if showLinkDialog}
<div class="modal-overlay">
	<div class="link-modal">
		<input type="text" placeholder="Enter URL" bind:value={linkUrl} id="link-url-input">
		<div class="modal-buttons">
			<button on:click={() => showLinkDialog = false}>Cancel</button>
			<button on:click={() => {
				// Make sure the editor has focus first
				editableDiv.focus();
				
				// Restore selection
				restoreSelection();
				
				if (linkUrl) {
					// Create link
					document.execCommand('createLink', false, linkUrl);
					
					// Add target="_blank" to all links
					const links = editableDiv.querySelectorAll('a');
					links.forEach(link => {
						link.setAttribute('target', '_blank');
						link.setAttribute('rel', 'noopener noreferrer');
					});
					
					// Update content
					handleChange();
				}
				
				// Reset and close dialog
				linkUrl = 'https://';
				showLinkDialog = false;
			}}>Insert Link</button>
		</div>
	</div>
</div>
{/if}

<style>
	/* Minimal word count */
	.word-count {
		position: fixed;
		bottom: 10px;
		right: 10px;
		background-color: rgba(0, 0, 0, 0.3);
		color: white;
		padding: 3px 8px;
		border-radius: 10px;
		font-size: 12px;
		user-select: none;
		opacity: 0.7;
		transition: opacity 0.2s;
	}
	
	.word-count:hover {
		opacity: 1;
	}
	
	/* Image styles applied inline for better compatibility */
	:global(img.has-controls) {
		max-width: 100%;
		display: block;
	}
	
	:global(.image-container) {
		display: inline-block;
		position: relative;
		margin: 5px 0;
	}
	
	:global(.image-delete-btn) {
		position: absolute;
		top: 8px;
		right: 8px;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		border: none;
		border-radius: 50%;
		width: 25px;
		height: 25px;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.2s;
	}
	
	:global(.image-container:hover .image-delete-btn) {
		opacity: 1;
	}

	/* Overlay for modals */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}
	
	/* Link dialog - ultra minimal */
	.link-modal {
		background-color: white;
		border-radius: 8px;
		width: 300px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	}
	
	.link-modal input {
		width: 100%;
		padding: 12px 15px;
		border: none;
		border-bottom: 1px solid #eee;
		font-size: 14px;
		outline: none;
	}
	
	.link-modal .modal-buttons {
		display: flex;
	}
	
	.link-modal .modal-buttons button {
		flex: 1;
		padding: 10px;
		background: none;
		border: none;
		border-right: 1px solid #eee;
		cursor: pointer;
		font-size: 14px;
	}
	
	.link-modal .modal-buttons button:last-child {
		color: #4a90e2;
		font-weight: bold;
		border-right: none;
	}
	
	.image-modal.simplified {
		background-color: white;
		border-radius: 8px;
		padding: 0;
		width: 300px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	}
	
	.tabs {
		display: flex;
		width: 100%;
		border-bottom: 1px solid #eee;
	}
	
	.tabs button {
		flex: 1;
		padding: 10px;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 14px;
		color: #666;
	}
	
	.tabs button.active {
		background-color: #f9f9f9;
		font-weight: bold;
		color: #333;
		border-bottom: 2px solid #4a90e2;
	}
	
	.modal-content {
		padding: 15px;
	}
	
	.image-modal.simplified input[type="text"],
	.image-modal.simplified input[type="file"] {
		width: 100%;
		padding: 8px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
	}
	
	.modal-buttons {
		display: flex;
		border-top: 1px solid #eee;
	}
	
	.modal-buttons button {
		flex: 1;
		padding: 10px;
		background: none; 
		border: none;
		border-right: 1px solid #eee;
		cursor: pointer;
		font-size: 14px;
	}
	
	.modal-buttons button:last-child {
		border-right: none;
		color: #4a90e2;
		font-weight: bold;
	}

	/* Single canvas editor styles */
	:global(body.immersive-editor-mode) {
		margin: 0 !important;
		padding: 0 !important;
		background-color: #fff !important;
	}

	:global(.dashboard-content-area) {
		margin-left: 0 !important;
		padding: 0 !important;
	}

	:global(.editor-page) {
		margin: 0 !important;
		padding: 0 !important;
	}

	.editor-canvas {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		z-index: 999;
	}

	/* Container to center editor content */
	.editor-container {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		padding-top: 50px; /* Space for fixed toolbar */
	}

	/* Title area styles */
	.title-area {
		width: 100%;
		margin: 0;
		padding: 40px 20px 0;
	}

	.title-input {
		width: 100%;
		font-size: 42px;
		font-weight: 600;
		color: #333;
		border: none;
		outline: none;
		padding: 0;
		margin-bottom: 12px;
		background: transparent;
	}

	.subtitle-input {
		width: 100%;
		font-size: 22px;
		font-weight: 300;
		color: #757575;
		border: none;
		outline: none;
		padding: 0;
		margin-bottom: 20px;
		background: transparent;
	}

	.featured-image-button {
		display: flex;
		align-items: center;
		gap: 8px;
		background: transparent;
		border: none;
		color: #757575;
		font-size: 14px;
		padding: 8px 0;
		cursor: pointer;
		margin-bottom: 20px;
	}

	.featured-image-button:hover {
		color: #555;
	}

	/* Editor content styles */
	.editor-content {
		position: relative;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0;
		padding: 20px 20px 80px;
	}

	/* We're now using markdown-editor-input instead of modern-textarea */

	/* Placeholder styling for contenteditable */
	.markdown-editor-contenteditable:empty:before {
		content: attr(data-placeholder);
		color: #aaa;
		font-style: italic;
		pointer-events: none;
		display: block;
	}
	
	/* Rich text formatting styles for contenteditable */
	.markdown-editor-contenteditable strong {
		font-weight: bold;
	}
	
	.markdown-editor-contenteditable em {
		font-style: italic;
	}
	
	.markdown-editor-contenteditable h1 {
		font-size: 2em;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
		font-weight: bold;
	}
	
	.markdown-editor-contenteditable h2 {
		font-size: 1.5em;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
		font-weight: bold;
	}
	
	.markdown-editor-contenteditable h3 {
		font-size: 1.17em;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
		font-weight: bold;
	}
	
	.markdown-editor-contenteditable ul,
	.markdown-editor-contenteditable ol {
		margin-left: 1.5em;
		margin-bottom: 1em;
	}
	
	.markdown-editor-contenteditable blockquote {
		border-left: 3px solid #ccc;
		padding-left: 1em;
		margin-left: 0;
		color: #777;
	}
	
	.markdown-editor-contenteditable code {
		font-family: monospace;
		background-color: #f0f0f0;
		padding: 0.1em 0.3em;
		border-radius: 3px;
	}
	
	.markdown-editor-contenteditable pre {
		font-family: monospace;
		background-color: #f0f0f0;
		padding: 0.5em;
		border-radius: 3px;
		white-space: pre-wrap;
		margin: 1em 0;
	}
	
	.markdown-editor-contenteditable a {
		color: #0366d6;
		text-decoration: underline;
	}
	
	.markdown-editor-contenteditable hr {
		border: none;
		border-top: 1px solid #ddd;
		margin: 1em 0;
	}

	/* Editor input styles */
	.markdown-editor-contenteditable,
	.markdown-editor-input,
	.markdown-viewer {
		width: 100%;
		font-size: 1.1rem;
		line-height: 1.6;
		padding: 20px 0;
		color: #2c3e50;
		flex-grow: 1;
	}

	.markdown-editor-input,
	.markdown-editor-contenteditable {
		border: none;
		outline: none;
		resize: none;
		min-height: 300px;
		height: 100%;
		background-color: transparent;
		font-family: Georgia, serif;
	}

	/* Removed unused content-editable styles */

	/* Rich text styles for the editable div using :global() to handle dynamic content */
	:global(.content-editable h1) {
		font-size: 32px;
		font-weight: bold;
		margin-bottom: 12px;
	}

	:global(.content-editable h2) {
		font-size: 28px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	:global(.content-editable h3) {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 8px;
	}

	:global(.content-editable b),
	:global(.content-editable strong) {
		font-weight: bold;
	}

	:global(.content-editable i),
	:global(.content-editable em) {
		font-style: italic;
	}

	:global(.content-editable u) {
		text-decoration: underline;
	}

	:global(.content-editable s),
	:global(.content-editable strike),
	:global(.content-editable del) {
		text-decoration: line-through;
	}

	:global(.content-editable a) {
		color: #0066cc;
		text-decoration: underline;
	}

	:global(.content-editable code) {
		font-family: monospace;
		background: rgba(0, 0, 0, 0.05);
		padding: 2px 4px;
		border-radius: 3px;
	}

	:global(.content-editable ul) {
		list-style-type: disc;
		margin-left: 20px;
	}

	:global(.content-editable ol) {
		list-style-type: decimal;
		margin-left: 20px;
	}

	/* Toolbar styles */
	.editor-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 12px;
		background-color: transparent;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		width: 100%;
		margin: 0;
		height: 50px;
	}

	.toolbar-left,
	.toolbar-right {
		min-width: 120px;
		display: flex;
		align-items: center;
	}

	.save-status {
		color: #4caf50;
		font-size: 12px;
		white-space: nowrap;
		display: flex;
		align-items: center;
		transition: opacity 0.3s ease;
	}

	.save-status.saving {
		opacity: 0.8;
	}

	.save-status::before {
		content: '';
		display: inline-block;
		width: 4px;
		height: 4px;
		background-color: #4caf50;
		border-radius: 50%;
		margin-right: 6px;
		animation: pulse 1.5s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.8);
			opacity: 0.8;
		}
		50% {
			transform: scale(1.2);
			opacity: 1;
		}
		100% {
			transform: scale(0.8);
			opacity: 0.8;
		}
	}

	.save-status {
		color: #888;
		font-size: 12px;
		white-space: nowrap;
	}

	.toolbar-center {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		overflow-x: auto;
	}

	@media (max-width: 768px) {
		.toolbar-center {
			justify-content: flex-start;
			overflow-x: auto;
			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		.toolbar-center::-webkit-scrollbar {
			display: none;
		}

		.toolbar-right {
			display: none;
		}

		.back-button span {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.toolbar-button[title='Add'] span {
			display: none;
		}
	}

	.back-button {
		display: flex;
		align-items: center;
		background: none;
		border: none;
		color: #333;
		font-size: 14px;
		padding: 8px 12px;
		cursor: pointer;
		transition: all 0.2s;
		border-radius: 4px;
	}

	.back-button:hover {
		background-color: rgba(0, 0, 0, 0.05);
		color: #000;
	}

	.back-button svg {
		stroke: #333;
	}

	.back-button span {
		margin-left: 6px;
		font-weight: 500;
	}

	.toolbar-button {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		border-radius: 4px;
		color: #333;
		padding: 4px 6px;
		margin: 0 1px;
		cursor: pointer;
		transition: all 0.2s ease;
		height: 32px;
	}

	.toolbar-button:hover {
		background-color: rgba(0, 0, 0, 0.05);
		transform: translateY(-1px);
	}

	.toolbar-button:active {
		transform: translateY(0);
	}

	.toolbar-button svg {
		stroke: #333;
		width: 18px;
		height: 18px;
	}

	/* Heading button styles */
	.heading-button {
		font-family:
			'SF Pro Display',
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
		min-width: 30px;
		position: relative;
	}

	.heading-label {
		font-weight: 600;
		font-size: 14px;
	}

	.heading-button:hover .heading-label {
		color: #4caf50;
	}

	.toolbar-separator {
		width: 1px;
		height: 24px;
		background-color: rgba(0, 0, 0, 0.15);
		margin: 0 4px;
	}

	.add-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: auto;
		padding: 6px 12px;
	}

	.add-button span {
		margin-left: 4px;
		font-size: 14px;
	}

	/* Markdown viewer styles */
	.markdown-viewer {
		min-height: 300px;
		color: #333;
		line-height: 1.8;
		background-color: transparent;
		font-family: Georgia, serif;
		font-size: 18px;
	}

	/* Global markdown preview styles */
	:global(.markdown-viewer h1) {
		font-size: 2.25rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	:global(.markdown-viewer h2) {
		font-size: 1.75rem;
		margin-top: 1.75rem;
		margin-bottom: 0.75rem;
		font-weight: 600;
	}

	:global(.markdown-viewer h3) {
		font-size: 1.5rem;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		font-weight: 600;
	}

	:global(.markdown-viewer p) {
		margin-bottom: 1.25rem;
		line-height: 1.8;
	}

	:global(.markdown-viewer a) {
		color: #0066cc;
		text-decoration: none;
	}

	:global(.markdown-viewer a:hover) {
		text-decoration: underline;
	}

	:global(.markdown-viewer ul),
	:global(.markdown-viewer ol) {
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
	}

	:global(.markdown-viewer li) {
		margin-bottom: 0.5rem;
		line-height: 1.7;
	}

	:global(.markdown-viewer blockquote) {
		border-left: 4px solid #e0e0e0;
		padding-left: 1rem;
		margin-left: 0;
		margin-bottom: 1.25rem;
		font-style: italic;
		color: #555;
	}

	:global(.markdown-viewer pre) {
		background-color: #f5f5f5;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		margin-bottom: 1.25rem;
	}

	:global(.markdown-viewer code) {
		font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
		font-size: 0.9em;
		background-color: #f5f5f5;
		padding: 0.2em 0.4em;
		border-radius: 3px;
	}

	:global(.markdown-viewer hr) {
		border: 0;
		border-top: 1px solid #e0e0e0;
		margin: 1.5rem 0;
	}

	:global(.markdown-viewer img) {
		max-width: 100%;
		height: auto;
		margin: 1rem 0;
		border-radius: 0.375rem;
	}

	/* Image styles are now handled by the global markdown-viewer img selector */

	/* Add menu styles */
	.add-menu {
		position: absolute;
		background-color: white;
		border: 1px solid #eee;
		border-radius: 4px;
		box-shadow: 0 2px 6px rgba(0,0,0,0.1);
		z-index: 1002;
		display: flex;
		flex-direction: column;
		min-width: 140px;
	}
	
	.add-item {
		padding: 8px 12px;
		background: none;
		border: none;
		text-align: left;
		font-size: 14px;
		color: #333;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	
	.add-item:hover {
		background-color: #f5f5f5;
		color: #4CAF50;
	}
</style>
