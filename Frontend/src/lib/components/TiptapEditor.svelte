<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Underline from '@tiptap/extension-underline';
  import Link from '@tiptap/extension-link';
  import Image from '@tiptap/extension-image';
  import Placeholder from '@tiptap/extension-placeholder';
  import TextAlign from '@tiptap/extension-text-align';
  import CharacterCount from '@tiptap/extension-character-count';
  import Typography from '@tiptap/extension-typography';
  import TaskList from '@tiptap/extension-task-list';
  import TaskItem from '@tiptap/extension-task-item';
  import BubbleMenu from '@tiptap/extension-bubble-menu';

  export let initialContent: string | null = null;
  export let onContentChange: ((html: string) => void) | null = null;
  export let readonly: boolean = false;
  export let characterLimit: number = 20000;

  let editor: Editor | null = null;
  let html: string = initialContent ?? '';
  const dispatch = createEventDispatcher();
  let bubbleMenuEl: HTMLElement | null = null;
  let editorEl: HTMLDivElement;

  // Theme logic
  let theme: 'dark' | 'light' = 'light';
  function setHtmlTheme(t: 'dark' | 'light') {
    if (typeof document !== 'undefined') {
      // Clear all theme-related classes and enforce the chosen theme
      document.documentElement.classList.remove('dark', 'light');
      if (t === 'dark') {
        document.documentElement.classList.add('dark');
      }
      document.documentElement.setAttribute('data-theme', t);
    }
  }
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    setHtmlTheme(theme);
  }
  onMount(() => {
    setHtmlTheme(theme);
  });

  // Word/character count
  let wordCount = 0;
  let charCount = 0;
  function updateCounts() {
    if (editor) {
      const text = editor.getText();
      wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      charCount = editor.storage.characterCount.characters();
    } else {
      wordCount = 0;
      charCount = 0;
    }
  }

  // Toolbar helpers
  function promptLink() {
    if (!editor) return;
    const prev = editor.getAttributes('link').href || '';
    const url = prompt('Enter URL', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }
  function removeLink() {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run();
  }
  function uploadImage() {
    if (!editor) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const url = URL.createObjectURL(file);
        if (editor) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      }
    };
    input.click();
  }
  function insertImageByUrl() {
    if (!editor) return;
    const url = prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }
  function clearFormatting() {
    editor?.chain().focus().clearNodes().unsetAllMarks().run();
  }

  // Editor setup
  onMount(() => {
    editor = new Editor({
      element: editorEl,
      editable: !readonly,
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
          codeBlock: {
            HTMLAttributes: {
              class: 'bg-zinc-100 dark:bg-zinc-800 rounded p-2 font-mono text-sm overflow-x-auto'
            }
          }
        }),
        Underline,
        Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
        Image.configure({ inline: false, allowBase64: true }),
        Placeholder.configure({ placeholder: 'Write something amazing…' }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        CharacterCount.configure({ limit: characterLimit }),
        Typography,
        TaskList,
        TaskItem,
        BubbleMenu.configure({
          element: bubbleMenuEl,
          tippyOptions: { duration: 100 }
        })
      ],
      content: initialContent ?? '',
      editorProps: {
        attributes: {
          class: [
            'prose',
            'dark:prose-invert',
            'max-w-none',
            'min-h-[300px]',
            'focus:outline-none',
            'bg-white dark:bg-zinc-900',
            'text-zinc-900 dark:text-zinc-100',
            'px-3',
            'py-2',
            'transition-colors'
          ].join(' ')
        }
      },
      onUpdate: ({ editor }) => {
        html = editor.getHTML();
        onContentChange?.(html);
        dispatch('contentChange', html);
        updateCounts();
      }
    });
    html = editor.getHTML();
    updateCounts();
    return () => editor?.destroy();
  });

  onDestroy(() => {
    editor?.destroy();
  });

  // Button active state helpers
  function isActive(type: string, attrs = {}) {
    return editor?.isActive(type, attrs);
  }
</script>

