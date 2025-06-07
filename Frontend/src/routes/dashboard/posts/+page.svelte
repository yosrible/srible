<script>
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	
	// Get sidebar controls from context
	const sidebar = getContext('sidebar');
	
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

<header class="content-header">
	<h1>Posts</h1>
	<button class="create-post-btn" on:click={handleCreatePost}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
			<path
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 5v14M5 12h14"
			/>
		</svg>
		<span>Create New Post</span>
	</button>
</header>

<div class="dashboard-content">
	<div class="posts-table">
		<div class="table-header">
			<div class="th">Title</div>
			<div class="th">Status</div>
			<div class="th">Date</div>
			<div class="th">Views</div>
			<div class="th">Actions</div>
		</div>
		{#each posts as post}
			<div class="table-row">
				<div class="td title">{post.title}</div>
				<div class="td status">
					<span class="status-badge {post.status.toLowerCase()}">{post.status}</span>
				</div>
				<div class="td date">{post.date}</div>
				<div class="td views">{post.views}</div>
				<div class="td actions">
					<button class="action-btn edit">
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
					<button class="action-btn delete">
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
	</div>
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

	.create-post-btn {
		background-color: var(--primary-black, #1a1a1a);
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.75rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: background-color 0.2s ease;
		min-height: 44px; /* Touch-friendly */
	}

	.create-post-btn:hover {
		background-color: #333;
	}

	/* Dashboard Content */
	.dashboard-content {
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		padding: 2rem;
		margin-bottom: 2rem;
	}

	/* Posts Table */
	.posts-table {
		width: 100%;
		border: 1px solid #eaeaea;
		border-radius: 6px;
		overflow: hidden;
	}

	.table-header {
		display: grid;
		grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
		background-color: #fafafa;
		border-bottom: 1px solid #eaeaea;
	}

	.th {
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--gray-dark, #555);
	}

	.table-row {
		display: grid;
		grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
		border-bottom: 1px solid #eaeaea;
		transition: background-color 0.2s ease;
	}

	.table-row:hover {
		background-color: rgba(0, 0, 0, 0.02);
	}

	.table-row:last-child {
		border-bottom: none;
	}

	.td {
		padding: 0.75rem 1rem;
		font-size: 0.9375rem;
		color: var(--primary-black, #1a1a1a);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		align-items: center;
	}

	.td.title {
		font-weight: 500;
	}

	.td.date, .td.views {
		color: var(--gray-dark, #555);
	}
	
	.status-badge {
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 500;
	}
	
	.status-badge.published {
		background-color: rgba(0, 128, 0, 0.1);
		color: #006400;
	}
	
	.status-badge.draft {
		background-color: rgba(128, 128, 128, 0.1);
		color: #555;
	}
	
	.td.actions {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-start;
	}
	
	.action-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s ease;
	}
	
	.action-btn:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
	
	.action-btn.edit {
		color: var(--gray-dark, #555);
	}
	
	.action-btn.delete {
		color: #d32f2f;
	}

	@media (max-width: 768px) {
		.content-header h1 {
			font-size: 1.25rem;
		}

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
		
		.table-header, .table-row {
			grid-template-columns: 1.5fr 0.8fr 0.7fr;
		}
	}
</style>
