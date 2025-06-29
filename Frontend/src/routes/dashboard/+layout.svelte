<script>
	import '../../app.css';
	import { onMount, setContext } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	// Sidebar state management
	let isSidebarOpen = true;
	let isMobile = false;
	let isHydrated = false;

	// Create a store for sidebar visibility that components can subscribe to
	const sidebarStore = writable(isSidebarOpen);

	// Make sidebar functions available to child components
	setContext('sidebar', {
		toggle: toggleSidebar,
		hide: () => {
			isSidebarOpen = false;
			sidebarStore.set(false);
		},
		show: () => {
			isSidebarOpen = true;
			sidebarStore.set(true);
		},
		store: sidebarStore
	});

	// Toggle sidebar visibility
	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
		sidebarStore.set(isSidebarOpen);
	}

	// Handle window resize
	const handleResize = () => {
		isMobile = window.innerWidth < 768;
		
		// On mobile, always start with sidebar closed
		if (isMobile && isSidebarOpen) {
			isSidebarOpen = false;
			sidebarStore.set(false);
		}
	};

	onMount(() => {
		// Mark as hydrated
		isHydrated = true;

		// Check if we're on mobile first
		isMobile = window.innerWidth < 768;

		// On mobile, close sidebar by default AFTER hydration
		if (isMobile) {
			setTimeout(() => {
				isSidebarOpen = false;
				sidebarStore.set(false);
			}, 50);
		}

		if (browser) {
			// Add window resize listener
			window.addEventListener('resize', handleResize);

			// Initial update
			handleResize();
		}

		// Add dashboard mode class
		document.body.classList.add('dashboard-mode');

		// Redirect to overview if at root dashboard
		if ($page.url.pathname === '/dashboard') {
			goto('/dashboard/overview');
		}

		return () => {
			document.body.classList.remove('dashboard-mode');
			window.removeEventListener('resize', handleResize);
		};
	});

	// Check which section is currently active based on URL
	$: activeSection = $page.url.pathname.split('/')[2] || 'overview';

	// Check if we should hide the sidebar (create post route) - only after hydration
	$: hideSidebar = isHydrated && $page.url.pathname === '/dashboard/posts/create';

	// Determine if sidebar should be visible (for CSS classes)
	$: showSidebar = !hideSidebar;

	// Ensure sidebar is open by default on desktop when not on create page
	$: if (isHydrated && showSidebar && !isMobile) {
		isSidebarOpen = true;
		sidebarStore.set(true);
	}

	// Check if current page is the root dashboard (which has its own sidebar)
	$: isRootDashboard = $page.url.pathname === '/dashboard';

	// Define colors for each section
	const sectionColors = {
		overview: '#3b82f6', // Blue
		posts: '#10b981', // Green
		analytics: '#8b5cf6', // Purple
		settings: '#f59e0b', // Amber
		themes: '#ec4899', // Pink
		archive: '#ef4444' // Red
	};

	// Get active section color
	$: activeSectionColor = sectionColors[activeSection] || sectionColors.overview;
</script>

<!-- Custom dashboard layout without navbar -->
<svelte:head>
	<style>
		body {
			background-color: #f8f8f5;
		}
		/* Hide the main site navbar when in dashboard mode */
		body > nav,
		.global-navbar,
		body > div > nav,
		body > div > div > nav {
			display: none !important;
		}
	</style>
</svelte:head>

