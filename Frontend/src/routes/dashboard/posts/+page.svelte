<script>
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	
	// Get sidebar controls from context
	const sidebar = getContext('sidebar');
	
	// Search query state
	let searchQuery = '';
	
	// Filter posts based on search query
	$: filteredPosts = posts.filter(post => 
		post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		post.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
		post.date.includes(searchQuery)
	);
	
	let posts = [
		{
			id: 1,
			title: 'Getting Started with Srible',
			status: 'Published',
			date: '2025-04-28',
			views: 347
		},
		{
			id: 2,
			title: 'How to Optimize Your Blog for SEO',
			status: 'Published',
			date: '2025-04-25',
			views: 289
		},
		{
			id: 3,
			title: 'The Importance of Personal Branding',
			status: 'Published',
			date: '2025-04-21',
			views: 412
		},
		{
			id: 4,
			title: 'Draft: Future of Blogging in 2026',
			status: 'Draft',
			date: '2025-05-02',
			views: 0
		}
	];
	
	function handleCreatePost() {
		// Hide sidebar immediately before navigation
		if (sidebar) {
			sidebar.hide();
		}
		
		// Set a flag to indicate immersive editor mode is requested and force fullscreen
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('srible_editor_immersive_mode', 'true');
			localStorage.setItem('srible_editor_fullscreen', 'true');
		}
		
		// Add a small delay to ensure sidebar animation completes before navigation
		setTimeout(() => {
			// Navigate to the create post page in fullscreen mode
			goto('/dashboard/posts/create?fullscreen=true');
		}, 50);
	}
</script>

<header class="content-header flex justify-between items-start flex-wrap gap-4 mb-8">
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">Posts</h1>
		<div class="search-container relative w-full max-w-60">
			<svg class="search-icon absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="11" cy="11" r="8"></circle>
				<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
			</svg>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search..."
				class="search-input w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm transition-all duration-150 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
				aria-label="Search posts"
			/>
		</div>
	</div>
	<div class="ml-auto flex items-center">
		<button class="create-post-btn bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 border border-gray-900 dark:border-gray-100 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 h-10 flex items-center gap-2" on:click={handleCreatePost}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="btn-icon transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M12 20h9" />
				<path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
			</svg>
			<span class="btn-text">New Post</span>
		</button>
	</div>
</header>

<div class="dashboard-content bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8 mb-8">
	<div class="posts-table w-full border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
		<div class="table-header grid grid-cols-5 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
			<div class="th px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Title</div>
			<div class="th px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</div>
			<div class="th px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Date</div>
			<div class="th px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Views</div>
			<div class="th px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</div>
		</div>
		{#if filteredPosts.length === 0}
			<div class="no-results flex flex-col items-center justify-center py-12 px-4 text-center text-gray-500 dark:text-gray-400">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 mb-4 text-gray-400 dark:text-gray-500">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					<line x1="11" y1="8" x2="11" y2="14"></line>
					<line x1="11" y1="17" x2="11.01" y2="17"></line>
				</svg>
				<p class="text-base text-gray-600 dark:text-gray-400">No posts found matching "{searchQuery}"</p>
			</div>
		{:else}
		{#each filteredPosts as post}
			<div class="table-row grid grid-cols-5 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 last:border-b-0">
				<div class="td px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium truncate flex items-center">{post.title}</div>
				<div class="td px-4 py-3 text-sm flex items-center">
					<span class="status-badge px-2 py-1 rounded text-xs font-medium {post.status.toLowerCase() === 'published' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}">{post.status}</span>
				</div>
				<div class="td px-4 py-3 text-sm text-gray-600 dark:text-gray-400 flex items-center">{post.date}</div>
				<div class="td px-4 py-3 text-sm text-gray-600 dark:text-gray-400 flex items-center">{post.views}</div>
				<div class="td px-4 py-3 text-sm flex items-center gap-2">
					<button class="action-btn edit bg-transparent border-none cursor-pointer p-1 rounded flex items-center justify-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400" aria-label="Edit post">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
							<path
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
							/>
							<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
						</svg>
					</button>
					<button class="action-btn delete bg-transparent border-none cursor-pointer p-1 rounded flex items-center justify-center transition-colors duration-200 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400" aria-label="Delete post">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
							<path
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"
							/>
						</svg>
					</button>
				</div>
			</div>
		{/each}
		{/if}
	</div>
</div>

<style>
	/* Responsive styles */
	@media (max-width: 768px) {
		.dashboard-content {
			padding: 1.5rem;
		}
		
		.table-header, .table-row {
			grid-template-columns: 2.5fr 1fr 1fr 0.5fr 1fr;
		}
	}

	@media (max-width: 640px) {
		.content-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.dashboard-content {
			padding: 1rem;
		}
		
		.table-header, .table-row {
			grid-template-columns: 2fr 1fr 1fr;
		}
		
		.th:nth-child(4), .td:nth-child(4) {
			display: none;
		}
		
		.th:nth-child(5), .td:nth-child(5) {
			display: flex;
		}
	}

	@media (max-width: 480px) {
		.td.title {
			max-width: 150px;
		}
	}
</style>
