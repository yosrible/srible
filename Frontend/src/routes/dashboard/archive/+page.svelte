<script lang="ts">
	// Sample archived posts data
	let archivedPosts = [
		{
			id: 1,
			title: 'Getting Started with Minimalism',
			date: '2023-01-15',
			status: 'archived',
			views: 3240,
			comments: 12
		},
		{
			id: 2,
			title: 'The Power of Simple Design',
			date: '2023-02-28',
			status: 'archived',
			views: 1780,
			comments: 8
		},
		{
			id: 3,
			title: 'Why Less is More in Web Development',
			date: '2023-03-10',
			status: 'archived',
			views: 2150,
			comments: 15
		}
	];
	
	let selectedPostIds: number[] = [];
	
	function toggleSelectAll(event: Event): void {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			selectedPostIds = archivedPosts.map(post => post.id);
		} else {
			selectedPostIds = [];
		}
	}
	
	function toggleSelect(postId: number): void {
		if (selectedPostIds.includes(postId)) {
			selectedPostIds = selectedPostIds.filter(id => id !== postId);
		} else {
			selectedPostIds = [...selectedPostIds, postId];
		}
	}
	
	function restoreSelected(): void {
		// In a real app, this would call an API to restore the selected posts
		archivedPosts = archivedPosts.filter(post => !selectedPostIds.includes(post.id));
		selectedPostIds = [];
	}
	
	function deleteSelected(): void {
		// In a real app, this would call an API to permanently delete the selected posts
		archivedPosts = archivedPosts.filter(post => !selectedPostIds.includes(post.id));
		selectedPostIds = [];
	}
</script>

