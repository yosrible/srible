<script lang="ts">
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	// Define sidebar interface
	interface Sidebar {
		hide: () => void;
		show: () => void;
		toggle: () => void;
	}

	// Get sidebar controls from context with proper typing
	const sidebar = getContext<Sidebar>('sidebar');

	// Placeholder data for analytics
	let pageViews = 1245;
	let totalPosts = 8;
	let totalSubscribers = 87;
	let totalComments = 32;

	// Placeholder recent posts
	let recentPosts = [
		{
			id: 1,
			title: 'Getting Started with Srible',
			date: '2025-04-28',
			views: 347
		},
		{
			id: 2,
			title: 'How to Optimize Your Blog for SEO',
			date: '2025-04-25',
			views: 289
		},
		{
			id: 3,
			title: 'The Importance of Personal Branding',
			date: '2025-04-21',
			views: 412
		}
	];
</script>

<header class="content-header">
	<h1>Dashboard</h1>
	<button 
		class="create-post-btn" 
		on:click={() => {
			// Hide sidebar immediately
			if (sidebar) {
				sidebar.hide();
			}
			// Navigate with a small delay to ensure sidebar hides properly
			setTimeout(() => {
				goto('/dashboard/posts/create');
			}, 50);
		}}
	>
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
	<div class="stats-grid">
		<div class="stat-card">
			<div class="stat-value">{pageViews}</div>
			<div class="stat-label">Page Views</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{totalPosts}</div>
			<div class="stat-label">Posts</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{totalSubscribers}</div>
			<div class="stat-label">Subscribers</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{totalComments}</div>
			<div class="stat-label">Comments</div>
		</div>
	</div>

	<div class="recent-posts-section">
		<h2>Recent Posts</h2>
		<div class="posts-table">
			<div class="table-header">
				<div class="th">Title</div>
				<div class="th">Date</div>
				<div class="th">Views</div>
			</div>
			{#each recentPosts as post}
				<div class="table-row">
					<div class="td title">{post.title}</div>
					<div class="td date">{post.date}</div>
					<div class="td views">{post.views}</div>
				</div>
			{/each}
		</div>
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
		text-decoration: none;
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

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background-color: #fafafa;
		border-radius: 8px;
		padding: 1.5rem;
		text-align: center;
		border: 1px solid #eaeaea;
		min-height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.stat-value {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--primary-black, #1a1a1a);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--gray-dark, #555);
	}

	/* Recent Posts Table */
	.recent-posts-section {
		margin-top: 2rem;
	}

	.recent-posts-section h2 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
		font-weight: 600;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
	}

	.posts-table {
		width: 100%;
		border: 1px solid #eaeaea;
		border-radius: 6px;
		overflow: hidden;
	}

	.table-header {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
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
		grid-template-columns: 2fr 1fr 1fr;
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
	}

	.td.title {
		font-weight: 500;
	}

	.td.date, .td.views {
		color: var(--gray-dark, #555);
	}

	@media (max-width: 992px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.content-header h1 {
			font-size: 1.25rem;
		}

		.dashboard-content {
			padding: 1.5rem;
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

		.stats-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.table-header, .table-row {
			grid-template-columns: 1.5fr 0.8fr 0.5fr;
		}

		.th, .td {
			padding: 0.6rem 0.5rem;
			font-size: 0.875rem;
		}
	}

	@media (max-width: 480px) {
		.td.title {
			max-width: 150px;
		}
	}
</style>