<div class="flex min-h-screen bg-gray-50" style="--active-section-color: {activeSectionColor}">
	<!-- Mobile overlay -->
	{#if isMobile && isSidebarOpen && showSidebar && !isRootDashboard}
		<div 
			class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
			on:click={toggleSidebar}
		></div>
	{/if}

	<!-- Sidebar - only render when not on root dashboard and not on create page -->
	{#if showSidebar && !isRootDashboard}
		<aside 
			class="fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out {showSidebar ? 'md:translate-x-0' : 'translate-x-full'} {isSidebarOpen && showSidebar ? 'translate-x-0' : '-translate-x-full'}"
			style="display: {showSidebar ? 'block' : 'none'}"
		>
			<div class="flex flex-col h-full">
				<!-- Sidebar Header -->
				<div class="flex items-center justify-between p-6 border-b border-gray-200">
					<h2 class="text-xl font-bold text-gray-900"><a href="/">Srible</a></h2>
					<!-- Close button for mobile -->
					<button 
						class="md:hidden p-2 text-gray-500 hover:text-gray-700"
						on:click={toggleSidebar}
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>

				<!-- Navigation -->
				<nav class="flex-1 p-4 space-y-2 overflow-y-auto">
					<a 
						href="/dashboard/overview" 
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'overview' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
							<polyline points="9 22 9 12 15 12 15 22"></polyline>
						</svg>
						Overview
					</a>

					<a 
						href="/dashboard/posts" 
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'posts' ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
							<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
						</svg>
						Posts
					</a>

					<a 
						href="/dashboard/analytics" 
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'analytics' ? 'text-purple-600 bg-purple-50 border-l-4 border-purple-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 20V10M12 20V4M6 20v-6"></path>
						</svg>
						Analytics
					</a>

					<a 
						href="/dashboard/settings" 
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'settings' ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
						</svg>
						Settings
					</a>

					<a 
						href="/dashboard/themes" 
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'themes' ? 'text-pink-600 bg-pink-50 border-l-4 border-pink-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992Z"></path>
						</svg>
						Themes
					</a>

					<a 
						href="/dashboard/archive" 
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'archive' ? 'text-red-600 bg-red-50 border-l-4 border-red-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
						</svg>
						Archive
					</a>
				</nav>
			</div>
		</aside>
	{/if}

	<!-- Main Content -->
	<main class="flex-1 transition-all duration-300 ease-in-out" class:ml-64={showSidebar && !isMobile && !isRootDashboard}>
		<!-- Mobile Header - only show when sidebar is available and not on root dashboard -->
		{#if showSidebar && !isRootDashboard}
			<div class="md:hidden bg-white border-b border-gray-200 px-4 py-3">
				<div class="flex items-center justify-between">
					<button 
						class="p-2 text-gray-500 hover:text-gray-700"
						on:click={toggleSidebar}
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					<h1 class="text-lg font-semibold text-gray-900">Srible</h1>
					<div class="w-10"></div> <!-- Spacer for centering -->
				</div>
			</div>
		{/if}

		<!-- Page Content -->
		<div class="h-full overflow-y-auto">
			<slot />
		</div>
	</main>
</div>

<style>
	/* Dark mode support */
	:global(.dark) .sidebar {
		background-color: #1f2937;
		border-right-color: #374151;
	}

	:global(.dark) .nav-item {
		color: #d1d5db;
	}

	:global(.dark) .nav-item:hover {
		background-color: #374151;
		color: #f9fafb;
	}

	:global(.dark) .nav-item.active {
		background-color: #374151;
		color: var(--active-section-color);
	}

	/* Hide the main site navbar when in dashboard mode */
	:global(body.dashboard-mode > nav),
	:global(body.dashboard-mode .global-navbar),
	:global(body.dashboard-mode > div > nav),
	:global(body.dashboard-mode > div > div > nav) {
		display: none !important;
	}

	:global(body.dashboard-mode) {
		overflow-x: hidden;
		background-color: #f8f8f5;
	}

	/* Ensure proper scrolling behavior */
	:global(body.dashboard-mode) {
		overflow: hidden;
	}

	:global(body.dashboard-mode .main-content) {
		overflow-y: auto;
		height: 100vh;
	}

	/* Ensure sidebar is always visible on desktop when not on create page */
	@media (min-width: 768px) {
		aside {
			transform: translateX(0) !important;
		}
	}

	/* Ensure main content has proper margin on desktop when sidebar is shown */
	@media (min-width: 768px) {
		main.ml-64 {
			margin-left: 16rem;
		}
	}

	/* Smooth transitions for sidebar visibility */
	aside {
		transition: transform 0.3s ease-in-out;
	}

	main {
		transition: margin-left 0.3s ease-in-out;
	}

	/* Ensure sidebar is properly positioned and visible */
	aside[style*="display: block"] {
		display: block !important;
	}

	aside[style*="display: none"] {
		display: none !important;
	}
</style>