<header class="content-header flex justify-between items-center mb-8">
	<h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">Archive</h1>
	{#if selectedPostIds.length > 0}
		<div class="actions flex gap-3">
			<button class="restore-btn bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200" on:click={restoreSelected}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M1 4v6h6"
					/>
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
					/>
				</svg>
				<span>Restore {selectedPostIds.length} {selectedPostIds.length === 1 ? 'post' : 'posts'}</span>
			</button>
			<button class="delete-btn bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200" on:click={deleteSelected}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 6h18"
					/>
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
					/>
				</svg>
				<span>Delete {selectedPostIds.length} {selectedPostIds.length === 1 ? 'post' : 'posts'}</span>
			</button>
		</div>
	{/if}
</header>

<div class="dashboard-content bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-8 mb-8">
	{#if archivedPosts.length === 0}
		<div class="empty-state flex flex-col items-center justify-center py-12 text-center">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" class="text-gray-400 dark:text-gray-500 mb-4">
				<path
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 8v13H3V8"
				/>
				<path
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M1 3h22v5H1z"
				/>
				<path
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10 12h4"
				/>
			</svg>
			<h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No archived posts</h2>
			<p class="text-gray-600 dark:text-gray-400">When you archive posts, they'll appear here.</p>
		</div>
	{:else}
		<div class="posts-table-container">
			<table class="posts-table w-full border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden">
				<thead class="bg-gray-50 dark:bg-gray-700">
					<tr>
						<th class="checkbox-cell px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
							<input 
								type="checkbox" 
								on:change={toggleSelectAll} 
								checked={selectedPostIds.length === archivedPosts.length && archivedPosts.length > 0}
								class="rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
							/>
						</th>
						<th class="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Title</th>
						<th class="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date Archived</th>
						<th class="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Views</th>
						<th class="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Comments</th>
						<th class="actions-cell px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
					</tr>
				</thead>
				<tbody class="bg-white dark:bg-gray-800">
					{#each archivedPosts as post}
						<tr class="{selectedPostIds.includes(post.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''} border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
							<td class="checkbox-cell px-4 py-3">
								<input 
									type="checkbox" 
									checked={selectedPostIds.includes(post.id)} 
									on:change={() => toggleSelect(post.id)}
									class="rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
								/>
							</td>
							<td class="title-cell px-4 py-3">
								<a href={`/dashboard/posts/${post.id}`} class="post-title text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
									{post.title}
								</a>
							</td>
							<td class="px-4 py-3 text-gray-600 dark:text-gray-400">{post.date}</td>
							<td class="px-4 py-3 text-gray-600 dark:text-gray-400">{post.views.toLocaleString()}</td>
							<td class="px-4 py-3 text-gray-600 dark:text-gray-400">{post.comments}</td>
							<td class="actions-cell px-4 py-3">
								<button class="action-btn restore bg-transparent border-none cursor-pointer p-1 rounded flex items-center justify-center transition-colors duration-200 hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400" on:click={() => toggleSelect(post.id)} aria-label="Restore post">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
										<path
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M1 4v6h6"
										/>
										<path
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
										/>
									</svg>
								</button>
								<button class="action-btn delete bg-transparent border-none cursor-pointer p-1 rounded flex items-center justify-center transition-colors duration-200 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400" on:click={() => toggleSelect(post.id)} aria-label="Delete post">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
										<path
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 6h18"
										/>
										<path
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
										/>
									</svg>
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.content-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.content-header h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
	}
	
	/* Dark mode text color override */
	:global(.dark) .content-header h1 {
		color: #f3f4f6;
	}
	
	.actions {
		display: flex;
		gap: 0.75rem;
	}
	
	.restore-btn,
	.delete-btn {
		padding: 0.5rem 1rem;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 44px;
	}
	
	.restore-btn {
		background-color: transparent;
		color: var(--primary-black, #1a1a1a);
		border: 1px solid #eaeaea;
	}
	
	.restore-btn:hover {
		background-color: #f8f8f5;
	}
	
	.delete-btn {
		background-color: #B22222;
		color: white;
		border: none;
	}
	
	.delete-btn:hover {
		background-color: #8B0000;
	}

	/* Dashboard Content */
	.dashboard-content {
		background-color: #ffffff;
		border-radius: 12px;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		padding: 2rem;
		margin-bottom: 2rem;
		min-height: 400px;
	}
	
	/* Dark mode dashboard content */
	:global(.dark) .dashboard-content {
		background-color: #000000;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
	}
	
	/* Empty State */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 3rem 1rem;
		color: var(--gray-dark, #555);
	}
	
	.empty-state h2 {
		margin: 1.5rem 0 0.5rem;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--primary-black, #1a1a1a);
	}
	
	/* Dark mode empty state */
	:global(.dark) .empty-state h2 {
		color: #f3f4f6;
	}
	
	.empty-state p {
		font-size: 0.9375rem;
		max-width: 300px;
	}
	
	/* Dark mode empty state paragraph */
	:global(.dark) .empty-state p {
		color: #9ca3af;
	}
	
	/* Posts Table */
	.posts-table-container {
		overflow-x: auto;
	}
	
	.posts-table {
		width: 100%;
		border-collapse: collapse;
	}
	
	.posts-table th,
	.posts-table td {
		padding: 1rem;
		text-align: left;
		border-bottom: 1px solid #eaeaea;
	}
	
	.posts-table th {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--gray-dark, #555);
	}
	
	/* Dark mode table headers */
	:global(.dark) .posts-table th {
		color: #d1d5db;
	}
	
	.posts-table td {
		font-size: 0.9375rem;
		color: var(--primary-black, #1a1a1a);
	}
	
	/* Dark mode table text */
	:global(.dark) .posts-table td {
		color: #f3f4f6;
	}
	
	.posts-table tr.selected {
		background-color: rgba(0, 0, 0, 0.02);
	}
	
	.checkbox-cell {
		width: 48px;
	}
	
	.actions-cell {
		width: 100px;
		text-align: right;
	}
	
	.title-cell {
		min-width: 250px;
	}
	
	.post-title {
		color: var(--primary-black, #1a1a1a);
		text-decoration: none;
		font-weight: 500;
	}
	
	/* Dark mode post title */
	:global(.dark) .post-title {
		color: #f3f4f6;
	}
	
	.post-title:hover {
		text-decoration: underline;
	}
	
	.action-btn {
		background: none;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
		border-radius: 4px;
		color: var(--gray-dark, #555);
	}
	
	/* Dark mode action buttons */
	:global(.dark) .action-btn {
		color: #9ca3af;
	}
	
	.action-btn:hover {
		background-color: #f8f8f5;
	}
	
	:global(.dark) .action-btn:hover {
		background-color: #374151;
	}
	
	.action-btn.delete:hover {
		color: #B22222;
	}
	
	:global(.dark) .action-btn.delete:hover {
		color: #ef4444;
	}
	
	.action-btn.restore:hover {
		color: #006400;
	}
	
	:global(.dark) .action-btn.restore:hover {
		color: #10b981;
	}

	/* Responsive styles only - no hardcoded colors */
	@media (max-width: 768px) {
		.content-header h1 {
			font-size: 1.25rem;
		}

		.dashboard-content {
			padding: 1.5rem;
		}
		
		.posts-table th,
		.posts-table td {
			padding: 0.75rem;
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
		
		.actions {
			width: 100%;
		}
		
		.actions button {
			flex-grow: 1;
			justify-content: center;
		}
	}
</style>
