<script lang="ts">
  import TiptapEditor from '$lib/components/TiptapEditor.svelte';
  let content = '';
  function handleContentChange(html: string) {
    content = html;
  }
  async function save() {
    // send { content } to backend
  }
</script>

<TiptapEditor initialContent={content} onContentChange={handleContentChange} />

<button on:click={save} class="btn btn-primary mt-4">Save Post</button>
