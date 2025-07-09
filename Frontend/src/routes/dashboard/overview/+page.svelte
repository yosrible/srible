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

<header class="content-header flex justify-between items-center mb-8">
	<h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">Dashboard</h1>
	<button 
		class="create-post-btn bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 border-none rounded-md px-5 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-colors duration-200 min-h-[44px]"
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
		<!-- Pen icon -->
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M12 20h9" />
			<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
		</svg>
		<span class="hidden sm:inline">Create New Post</span>
	</button>
</header>

	<div class="dashboard-content bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8 mb-8">
	<div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
		<div class="stat-card bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700 min-h-[100px] flex flex-col justify-center">
			<div class="stat-value text-3xl font-bold text-gray-900 dark:text-white mb-2">{pageViews}</div>
			<div class="stat-label text-sm text-gray-600 dark:text-gray-300">Page Views</div>
		</div>
		<div class="stat-card bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700 min-h-[100px] flex flex-col justify-center">
			<div class="stat-value text-3xl font-bold text-gray-900 dark:text-white mb-2">{totalPosts}</div>
			<div class="stat-label text-sm text-gray-600 dark:text-gray-300">Posts</div>
		</div>
		<div class="stat-card bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700 min-h-[100px] flex flex-col justify-center">
			<div class="stat-value text-3xl font-bold text-gray-900 dark:text-white mb-2">{totalSubscribers}</div>
			<div class="stat-label text-sm text-gray-600 dark:text-gray-300">Subscribers</div>
		</div>
		<div class="stat-card bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700 min-h-[100px] flex flex-col justify-center">
			<div class="stat-value text-3xl font-bold text-gray-900 dark:text-white mb-2">{totalComments}</div>
			<div class="stat-label text-sm text-gray-600 dark:text-gray-300">Comments</div>
		</div>
	</div>

	<div class="recent-posts-section mt-8">
		<h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Posts</h2>
		<div class="posts-table w-full border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
			<div class="table-header grid grid-cols-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
				<div class="th px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Title</div>
				<div class="th px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Date</div>
				<div class="th px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Views</div>
			</div>
			{#each recentPosts as post}
				<div class="table-row grid grid-cols-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 last:border-b-0">
					<div class="td px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium truncate">{post.title}</div>
					<div class="td px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{post.date}</div>
					<div class="td px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{post.views}</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* Responsive styles only - no hardcoded colors */
	@media (max-width: 992px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.dashboard-content {
			padding: 1.5rem;
		}
	}

	@media (max-width: 640px) {
		.content-header {
			flex-direction: row;
			align-items: center;
			gap: 0.5rem;
		}
		.create-post-btn {
			margin-left: auto;
			padding: 0.5rem 0.75rem;
			font-size: 0.95rem;
		}
		.create-post-btn span {
			display: none;
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