<div class="relative w-full h-screen" data-theme={theme}>
  <!-- Toolbar -->
  <div class="sticky top-0 z-20 bg-white/90 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-wrap items-center gap-1 px-2 py-1 rounded-t-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur">
    <!-- Theme toggle -->
    <button
      class="tt-btn"
      aria-label="Toggle theme"
      on:click={toggleTheme}
      title="Toggle dark/light mode"
    >
      {#if theme === 'dark'}
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M17.293 14.293A8 8 0 019.707 6.707a8.001 8.001 0 107.586 7.586z"/></svg>
      {:else}
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke-width="2"/><path stroke-width="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
      {/if}
    </button>
    <!-- Formatting -->
    <button class="tt-btn" class:active={isActive('bold')} on:click={() => editor?.chain().focus().toggleBold().run()} aria-label="Bold" title="Bold (Ctrl+B)">
      <b>B</b>
    </button>
    <button class="tt-btn" class:active={isActive('italic')} on:click={() => editor?.chain().focus().toggleItalic().run()} aria-label="Italic" title="Italic (Ctrl+I)">
      <i>I</i>
    </button>
    <button class="tt-btn" class:active={isActive('underline')} on:click={() => editor?.chain().focus().toggleUnderline().run()} aria-label="Underline" title="Underline (Ctrl+U)">
      <u>U</u>
    </button>
    <button class="tt-btn" class:active={isActive('strike')} on:click={() => editor?.chain().focus().toggleStrike().run()} aria-label="Strike" title="Strike">
      <s>S</s>
    </button>
    <span class="mx-1 border-l border-zinc-300 dark:border-zinc-700 h-5"></span>
    <!-- Headings -->
    <button class="tt-btn" class:active={isActive('heading', { level: 1 })} on:click={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} aria-label="Heading 1" title="Heading 1">H1</button>
    <button class="tt-btn" class:active={isActive('heading', { level: 2 })} on:click={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} aria-label="Heading 2" title="Heading 2">H2</button>
    <button class="tt-btn" class:active={isActive('heading', { level: 3 })} on:click={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} aria-label="Heading 3" title="Heading 3">H3</button>
    <span class="mx-1 border-l border-zinc-300 dark:border-zinc-700 h-5"></span>
    <!-- Lists -->
    <button class="tt-btn" class:active={isActive('bulletList')} on:click={() => editor?.chain().focus().toggleBulletList().run()} aria-label="Bullet List" title="Bullet List">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><line x1="10" y1="6" x2="20" y2="6" stroke-width="2"/><line x1="10" y1="12" x2="20" y2="12" stroke-width="2"/><line x1="10" y1="18" x2="20" y2="18" stroke-width="2"/></svg>
    </button>
    <button class="tt-btn" class:active={isActive('orderedList')} on:click={() => editor?.chain().focus().toggleOrderedList().run()} aria-label="Ordered List" title="Ordered List">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><text x="2" y="8" font-size="6" fill="currentColor">1.</text><text x="2" y="14" font-size="6" fill="currentColor">2.</text><text x="2" y="20" font-size="6" fill="currentColor">3.</text><line x1="10" y1="6" x2="20" y2="6" stroke-width="2"/><line x1="10" y1="12" x2="20" y2="12" stroke-width="2"/><line x1="10" y1="18" x2="20" y2="18" stroke-width="2"/></svg>
    </button>
    <button class="tt-btn" class:active={isActive('taskList')} on:click={() => editor?.chain().focus().toggleTaskList().run()} aria-label="Task List" title="Task List">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"/><path stroke-width="2" d="M7 12l3 3 7-7"/></svg>
    </button>
    <span class="mx-1 border-l border-zinc-300 dark:border-zinc-700 h-5"></span>
    <!-- Code block -->
    <button class="tt-btn" class:active={isActive('codeBlock')} on:click={() => editor?.chain().focus().toggleCodeBlock().run()} aria-label="Code Block" title="Code Block">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    </button>
    <span class="mx-1 border-l border-zinc-300 dark:border-zinc-700 h-5"></span>
    <!-- Link -->
    <button class="tt-btn" class:active={isActive('link')} on:click={promptLink} aria-label="Add/Edit Link" title="Add/Edit Link">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3.535 3.535a4 4 0 01-5.656-5.656l1.414-1.414"/><path stroke-width="2" d="M10.172 13.828a4 4 0 010-5.656l3.535-3.535a4 4 0 015.656 5.656l-1.414 1.414"/></svg>
    </button>
    <button class="tt-btn" on:click={removeLink} aria-label="Remove Link" title="Remove Link">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M18 6L6 18"/><path stroke-width="2" d="M6 6l12 12"/></svg>
    </button>
    <span class="mx-1 border-l border-zinc-300 dark:border-zinc-700 h-5"></span>
    <!-- Images -->
    <button class="tt-btn" on:click={uploadImage} aria-label="Upload Image" title="Upload Image">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-width="2" d="M21 15l-5-5L5 21"/></svg>
    </button>
    <button class="tt-btn" on:click={insertImageByUrl} aria-label="Insert Image by URL" title="Insert Image by URL">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/><path stroke-width="2" d="M8 21v-4a4 4 0 014-4h4"/></svg>
    </button>
    <span class="mx-1 border-l border-zinc-300 dark:border-zinc-700 h-5"></span>
    <!-- Horizontal rule -->
    <button class="tt-btn" on:click={() => editor?.chain().focus().setHorizontalRule().run()} aria-label="Horizontal Rule" title="Horizontal Rule">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke-width="2"/></svg>
    </button>
    <!-- Clear formatting -->
    <button class="tt-btn" on:click={clearFormatting} aria-label="Clear Formatting" title="Clear Formatting">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
    <span class="mx-1 border-l border-zinc-300 dark:border-zinc-700 h-5"></span>
    <!-- Undo/Redo -->
    <button class="tt-btn" on:click={() => editor?.chain().focus().undo().run()} aria-label="Undo" title="Undo (Ctrl+Z)">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M9 14l-4-4 4-4"/><path stroke-width="2" d="M5 10h7a4 4 0 110 8h-1"/></svg>
    </button>
    <button class="tt-btn" on:click={() => editor?.chain().focus().redo().run()} aria-label="Redo" title="Redo (Ctrl+Y)">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M15 10l4 4-4 4"/><path stroke-width="2" d="M19 14h-7a4 4 0 110-8h1"/></svg>
    </button>
  </div>

  <!-- Editor with counter inside -->
  <div class="rounded-b-lg border border-t-0 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 min-h-[300px] transition-colors relative w-full h-[calc(100vh-48px)] overflow-auto">
    <div bind:this={editorEl} class="bg-white dark:bg-zinc-900 min-h-full transition-colors"></div>
    <div class="absolute right-3 bottom-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-white/90 dark:bg-zinc-900/90 px-3 py-1 rounded shadow pointer-events-none select-none z-10">
      Words: {wordCount} | Characters: {charCount}
    </div>
  </div>
</div>

<style>
  :global(html) {
    /* Override any system theme with the component's theme */
    color-scheme: unset !important;
  }
  :global([data-theme="light"]) {
    color-scheme: light;
  }
  :global([data-theme="dark"]) {
    color-scheme: dark;
  }
  .tt-btn {
    @apply px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    min-height: 2rem;
    user-select: none;
  }
  .tt-btn.active, .tt-btn:active {
    @apply bg-zinc-300 dark:bg-zinc-600;
  }
  .tt-btn svg {
    display: block;
  }
  .prose pre {
    @apply bg-zinc-100 dark:bg-zinc-800 rounded p-2 font-mono text-sm overflow-x-auto;
  }
  @media (max-width: 640px) {
    .prose {
      font-size: 1rem;
    }
    .tt-btn {
      padding: 0.25rem 0.5rem;
      min-width: 1.5rem;
      min-height: 1.5rem;
    }
  }
</style>