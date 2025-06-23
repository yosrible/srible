<script lang="ts">
	import { onMount } from 'svelte';
	import EditorContent from '@tiptap/svelte/EditorContent';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';
	import History from '@tiptap/extension-history';

	export let value = '';
	export const placeholder = 'Start writing...';
	export let height = '500px';

	let theme = 'light';
	let wordCount = 0;
	let editor: Editor | null = null;
	let imageType: 'online' | 'system' = 'online';
	let imageUrl = '';
	let fileInput: HTMLInputElement | null = null;

	// Theme persistence
	function getInitialTheme() {
		if (typeof window === 'undefined') return 'light';
		const stored = localStorage.getItem('editor_theme');
		if (stored) return stored;
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
		return 'light';
	}
	theme = getInitialTheme();

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('editor_theme', theme);
		updateHtmlTheme();
	}
	function updateHtmlTheme() {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', theme === 'dark');
		}
	}

	onMount(() => {
		updateHtmlTheme();

		editor = new Editor({
			extensions: [
				StarterKit,
				Underline,
				Link.configure({ openOnClick: false }),
				Image,
				History,
			],
			content: value || '<p></p>',
			onUpdate: ({ editor }) => {
				value = editor.getHTML();
				const text = editor.getText();
				wordCount = text.trim().split(/\s+/).filter(Boolean).length;
			},
			editorProps: {
				attributes: {
					class: 'prose prose-zinc dark:prose-invert max-w-none min-h-[300px] outline-none focus:ring-2 focus:ring-blue-400 bg-transparent transition-colors duration-300 w-full',
					style: `min-height: ${height};`,
					'aria-label': 'Rich text editor',
				},
			},
		});

		return () => {
			if (editor) editor.destroy();
		};
	});

	// Toolbar actions safely checking editor instance
	function setHeading(level: number) {
		editor?.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
	}
	function setBold() {
		editor?.chain().focus().toggleBold().run();
	}
	function setItalic() {
		editor?.chain().focus().toggleItalic().run();
	}
	function setUnderline() {
		editor?.chain().focus().toggleUnderline().run();
	}
	function setStrike() {
		editor?.chain().focus().toggleStrike().run();
	}
	function setBulletList() {
		editor?.chain().focus().toggleBulletList().run();
	}
	function setOrderedList() {
		editor?.chain().focus().toggleOrderedList().run();
	}
	function setBlockquote() {
		editor?.chain().focus().toggleBlockquote().run();
	}
	function setCodeBlock() {
		editor?.chain().focus().toggleCodeBlock().run();
	}
	function undo() {
		editor?.chain().focus().undo().run();
	}
	function redo() {
		editor?.chain().focus().redo().run();
	}
	function addLink() {
		const url = window.prompt('Enter URL');
		if (url) {
			editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
		}
	}
	function removeLink() {
		editor?.chain().focus().unsetLink().run();
	}
	function addImage() {
		const url = window.prompt('Enter image URL');
		if (url) {
			editor?.chain().focus().setImage({ src: url }).run();
		}
	}

	function insertImage() {
		if (!editor) return;
		editor.chain().focus();

		if (imageType === 'online') {
			if (imageUrl) {
				editor.chain().focus().setImage({ src: imageUrl }).run();
			}
		} else if (fileInput && fileInput.files && fileInput.files[0]) {
			const file = fileInput.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result && editor) {
					editor.chain().focus().setImage({ src: e.target.result as string }).run();
				}
			};
			reader.readAsDataURL(file);
		}
		imageUrl = '';
		if (fileInput) fileInput.value = '';
	}
</script>

