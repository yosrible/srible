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

<header class="content-header">
	<h1>Archive</h1>
	{#if selectedPostIds.length > 0}
		<div class="actions">
			<button class="restore-btn" on:click={restoreSelected}>
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
			<button class="delete-btn" on:click={deleteSelected}>
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

<div class="dashboard-content">
	{#if archivedPosts.length === 0}
		<div class="empty-state">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
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
			<h2>No archived posts</h2>
			<p>When you archive posts, they'll appear here.</p>
		</div>
	{:else}
		<div class="posts-table-container">
			<table class="posts-table">
				<thead>
					<tr>
						<th class="checkbox-cell">
							<input 
								type="checkbox" 
								on:change={toggleSelectAll} 
								checked={selectedPostIds.length === archivedPosts.length && archivedPosts.length > 0}
							/>
						</th>
						<th>Title</th>
						<th>Date Archived</th>
						<th>Views</th>
						<th>Comments</th>
						<th class="actions-cell">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each archivedPosts as post}
						<tr class={selectedPostIds.includes(post.id) ? 'selected' : ''}>
							<td class="checkbox-cell">
								<input 
									type="checkbox" 
									checked={selectedPostIds.includes(post.id)} 
									on:change={() => toggleSelect(post.id)}
								/>
							</td>
							<td class="title-cell">
								<a href={`/dashboard/posts/${post.id}`} class="post-title">
									{post.title}
								</a>
							</td>
							<td>{post.date}</td>
							<td>{post.views.toLocaleString()}</td>
							<td>{post.comments}</td>
							<td class="actions-cell">
								<button class="action-btn restore" on:click={() => toggleSelect(post.id)} aria-label="Restore post">
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
								<button class="action-btn delete" on:click={() => toggleSelect(post.id)} aria-label="Delete post">
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
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		padding: 2rem;
		margin-bottom: 2rem;
		min-height: 400px;
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
	
	.empty-state p {
		font-size: 0.9375rem;
		max-width: 300px;
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
	
	.posts-table td {
		font-size: 0.9375rem;
		color: var(--primary-black, #1a1a1a);
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
	
	.action-btn:hover {
		background-color: #f8f8f5;
	}
	
	.action-btn.delete:hover {
		color: #B22222;
	}
	
	.action-btn.restore:hover {
		color: #006400;
	}

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
