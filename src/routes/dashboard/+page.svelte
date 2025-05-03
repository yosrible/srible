<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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

	function handleCreatePost() {
		goto('/dashboard/posts/create');
	}

	// Check if user is in waitlist mode - this would be replaced with actual auth check
	let isWaitlisted = false;
	
	onMount(() => {
		// In a real app, this would check authentication status
		// For now, we'll just simulate a non-waitlisted user
		isWaitlisted = false;
	});
</script>

{#if isWaitlisted}
	<div class="waitlist-container">
		<div class="waitlist-content">
			<h1>You're on our waitlist!</h1>
			<p>
				Thanks for your interest in Srible. We're currently in beta and will notify you when your account is
				ready.
			</p>
			<button class="back-button" on:click={() => goto('/')}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19 12H5M12 19l-7-7 7-7"
					/>
				</svg>
				<span>Back to Home</span>
			</button>
		</div>
	</div>
{:else}
	<!-- Dashboard Overview Content -->
	<header class="dashboard-header">
		<h1>Dashboard</h1>
		<button class="create-post-button" on:click={handleCreatePost}>
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

	<div class="stats-container">
		<div class="stat-card">
			<div class="stat-header">Total Page Views</div>
			<div class="stat-value">{pageViews}</div>
		</div>
		<div class="stat-card">
			<div class="stat-header">Total Posts</div>
			<div class="stat-value">{totalPosts}</div>
		</div>
		<div class="stat-card">
			<div class="stat-header">Subscribers</div>
			<div class="stat-value">{totalSubscribers}</div>
		</div>
		<div class="stat-card">
			<div class="stat-header">Comments</div>
			<div class="stat-value">{totalComments}</div>
		</div>
	</div>

	<div class="recent-posts">
		<h2>Recent Posts</h2>
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Date</th>
					<th>Views</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each recentPosts as post}
					<tr>
						<td>{post.title}</td>
						<td>{post.date}</td>
						<td>{post.views}</td>
						<td>
							<button class="action-button edit" aria-label="Edit post">
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
							<button class="action-button view" aria-label="View post">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
									<path
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
									/>
									<circle cx="12" cy="12" r="3" />
								</svg>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	/* Waitlist Styles */
	.waitlist-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: var(--primary-white, #f8f8f5);
		padding: 2rem;
	}

	.waitlist-content {
		max-width: 500px;
		background-color: #ffffff;
		padding: 2.5rem;
		border-radius: 12px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.waitlist-content h1 {
		font-size: 1.75rem;
		margin-bottom: 1rem;
		font-weight: 700;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
	}

	.waitlist-content p {
		color: var(--gray-dark, #555);
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.back-button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		font-weight: 500;
		color: white;
		background-color: var(--primary-black, #1a1a1a);
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-width: 200px;
		margin: 0 auto;
		min-height: 44px; /* Touch-friendly */
	}

	.back-button:hover {
		background-color: #333;
	}

	/* Dashboard Header */
	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.dashboard-header h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
	}

	.create-post-button {
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
		min-height: 44px; /* Touch-friendly */
	}

	.create-post-button:hover {
		background-color: #333;
	}

	/* Stats Container */
	.stats-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background-color: #ffffff;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
	}

	.stat-header {
		font-size: 0.875rem;
		color: var(--gray-dark, #555);
		margin-bottom: 0.5rem;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-black, #1a1a1a);
	}

	/* Recent Posts */
	.recent-posts {
		background-color: #ffffff;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
	}

	.recent-posts h2 {
		margin-top: 0;
		margin-bottom: 1rem;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
	}

	.recent-posts table {
		width: 100%;
		border-collapse: collapse;
	}

	.recent-posts th,
	.recent-posts td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid #eaeaea;
	}

	.recent-posts th {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--gray-dark, #555);
	}

	.recent-posts td {
		font-size: 0.9375rem;
	}

	.action-button {
		background: none;
		border: none;
		padding: 0.25rem;
		margin-right: 0.5rem;
		cursor: pointer;
		color: var(--gray-dark, #555);
		border-radius: 4px;
	}

	.action-button:hover {
		background-color: #f5f5f5;
	}

	.action-button.edit:hover {
		color: var(--primary-black, #1a1a1a);
	}

	.action-button.view:hover {
		color: var(--primary-black, #1a1a1a);
	}

	/* Responsive Styles */
	@media (max-width: 768px) {
		.dashboard-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.dashboard-header h1 {
			font-size: 1.25rem;
		}

		.create-post-button {
			width: 100%;
			justify-content: center;
		}

		.stats-container {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.recent-posts {
			padding: 1rem;
		}

		.recent-posts table {
			font-size: 0.875rem;
		}

		.recent-posts th:nth-child(2),
		.recent-posts td:nth-child(2) {
			display: none;
		}
	}
</style>
