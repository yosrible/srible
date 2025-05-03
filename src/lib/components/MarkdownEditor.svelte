<script>
	import { onMount, createEventDispatcher, onDestroy, tick } from 'svelte';

	export let value = '';
	export const placeholder = 'Start writing...';
	export let height = '500px';

	// State for Add menu
	let showAddMenu = false;
	let addMenuPosition = { x: 0, y: 0 };

	// Editor state
	let editor;
	let renderedHTML = '';
	let preview;
	let selectionRange = { start: 0, end: 0 };
	let headingDropdownOpen = false;
	let lastSavedTime = null;
	let editableDiv; // Reference to contenteditable div
	let isComposing = false; // For handling IME input
	let isInEditMode = true; // Control whether we're in edit mode or preview mode
	let wordCount = 0; // Track word count

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
			// Bold and italic
			.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
			.replace(/\*(.*?)\*/gim, '<em>$1</em>')
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
		if (!isInEditMode || !editor) return;

		selectionRange = {
			start: editor.selectionStart,
			end: editor.selectionEnd
		};
	}

	// Restore selection
	function restoreSelection() {
		if (!isInEditMode || !editor) return;

		editor.focus();
		editor.setSelectionRange(selectionRange.start, selectionRange.end);
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

	function handleChange() {
		// Update rendered HTML
		renderedHTML = renderMarkdown(value);

		// Update word count
		wordCount = countWords(value);

		// Dispatch change event
		dispatch('change', value);

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
		if (!isInEditMode || !editor) return;

		// Save current selection
		saveSelection();

		const selectedText = value.substring(selectionRange.start, selectionRange.end);
		let newText = '';
		let cursorPos = selectionRange.end;

		switch (type) {
			case 'h1':
			case 'h2':
			case 'h3':
				if (selectedText) {
					// Check if the selection starts at beginning of line
					const beforeSelection = value.substring(0, selectionRange.start);
					const lastNewline = beforeSelection.lastIndexOf('\n');
					const isStartOfLine =
						lastNewline === selectionRange.start - 1 || selectionRange.start === 0;

					// Create heading with appropriate number of #
					const headingPrefix = type === 'h1' ? '# ' : type === 'h2' ? '## ' : '### ';

					if (isStartOfLine) {
						newText = `${headingPrefix}${selectedText}`;
						value =
							value.substring(0, selectionRange.start) +
							newText +
							value.substring(selectionRange.end);
						cursorPos = selectionRange.start + newText.length;
					} else {
						// If not at start of line, add a newline before
						newText = `\n${headingPrefix}${selectedText}`;
						value =
							value.substring(0, selectionRange.start) +
							newText +
							value.substring(selectionRange.end);
						cursorPos = selectionRange.start + newText.length;
					}
				} else {
					// If no selection, just insert heading prefix
					const headingPrefix = type === 'h1' ? '# ' : type === 'h2' ? '## ' : '### ';
					newText = headingPrefix;
					value =
						value.substring(0, selectionRange.start) +
						newText +
						value.substring(selectionRange.end);
					cursorPos = selectionRange.start + newText.length;
				}
				break;

			case 'normal':
				if (selectedText) {
					// Remove heading markdown from the beginning if it exists
					const headingMatch = selectedText.match(/^(#{1,6})\s+(.+)$/);

					if (headingMatch) {
						// Extract the text without the heading markdown
						newText = headingMatch[2];
						value =
							value.substring(0, selectionRange.start) +
							newText +
							value.substring(selectionRange.end);
						cursorPos = selectionRange.start + newText.length;
					} else {
						// If there's no heading, do nothing
						newText = selectedText;
						cursorPos = selectionRange.end;
					}
				}
				break;

			case 'h2':
				if (selectedText) {
					const beforeSelection = value.substring(0, selectionRange.start);
					const lastNewline = beforeSelection.lastIndexOf('\n');
					const isStartOfLine =
						lastNewline === selectionRange.start - 1 || selectionRange.start === 0;

					if (isStartOfLine) {
						newText = `## ${selectedText}`;
						value =
							value.substring(0, selectionRange.start) +
							newText +
							value.substring(selectionRange.end);
						cursorPos = selectionRange.start + newText.length;
					} else {
						// Add a newline before heading
						newText = `\n## ${selectedText}`;
						value =
							value.substring(0, selectionRange.start) +
							newText +
							value.substring(selectionRange.end);
						cursorPos = selectionRange.start + newText.length;
					}
				} else {
					newText = '## Heading 2';
					value =
						value.substring(0, selectionRange.start) +
						newText +
						value.substring(selectionRange.end);
					cursorPos = selectionRange.start + newText.length;
				}
				break;

			case 'h3':
				if (selectedText) {
					const beforeSelection = value.substring(0, selectionRange.start);
					const lastNewline = beforeSelection.lastIndexOf('\n');
					const isStartOfLine =
						lastNewline === selectionRange.start - 1 || selectionRange.start === 0;

					if (isStartOfLine) {
						newText = `### ${selectedText}`;
						value =
							value.substring(0, selectionRange.start) +
							newText +
							value.substring(selectionRange.end);
						cursorPos = selectionRange.start + newText.length;
					} else {
						// Add a newline before heading
						newText = `\n### ${selectedText}`;
						value =
							value.substring(0, selectionRange.start) +
							newText +
							value.substring(selectionRange.end);
						cursorPos = selectionRange.start + newText.length;
					}
				} else {
					newText = '### Heading 3';
					value =
						value.substring(0, selectionRange.start) +
						newText +
						value.substring(selectionRange.end);
					cursorPos = selectionRange.start + newText.length;
				}
				break;

			case 'bold':
				newText = selectedText ? `**${selectedText}**` : '**bold text**';
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectedText ? selectionRange.start + newText.length : selectionRange.start + 2;
				break;

			case 'italic':
				newText = selectedText ? `*${selectedText}*` : '*italic text*';
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectedText ? selectionRange.start + newText.length : selectionRange.start + 1;
				break;

			case 'strikethrough':
				newText = selectedText ? `~~${selectedText}~~` : '~~strikethrough~~';
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectedText ? selectionRange.start + newText.length : selectionRange.start + 2;
				break;

			case 'underline':
				newText = selectedText ? `<u>${selectedText}</u>` : '<u>underlined text</u>';
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectedText ? selectionRange.start + newText.length : selectionRange.start + 3;
				break;

			case 'link':
				newText = selectedText ? `[${selectedText}](url)` : '[link text](url)';
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectedText
					? selectionRange.start + selectedText.length + 3
					: selectionRange.start + 1;
				break;

			case 'image':
				newText = selectedText ? `![${selectedText}](image-url)` : '![alt text](image-url)';
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectedText
					? selectionRange.start + selectedText.length + 4
					: selectionRange.start + 2;
				break;

			case 'code':
				newText = selectedText ? `\`${selectedText}\`` : '\`code\`';
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectedText ? selectionRange.start + newText.length : selectionRange.start + 1;
				break;

			case 'codeblock':
				newText = selectedText ? '```\n' + selectedText + '\n```' : '```\ncode block\n```';
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectedText ? selectionRange.start + newText.length : selectionRange.start + 4;
				break;

			case 'quote':
				if (selectedText) {
					// Handle multi-line quotes
					const quotedText = selectedText
						.split('\n')
						.map((line) => `> ${line}`)
						.join('\n');
					newText = quotedText;
					value =
						value.substring(0, selectionRange.start) +
						newText +
						value.substring(selectionRange.end);
					cursorPos = selectionRange.start + newText.length;
				} else {
					newText = '> quoted text';
					value =
						value.substring(0, selectionRange.start) +
						newText +
						value.substring(selectionRange.end);
					cursorPos = selectionRange.start + 2;
				}
				break;

			case 'ul':
				// Handle multi-line lists
				if (selectedText) {
					const lines = selectedText.split('\n');
					const listItems = lines.map((line) => `* ${line}`).join('\n');
					newText = listItems;
				} else {
					newText = '* ';
				}
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectionRange.start + newText.length;
				break;

			case 'ol':
				// Handle multi-line ordered lists
				if (selectedText) {
					const lines = selectedText.split('\n');
					const listItems = lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
					newText = listItems;
				} else {
					newText = '1. ';
				}
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectionRange.start + newText.length;
				break;

			case 'hr':
				newText = '\n---\n';
				value =
					value.substring(0, selectionRange.start) + newText + value.substring(selectionRange.end);
				cursorPos = selectionRange.start + newText.length;
				break;
		}

		// Update the editor value
		editor.value = value;

		// Maintain focus and update cursor position
		editor.focus();
		editor.setSelectionRange(cursorPos, cursorPos);

		// Update rendered HTML and word count
		handleChange();
	}

	// No duplicate function needed - handleChange is already defined above

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
		// Handle Enter key to insert line breaks
		if (event.key === 'Enter') {
			event.preventDefault();
			document.execCommand('insertLineBreak', false, null);
		}
	}

	// Handle select event on editor
	function handleSelect(event) {
		// Update selection range
		saveSelection();
	}

	onMount(() => {
		// Initial markdown processing
		processMarkdown();

		// Apply saved content to editable div
		if (editableDiv && value) {
			// Convert markdown to HTML for the editable div
			editableDiv.innerHTML = renderMarkdown(value);
		}

		console.log('Editor mounted, isInEditMode:', isInEditMode);
	});

	// Get any previously saved content
	try {
		const savedContent = localStorage.getItem('srible_editor_content') || '';
		if (savedContent) {
			const savedData = JSON.parse(savedContent);
			value = savedData.content || '';
			lastSavedTime = savedData.timestamp || null;
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
					/* Undo */
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
					/* Redo */
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
			<button class="featured-image-button">
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
				<textarea
					bind:this={editor}
					class="markdown-editor-input"
					bind:value
					on:input={handleChange}
					on:focus={handleFocus}
					on:blur={handleBlur}
					on:keydown={handleKeyDown}
					on:select={handleSelect}
					placeholder="Start writing your story..."
					style="min-height: {height};"
				></textarea>
			{:else}
				<div class="markdown-viewer" transition:fade={{ duration: 150 }}>
					{@html renderedHTML}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
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

	/* Editor input styles */
	.markdown-editor-input,
	.markdown-viewer {
		width: 100%;
		font-size: 1.1rem;
		line-height: 1.6;
		padding: 20px 0;
		color: #2c3e50;
		flex-grow: 1;
	}

	.markdown-editor-input {
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

	.heading-button {
		min-width: 30px;
		position: relative;
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
