<script>
	import { onMount, onDestroy, getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import MarkdownEditor from '$lib/components/TiptapEditor.svelte';

	// Get sidebar controls from context
	const sidebar = getContext('sidebar');

	// Device detection
	let isMobileDevice = false;

	// Form data
	let coverImage = '';
	let description = '';
	let tags = '';
	let content = '';
	let showPublishModal = false;

	// Editor reference
	let editorCard;

	// Device detection function
	function checkIfMobile() {
		if (browser) {
			// Check if user agent indicates mobile device
			const userAgent = navigator.userAgent || navigator.vendor || window.opera;
			const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
			isMobileDevice = mobileRegex.test(userAgent) || window.innerWidth <= 768;
		}
	}

	// Handle markdown content change
	function handleEditorChange(event) {
		content = event.detail;
	}

	// Get post title from content (first H1)
	function extractTitleFromContent() {
		// Look for first H1 heading in markdown content
		const match = content.match(/^# (.+)$/m);
		return match ? match[1].trim() : 'Untitled Post';
	}

	onMount(() => {
		// Check if mobile on mount
		checkIfMobile();

		// Auto-hide sidebar when entering post creation view
		if (sidebar) {
			sidebar.hide();
		}

		// Add resize listener to update device type on orientation change
		if (browser) {
			window.addEventListener('resize', checkIfMobile);

			// Apply immersive editor mode
			document.body.classList.add('immersive-editor-mode');

			// Add style to make the post editor immersive
			const immersiveStyle = document.createElement('style');
			immersiveStyle.id = 'immersive-editor-style';
			immersiveStyle.textContent = `
				.sidebar {
					width: 0 !important;
					transform: translateX(-100%) !important;
				}
				.dashboard-content-area {
					margin-left: 0 !important;
					padding: 0 !important;
					width: 100% !important;
					max-width: 100% !important;
				}
				.dashboard-container {
					padding: 0 !important;
				}
				.content-header, .dashboard-content {
					padding: 0 !important;
					margin: 0 !important;
					background: transparent !important;
					box-shadow: none !important;
				}
				main {
					padding: 0 !important;
					max-width: 100% !important;
				}
				/* Create a floating toggle button for the editor view */
				.sidebar-header {
					position: fixed;
					top: 15px;
					right: 15px;
					background: white;
					padding: 8px !important;
					border-radius: 4px;
					border: 1px solid #e2e8f0;
					box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
					z-index: 1000;
					width: auto !important;
				}
				.sidebar-header h2 {
					display: none;
				}
				.sidebar-header .sidebar-toggle {
					background-color: transparent;
					opacity: 0.75;
				}
				.sidebar-header .sidebar-toggle:hover {
					opacity: 1;
					color: #3b82f6;
				}
				/* Position the floating toggle in editor view */
				.floating-sidebar-toggle {
					position: fixed;
					top: 15px;
					left: 15px;
					z-index: 1000;
					background-color: white;
					border: 1px solid #e2e8f0;
					opacity: 0.75;
				}
				.floating-sidebar-toggle:hover {
					opacity: 1;
				}
			`;
			document.head.appendChild(immersiveStyle);
		}
	});

	// Clean up on destroy
	onDestroy(() => {
		// Clean up resize event listener
		if (browser) {
			window.removeEventListener('resize', checkIfMobile);

			// Remove immersive mode class
			document.body.classList.remove('immersive-editor-mode');

			// Restore sidebar when leaving the editor
			if (sidebar) {
				sidebar.show();
			}

			// Remove immersive style
			const immersiveStyle = document.getElementById('immersive-editor-style');
			if (immersiveStyle) {
				immersiveStyle.remove();
			}
		}
	});

	// Discard post function
	function discardPost() {
		if (browser) {
			localStorage.removeItem('srible_editor_content');
			content = '';
			goto('/dashboard/posts');
		}
	}

	// Handle publish post
	function handlePublish() {
		// Extract post title
		const title = extractTitleFromContent();
		
		// Here you would implement actual publishing logic
		// For demonstration, we'll just close the modal
		showPublishModal = false;
		
		// You might navigate to the post list or show a success message
		// goto('/dashboard/posts');
	}
	
	// Toggle publish modal
	function togglePublishModal() {
		showPublishModal = !showPublishModal;
	}
</script>

<main class="w-full h-full editor-page">
	{#if isMobileDevice}
		<div
			class="mobile-warning rounded-lg border-2 border-amber-400 bg-amber-50 p-6 mb-8 text-center"
		>
			<h3 class="text-lg font-medium text-amber-800 mb-2">Mobile Editing Not Recommended</h3>
			<p class="text-amber-700">
				The post editor works best on desktop devices. While you can preview posts on mobile, we
				recommend using a larger screen for the best editing experience.
			</p>
		</div>
	{/if}

	<div class="editor-header bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
		<button
			on:click={() => goto('/dashboard/posts')}
			class="px-4 py-2 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center text-sm shadow-sm transition-colors duration-200"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4 mr-2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
			</svg>
			Back to Posts
		</button>

		<div class="flex gap-2">
			<button
				on:click={discardPost}
				class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm shadow-sm transition-colors duration-200"
			>
				Discard
			</button>
			<button
				on:click={togglePublishModal}
				class="px-4 py-2 rounded-md bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 text-sm shadow-sm transition-colors duration-200"
			>
				Publish
			</button>
		</div>
	</div>

	<!-- Main content area with markdown editor -->
	<div class="editor-container bg-white dark:bg-gray-800" bind:this={editorCard}>
		<MarkdownEditor 
			bind:value={content} 
			on:change={handleEditorChange}
			placeholder="Start writing your post here... (Use # for main title)"
			height="calc(100vh - 150px)"
		/>
	</div>

	<!-- Publish Modal -->
	{#if showPublishModal}
		<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full overflow-hidden">
				<div class="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center">
					<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Finalize Your Post</h3>
					<button
						class="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
						on:click={() => (showPublishModal = false)}
						aria-label="Close dialog"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</div>
				<div class="p-6 space-y-6">
					<!-- Cover Image URL -->
					<div>
						<label for="modal-coverImage" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
							Cover Image URL
						</label>
						<div class="relative">
							<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-gray-400 dark:text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<input
								type="text"
								id="modal-coverImage"
								bind:value={coverImage}
								class="w-full p-3 pl-10 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
								placeholder="https://example.com/your-image.jpg"
							/>
						</div>
						<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Add a captivating image to represent your post</p>
					</div>

					<!-- Description textarea -->
					<div>
						<label for="modal-description" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
							Post Description
						</label>
						<textarea
							id="modal-description"
							bind:value={description}
							class="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
							placeholder="Write a brief description that captures your post's essence..."
							rows="3"
						></textarea>
						<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
							A good description helps readers find your content
						</p>
					</div>

					<!-- Preview title extracted from H1 -->
					<div>
						<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Post Title (from H1)</h4>
						<div class="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
							<p class="font-medium text-gray-900 dark:text-gray-100">{extractTitleFromContent() || 'No H1 heading found in your post'}</p>
						</div>
						<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
							The title is automatically extracted from the first H1 heading in your post
						</p>
					</div>
				</div>
				<div class="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end gap-3">
					<button
						class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm transition-colors duration-200"
						on:click={() => showPublishModal = false}
					>
						Cancel
					</button>
					<button
						class="px-6 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center gap-2"
						on:click={handlePublish}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						Publish Post
					</button>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	:global(body.immersive-editor-mode) {
		background-color: #f8f8f5;
		overflow-x: hidden;
	}

	.editor-page {
		position: relative;
		min-height: 100vh;
		background-color: #f8f8f5;
		display: flex;
		flex-direction: column;
	}

	/* Responsive styles only - no hardcoded colors */
	@media (max-width: 768px) {
		.editor-header {
			padding: 0.5rem;
		}
	}
</style>