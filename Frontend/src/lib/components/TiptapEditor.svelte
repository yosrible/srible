<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte';
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

  // Make images draggable by default
  const DraggableImage = Image.extend({ draggable: true });

  export let initialContent: string | null = null;
  export let onContentChange: ((html: string) => void) | null = null;
  export let readonly: boolean = false;
  export let characterLimit: number = 20000;

  let editor: Editor | null = null;
  // Autosave state
  let isSaving = false;
  let saveMessage: string = '';
  let saveTimeout: ReturnType<typeof setTimeout> | null = null;
  const AUTOSAVE_KEY = 'tiptap-draft';

  function scheduleAutosave() {
    isSaving = true;
    saveMessage = 'Saving…';
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      // Persist HTML to localStorage; in real app replace with API call
      try {
        localStorage.setItem(AUTOSAVE_KEY, html);
      } catch {}
      isSaving = false;
      saveMessage = 'Saved';
    }, 1000); // 1-second debounce
  }
  let html: string = initialContent ?? '';
  const dispatch = createEventDispatcher();
  let bubbleMenuEl: HTMLElement | null = null;
  let editorEl: HTMLDivElement;

  // Link modal state
  let linkModalOpen = false;
  let linkUrl = '';

  // Theme logic
  let theme: 'dark' | 'light' = 'light';
  
  // Reactive theme state
  $: if (typeof document !== 'undefined') {
    // Apply theme to html element
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');

    // Apply theme to body as well, so Tailwind `dark:` variant works regardless of root element
    document.body.classList.toggle('dark', theme === 'dark');

    // Persist preference
    localStorage.setItem('srible-theme', theme);
  }
  
  // Initialize theme from localStorage or system preference
  onMount(() => {
    const savedTheme = localStorage.getItem('srible-theme') as 'dark' | 'light' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      theme = savedTheme;
    } else {
      theme = systemPrefersDark ? 'dark' : 'light';
    }


    // Watch for system theme changes (only if no manual preference is set)
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('srible-theme')) {
        theme = e.matches ? 'dark' : 'light';
      }
    };
    
    darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  });
  
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
  }

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
    linkUrl = prev;
    linkModalOpen = true;
    tick().then(() => {
      const input = document.getElementById('link-input') as HTMLInputElement | null;
      input?.focus();
    });
  }

  function applyLink() {
    if (!editor) return;
    if (linkUrl.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl.trim() }).run();
    }
    linkModalOpen = false;
  }

  function closeLinkModal() {
    linkModalOpen = false;
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

  // Focus editor when clicking anywhere in the writing area (outside existing content)
  function handleContainerClick(event: MouseEvent) {
    if (!editor) return;

    const target = event.target as HTMLElement;
    // If the click wasn't inside the editable ProseMirror element, place caret at end
    if (!target.closest('.ProseMirror')) {
      editor.commands.focus('end');
    }
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
        DraggableImage.configure({ inline: false, allowBase64: true }),
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
        scheduleAutosave();
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

  function handleDiscard() {
    // Implement discard functionality
  }

  function handlePublish() {
    // Implement publish functionality
  }
</script>

<div class="fixed inset-0 w-full h-screen overflow-hidden bg-white dark:bg-zinc-900" data-theme={theme}>
  <!-- Action Buttons -->
  <div class="fixed top-2 right-4 z-40 flex items-center gap-2">
    <button 
      on:click={handleDiscard}
      class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700/80 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 shadow-sm border border-zinc-200 dark:border-zinc-700 backdrop-blur-sm"
    >
      <span>Discard</span>
    </button>
    <button 
      on:click={handlePublish}
      class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm border border-blue-600 backdrop-blur-sm"
    >
      <span>Publish</span>
    </button>
    <button 
      on:click={() => window.history.back()}
      class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700/80 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 shadow-sm border border-zinc-200 dark:border-zinc-700 backdrop-blur-sm"
      title="Back to posts"
    >
      <span class="hidden sm:inline">Back to posts</span>
      <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  </div>
  <!-- Toolbar -->
  <div class="sticky top-0 z-20 bg-white/95 dark:bg-zinc-900/95 border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm flex flex-wrap items-center justify-center gap-1 px-4 py-2 backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md w-full">
    <!-- Theme toggle -->
    <button
      class="tt-btn bg-transparent dark:bg-transparent"
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
  <div class="relative w-full h-[calc(100vh-48px)] transition-all duration-200 overflow-hidden" on:click={handleContainerClick}>
    <div class="h-full overflow-y-auto custom-scrollbar">
      <div class="max-w-4xl mx-auto px-4 py-8 w-full min-h-full">
        <div bind:this={editorEl} class="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none min-h-[calc(100vh-8rem)] focus:outline-none"></div>
      </div>
    </div>
    <div class="fixed right-3 bottom-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 px-3 py-1.5 rounded-lg shadow-sm pointer-events-auto select-none z-10 transition-all duration-200 hover:bg-white dark:hover:bg-zinc-800 hover:shadow">
      <span class="font-mono">{wordCount}</span> words • <span class="font-mono">{charCount}</span> chars {#if saveMessage} • <span class="inline-flex items-center gap-1"><span class="inline-block w-2 h-2 rounded-full bg-green-500" class:animate-pulse={isSaving}></span>{saveMessage}</span>{/if}
    </div>
  </div>

  {#if linkModalOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" on:click|self={closeLinkModal}>
      <div class="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-lg text-zinc-800 dark:text-zinc-100 rounded-xl shadow-md p-6 w-full max-w-sm" on:click|stopPropagation>
        <h3 class="text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-200">Add link</h3>
        <input id="link-input" class="w-full rounded-md border border-zinc-300/50 dark:border-zinc-700/50 p-2 bg-white/70 dark:bg-zinc-900/50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" bind:value={linkUrl} placeholder="https://example.com" on:keydown={(e) => e.key === 'Enter' && applyLink()} />
        <div class="mt-4 flex justify-end gap-2">
          <button class="px-3 py-1.5 text-sm rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/50 dark:hover:bg-zinc-700/50" on:click={closeLinkModal}>Cancel</button>
          <button class="px-3 py-1.5 text-sm font-normal rounded-md bg-blue-500/80 text-white/90 hover:bg-blue-500" on:click={applyLink}>Add</button>
        </div>
      </div>
    </div>
  {/if}

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    /* Override any system theme with the component's theme */
    color-scheme: unset !important;
  }
  
  /* Custom scrollbar for the editor */
  :global(.ProseMirror) {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
  }
  
  :global(.ProseMirror)::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  :global(.ProseMirror)::-webkit-scrollbar-track {
    background: transparent;
  }
  
  :global(.ProseMirror)::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }
  
  /* Dark theme scrollbar */
  [data-theme="dark"] :global(.ProseMirror) {
    scrollbar-color: #4b5563 transparent;
  }
  
  [data-theme="dark"] :global(.ProseMirror)::-webkit-scrollbar-thumb {
    background: #4b5563;
  }
  
  /* Ensure the scrollbar is visible in the editor */
  :global(.ProseMirror) {
    scrollbar-gutter: stable;
  }
  :global([data-theme="light"]) {
    color-scheme: light;
  }
  :global([data-theme="dark"]) {
    color-scheme: dark;
  }
  .tt-btn {
    @apply p-1.5 rounded bg-transparent text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-700/30 transition-colors duration-100 ease-in-out transform hover:scale-105 active:scale-95;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    min-height: 2rem;
    user-select: none;
    border: none;
    outline: none;
  }
  .tt-btn:active {
    @apply bg-transparent dark:bg-transparent;
  }
  /* Highlight active formatting buttons (e.g., Code Block) */
  .tt-btn.active {
    color: #2563eb; /* blue-600 */
  }
  [data-theme="dark"] .tt-btn.active {
    color: #3b82f6; /* blue-500 */
  }
  .tt-btn svg {
    display: block;
  }
  .prose pre {
    @apply bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded p-3 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-100 overflow-x-auto;
  }
  /* Inline code */
  .prose code {
    @apply bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5 text-pink-600 dark:text-pink-400 font-medium;
  }
  :global(.ProseMirror pre) {
    white-space: pre-wrap;
    background-color: #f3f4f6; /* gray-100 */
    color: #1f2937; /* gray-800 */
    border: 1px solid #e5e7eb; /* gray-200 */
    border-radius: 0.375rem; /* rounded-md */
    padding: 0.75rem 1rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.875rem;
    line-height: 1.4;
    overflow-x: auto;
  }
  [data-theme="dark"] :global(.ProseMirror pre) {
    background-color: #374151; /* gray-700 */
    color: #f1f5f9; /* slate-100 */
    border-color: #374151; /* gray-700 */
  }
    /* Draggable images cursor */
  .ProseMirror img {
    cursor: grab;
  }
  .ProseMirror img:active {
    cursor: grabbing;
  }

  /* Custom scrollbar styling */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db #f3f4f6;
    height: 100%;
  }

  .dark .custom-scrollbar {
    scrollbar-color: #4b5563 #1f2937;
  }

  /* Webkit scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 4px;
  }

  .dark .custom-scrollbar::-webkit-scrollbar-track {
    background: #1f2937;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 4px;
    border: 2px solid #f3f4f6;
  }

  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #4b5563;
    border-color: #1f2937;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #9ca3af;
  }

  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #6b7280;
  }
  @media (max-width: 640px) {
    .prose {
      font-size: 1rem;
    }
    .tt-btn {
      padding: 0.25rem 0.5rem;
      min-width: 1.5rem;
      min-height: 1.5rem;
      background: transparent !important;
    }
  }
  /* Link styling */
  :global(.ProseMirror a) {
    color: #2563eb; /* blue-600 */
    text-decoration: underline;
  }
  [data-theme="dark"] :global(.ProseMirror a) {
    color: #3b82f6; /* blue-500 */
  }
</style>

</div>