<div class={`editor-canvas ${theme === 'dark' ? 'dark' : ''} bg-white dark:bg-zinc-900 transition-colors duration-300`}>
	<!-- Toolbar -->
	<div class="editor-toolbar border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-300 flex items-center px-2">
		<!-- Theme toggle -->
		<button
			type="button"
			class="mr-2 px-2 py-1 rounded transition-colors bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600"
			aria-label="Toggle theme"
			on:click={toggleTheme}
		>
			{#if theme === 'dark'}
				<svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="currentColor" />
				</svg>
			{:else}
				<svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="12" cy="12" r="5" fill="currentColor" />
					<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" />
				</svg>
			{/if}
		</button>

		<!-- Headings -->
		<button type="button" class="toolbar-btn" aria-label="Heading 1" class:active={editor?.isActive('heading', { level: 1 })} on:click={() => setHeading(1)}>H1</button>
		<button type="button" class="toolbar-btn" aria-label="Heading 2" class:active={editor?.isActive('heading', { level: 2 })} on:click={() => setHeading(2)}>H2</button>
		<button type="button" class="toolbar-btn" aria-label="Heading 3" class:active={editor?.isActive('heading', { level: 3 })} on:click={() => setHeading(3)}>H3</button>
		<span class="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1" aria-hidden="true"></span>

		<!-- Bold, Italic, Underline, Strike -->
		<button type="button" class="toolbar-btn" aria-label="Bold" class:active={editor?.isActive('bold')} on:click={setBold}><b>B</b></button>
		<button type="button" class="toolbar-btn" aria-label="Italic" class:active={editor?.isActive('italic')} on:click={setItalic}><i>I</i></button>
		<button type="button" class="toolbar-btn" aria-label="Underline" class:active={editor?.isActive('underline')} on:click={setUnderline}><u>U</u></button>
		<button type="button" class="toolbar-btn" aria-label="Strike-through" class:active={editor?.isActive('strike')} on:click={setStrike}><s>S</s></button>
		<span class="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1" aria-hidden="true"></span>

		<!-- Lists -->
		<button type="button" class="toolbar-btn" aria-label="Bullet List" class:active={editor?.isActive('bulletList')} on:click={setBulletList}>• List</button>
		<button type="button" class="toolbar-btn" aria-label="Ordered List" class:active={editor?.isActive('orderedList')} on:click={setOrderedList}>1. List</button>
		<span class="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1" aria-hidden="true"></span>

		<!-- Blockquote, Code block -->
		<button type="button" class="toolbar-btn" aria-label="Blockquote" class:active={editor?.isActive('blockquote')} on:click={setBlockquote}>"</button>
		<button type="button" class="toolbar-btn" aria-label="Code Block" class:active={editor?.isActive('codeBlock')} on:click={setCodeBlock}></button>
		<span class="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1" aria-hidden="true"></span>

		<!-- Undo/Redo -->
		<button type="button" class="toolbar-btn" aria-label="Undo" on:click={undo} disabled={!editor?.can().undo()}>⎌</button>
		<button type="button" class="toolbar-btn" aria-label="Redo" on:click={redo} disabled={!editor?.can().redo()}>↻</button>
		<span class="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1" aria-hidden="true"></span>

		<!-- Link -->
		<button type="button" class="toolbar-btn" aria-label="Add Link" class:active={editor?.isActive('link')} on:click={addLink}>🔗</button>
		<button type="button" class="toolbar-btn" aria-label="Remove Link" on:click={removeLink} disabled={!editor?.isActive('link')}>❌</button>

		<!-- Image -->
		<button type="button" class="toolbar-btn" aria-label="Insert Image" on:click={addImage}>🖼️</button>
	</div>

	<div class="editor-container">
		<!-- Title area integrated in the canvas -->
		<div class="title-area">
			<input type="text" class="title-input" placeholder="Title" />
			<input type="text" class="subtitle-input" placeholder="Subtitle" />
			<button class="featured-image-button" on:click={() => window.alert('Feature image upload not implemented in WYSIWYG mode.')}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
				Add featured image
			</button>
		</div>
		<div class="editor-content" style={`min-height: ${height};`}>
			<EditorContent editor={editor} />
		</div>
	</div>

	<!-- Word count display -->
	<div class="word-count">
		Word count: {wordCount}
	</div>
</div>

<style>
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
	.toolbar-btn {
		@apply px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm;
	}
	.toolbar-btn.active {
		@apply bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300;
	}
	.toolbar-btn[disabled] {
		@apply opacity-50 cursor-not-allowed;
	}
	.editor-container {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		padding-top: 50px;
	}
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
	.editor-content {
		position: relative;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0;
		padding: 20px 20px 80px;
	}
	.markdown-editor-contenteditable:empty:before {
		content: attr(data-placeholder);
		color: #aaa;
		font-style: italic;
		pointer-events: none;
		display: block;
	}
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
		0% { transform: scale(0.8); opacity: 0.8; }
		50% { transform: scale(1.2); opacity: 1; }
		100% { transform: scale(0.8); opacity: 0.8; }
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
	.heading-button {
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
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
	.markdown-viewer {
		min-height: 300px;
		color: #333;
		line-height: 1.8;
		background-color: transparent;
		font-family: Georgia, serif;
		font-size: 18px;
	}
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
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
	.add-menu {
		position: absolute;
		background-color: white;
		border: 1px solid #eee;
		border-radius: 4px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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