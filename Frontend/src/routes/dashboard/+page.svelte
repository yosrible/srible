<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
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

	let isSidebarOpen = false;
	function toggleSidebar() { isSidebarOpen = !isSidebarOpen; }
	function closeSidebar() { isSidebarOpen = false; }

	$: userEmail = $page?.data?.session?.user?.email || 'User';
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
<div class="min-h-screen bg-gradient-to-br from-gray-25 to-gray-50 flex overflow-hidden">
	<!-- Sidebar -->
	<aside class="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl transform -translate-x-full md:translate-x-0 transition-all duration-300 ease-in-out z-40 h-screen flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
		<div class="flex-shrink-0">
			<div class="flex items-center h-16 px-6 border-b">
				<span class="font-bold text-2xl tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Srible</span>
				<button class="ml-auto md:hidden p-2" on:click={closeSidebar} aria-label="Close sidebar">
					<svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>
			</div>
		</div>
		<nav class="flex-1 overflow-y-auto py-6">
			<ul class="flex flex-col gap-1">
				<li>
					<a href="/dashboard/overview" class="flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-gray-200 hover:text-white hover:bg-gray-700/50 border-l-4 border-transparent hover:border-indigo-400 transition-all duration-200 group">
						<!-- Optionally add an icon here -->
						Overview
					</a>
				</li>
				<li>
					<a href="/dashboard/posts" class="flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-gray-200 hover:text-white hover:bg-gray-700/50 border-l-4 border-transparent hover:border-indigo-400 transition-all duration-200 group">
						Posts
					</a>
				</li>
				<li>
					<a href="/dashboard/analytics" class="flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-gray-200 hover:text-white hover:bg-gray-700/50 border-l-4 border-transparent hover:border-indigo-400 transition-all duration-200 group">
						Analytics
					</a>
				</li>
				<li>
					<a href="/dashboard/settings" class="flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-gray-200 hover:text-white hover:bg-gray-700/50 border-l-4 border-transparent hover:border-indigo-400 transition-all duration-200 group">
						Settings
					</a>
				</li>
				<li>
					<a href="/dashboard/themes" class="flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-gray-200 hover:text-white hover:bg-gray-700/50 border-l-4 border-transparent hover:border-indigo-400 transition-all duration-200 group">
						Themes
					</a>
				</li>
				<li>
					<a href="/dashboard/archive" class="flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-gray-200 hover:text-white hover:bg-gray-700/50 border-l-4 border-transparent hover:border-indigo-400 transition-all duration-200 group">
						Archive
					</a>
				</li>
			</ul>
		</nav>
		<!-- User profile section (sticky at bottom) -->
		<div class="flex-shrink-0 border-t border-gray-700/50 p-4 bg-gray-800/50 backdrop-blur-sm">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
					<svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
					</svg>
				</div>
				<div>
					<p class="text-sm font-medium text-white">{userEmail}</p>
					<p class="text-xs text-gray-300">Admin</p>
				</div>
			</div>
		</div>
	</aside>

	<!-- Overlay for mobile sidebar -->
	{#if isSidebarOpen}
		<div 
		class="fixed inset-0 z-30 bg-black/20 md:hidden" 
		on:click={closeSidebar}
		on:keydown={(e) => e.key === 'Escape' && closeSidebar()}
		role="button"
		tabindex="0"
		aria-label="Close sidebar"
	></div>
	{/if}

	<!-- Main content area -->
	<div class="flex-1 flex flex-col w-full md:ml-64 h-screen overflow-hidden">
		<!-- Navbar -->
		<nav class="bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm flex items-center justify-between px-6 py-4 z-10 flex-shrink-0">
			<div class="flex items-center gap-2">
				<button class="block md:hidden p-2" on:click={toggleSidebar} aria-label="Open sidebar">
					<svg class="w-7 h-7 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
					</svg>
				</button>
				<span class="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Srible</span>
			</div>
			<button class="create-post-btn" on:click={handleCreatePost}>
				<svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 5v14M5 12h14"/>
				</svg>
				<span class="btn-text">New Post</span>
			</button>
		</nav>

		<!-- Scrollable content -->
		<div class="flex-1 overflow-y-auto p-2">
			<main class="p-4 md:p-8">
				<!-- Stats Cards -->
				<div class="stats-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div class="stat-card bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-2 border border-gray-100 hover:border-gray-200">
						<div class="stat-header text-gray-500 text-xs font-medium uppercase tracking-wider">Total Page Views</div>
						<div class="stat-value text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{pageViews}</div>
					</div>
					<div class="stat-card bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-2 border border-gray-100 hover:border-gray-200">
						<div class="stat-header text-gray-500 text-xs font-medium uppercase tracking-wider">Total Posts</div>
						<div class="stat-value text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{totalPosts}</div>
					</div>
					<div class="stat-card bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-2 border border-gray-100 hover:border-gray-200">
						<div class="stat-header text-gray-500 text-xs font-medium uppercase tracking-wider">Subscribers</div>
						<div class="stat-value text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{totalSubscribers}</div>
					</div>
					<div class="stat-card bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-2 border border-gray-100 hover:border-gray-200">
						<div class="stat-header text-gray-500 text-xs font-medium uppercase tracking-wider">Comments</div>
						<div class="stat-value text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{totalComments}</div>
					</div>
				</div>

				<!-- Recent Posts Table -->
				<div class="recent-posts bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
					<div class="flex items-center justify-between mb-6">
					<h2 class="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Recent Posts</h2>
					<button class="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors duration-200">
						View All
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
					</button>
				</div>
					<div class="overflow-x-auto">
						<table class="min-w-full text-left">
							<thead>
								<tr>
									<th class="py-3 px-4 text-gray-500 font-semibold text-sm">Title</th>
									<th class="py-3 px-4 text-gray-500 font-semibold text-sm">Date</th>
									<th class="py-3 px-4 text-gray-500 font-semibold text-sm">Views</th>
									<th class="py-3 px-4 text-gray-500 font-semibold text-sm">Actions</th>
								</tr>
							</thead>
							<tbody>
								{#each recentPosts as post}
									<tr class="border-t last:border-b hover:bg-neutral-50 transition">
										<td class="py-3 px-4 font-medium text-black">{post.title}</td>
										<td class="py-3 px-4 text-gray-600">{post.date}</td>
										<td class="py-3 px-4 text-gray-600">{post.views}</td>
										<td class="py-3 px-4">
											<button class="inline-flex items-center p-2 rounded hover:bg-neutral-100 transition" aria-label="Edit post">
												<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
													<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
												</svg>
											</button>
											<button class="inline-flex items-center p-2 rounded hover:bg-neutral-100 transition" aria-label="View post">
												<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
													<circle cx="12" cy="12" r="3"/>
												</svg>
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</div>
	</div>
</div>
{/if}

<style>
	/* Create Post Button */
	.create-post-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: #000000;
		color: #ffffff;
		border: 1px solid #000000;
		border-radius: 0.5rem;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		cursor: pointer;
		transition: all 0.2s ease;
		height: 40px;
	}

	.create-post-btn:hover {
		background-color: #222222;
		border-color: #222222;
	}

	.create-post-btn:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
	}

	.create-post-btn .btn-icon {
		transition: transform 0.2s ease;
	}

	.create-post-btn:hover .btn-icon {
		transform: translateX(2px);
	}

	/* Responsive styles */
	@media (max-width: 640px) {
		.create-post-btn {
			padding: 0.5rem 0.75rem;
			height: 36px;
		}
		
		.create-post-btn .btn-text {
			display: none;
		}
	}

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

	/* Dashboard Layout */
	.min-h-screen {
		min-height: 100vh;
	}

	.flex {
		display: flex;
	}

	.flex-1 {
		flex: 1;
	}

	.gap-2 {
		gap: 0.5rem;
	}

	.gap-3 {
		gap: 0.75rem;
	}

	.gap-6 {
		gap: 1.5rem;
	}

	.mb-8 {
		margin-bottom: 2rem;
	}

	/* Sidebar */
	aside {
		position: fixed;
		z-index: 40;
		inset: 0 0 0 0;
		left: 0;
		width: 16rem; /* w-64 */
		background-color: #fff;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
		transition: transform 0.3s ease;
	}

	aside nav {
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
	}

	aside a {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		border-radius: 0.5rem;
		font-weight: 500;
		color: #1f2937; /* text-gray-800 */
		border-left: 2px solid transparent;
		transition: background 0.2s, border-color 0.2s;
		text-decoration: none;
	}

	aside a:hover {
		background-color: #f3f4f6; /* hover:bg-gray-100 */
		border-left: 2px solid #000; /* hover:border-black */
	}

	/* Navbar */
	nav {
		background-color: #fff;
		box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		position: sticky;
		top: 0;
		z-index: 10;
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

	.recent-posts th:nth-child(2),
	.recent-posts td:nth-child(2) {
		display: none;
	}
</style>
