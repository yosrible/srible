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

<div class="dashboard-layout flex flex-col md:flex-row min-h-screen bg-gray-50" style="--active-section-color: {activeSectionColor}">
	<!-- Mobile overlay -->
	{#if isMobile && showSidebar && !isRootDashboard}
		<button 
			class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 {isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
			   w-full h-full focus:outline-none"
			on:click={toggleSidebar}
			on:keydown={(e) => e.key === 'Escape' && toggleSidebar()}
			aria-label="Close sidebar"
		>
			<span class="sr-only">Close sidebar</span>
		</button>
	{/if}

	<!-- Sidebar - only render when not on root dashboard and not on create page -->
	{#if showSidebar && !isRootDashboard}
		<aside 
			class="fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out {isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} {!isMobile ? 'md:translate-x-0' : ''}"
			style="display: {showSidebar ? 'block' : 'none'}"
			data-visible={isSidebarOpen}
		>
			<div class="flex flex-col h-full overflow-y-auto">
				<!-- Sidebar Header -->
				<div class="p-6 border-b border-gray-200">
					<h2 class="text-xl font-bold text-gray-900 font-sans"><a href="/">Srible</a></h2>
				</div>

				<!-- Navigation -->
				<nav class="flex-1 p-4 space-y-2">
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
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'posts' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
						Posts
					</a>

					<a 
						href="/dashboard/analytics" 
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'analytics' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
						</svg>
						Analytics
					</a>

					<a 
						href="/dashboard/archive" 
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'archive' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 3h14v17a1 1 0 01-1 1H6a1 1 0 01-1-1V3z"></path>
						</svg>
						Archive
					</a>

					<a 
						href="/dashboard/themes" 
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'themes' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.829 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.486m-5.172-5.172l8.486-8.486"></path>
						</svg>
						Themes
					</a>

					<a 
						href="/dashboard/settings" 
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {activeSection === 'settings' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
						</svg>
						Settings
					</a>
				</nav>

				<!-- User section -->
				<div class="p-4 border-t border-gray-200">
					<div class="flex items-center">
						<div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
							U
						</div>
						<div class="ml-3 font-sans">
							<p class="text-sm font-medium text-gray-900">User Name</p>
							<p class="text-xs text-gray-500">user@example.com</p>
						</div>
					</div>
				</div>
			</div>
		</aside>
	{/if}

	<!-- Main Content -->
	<main class="flex-1 transition-all duration-300 ease-in-out overflow-y-auto font-sans h-[calc(100vh-4rem)] md:h-[calc(100vh-1rem)]" class:md:ml-64={showSidebar && !isRootDashboard} style="scrollbar-width: thin; -webkit-overflow-scrolling: touch;">
		<!-- Mobile Header - only show when sidebar is available and not on root dashboard -->
		{#if showSidebar && !isRootDashboard}
			<div class="md:hidden bg-white border-b border-gray-200 px-4 py-3">
				<div class="flex items-center justify-between">
					<button 
					on:click={toggleSidebar}
					class="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
					aria-label="Toggle menu"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</button>
				</div>
			</div>
		{/if}

		<!-- Page content -->
		<div class="min-h-full p-6">
			<slot />
		</div>
	</main>
</div>

<style>
	/* Scoped styles specifically for the dashboard layout */
	.dashboard-layout {
		/* Ensure the dashboard layout takes full viewport */
		height: 100vh;
		overflow: hidden;
	}

	/* Ensure the main site navbar is hidden in dashboard */
	:global(body.dashboard-mode > nav),
	:global(body.dashboard-mode > footer) {
		display: none !important;
	}

	/* Dashboard specific styles */
	.dashboard-layout aside {
		height: 100vh;
		overflow-y: auto;
	}

	.dashboard-layout main {
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
	}

	/* Sidebar transitions */
	.dashboard-layout aside {
		transition: transform 0.3s ease-in-out;
	}

	/* Mobile styles */
	@media (max-width: 767px) {
		.dashboard-layout main {
			height: calc(100vh - 4rem);
		}

		.dashboard-layout aside {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 40;
			transform: translateX(-100%);
			transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
		}

		.dashboard-layout aside[data-visible="true"] {
			transform: translateX(0);
		}

	}

	/* Desktop styles */
	@media (min-width: 768px) {
		.dashboard-layout aside {
			transform: translateX(0) !important;
		}

		.dashboard-layout main {
			margin-left: 16rem;
		}
	}

	/* Custom scrollbar for WebKit browsers */
	.dashboard-layout main::-webkit-scrollbar {
		width: 6px;
	}

	.dashboard-layout main::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	.dashboard-layout main::-webkit-scrollbar-thumb {
		background-color: #c1c1c1;
		border-radius: 3px;
	}

	.dashboard-layout main::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
</style>