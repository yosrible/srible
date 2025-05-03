<script>
	import '../../app.css';
	import { onMount, afterUpdate, setContext } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	let windowWidth = 0;
	let isMobileView = false;
	let sidebarVisible = true; // Track sidebar visibility state

	// Create a store for sidebar visibility that components can subscribe to
	const sidebarStore = writable(sidebarVisible);

	// Make sidebar functions available to child components
	setContext('sidebar', {
		toggle: toggleSidebar,
		hide: () => {
			sidebarVisible = false;
			sidebarStore.set(false);
			updateSidebarVisibility();
		},
		show: () => {
			sidebarVisible = true;
			sidebarStore.set(true);
			updateSidebarVisibility();
		},
		store: sidebarStore
	});

	// Update sidebar visibility based on toggle state
	function updateSidebarVisibility() {
		const sidebar = document.querySelector('.sidebar');
		const sidebarNav = document.querySelector('.sidebar-nav');
		const contentArea = document.querySelector('.dashboard-content-area');
		const mainContent = document.querySelector('.main-content');

		if (sidebar && sidebarNav) {
			// Apply transition classes instead of direct style changes
			if (sidebarVisible) {
				// Show sidebar
				document.body.classList.add('sidebar-visible');
				document.body.classList.remove('sidebar-hidden');
				
				// Set immediate styles for proper rendering
				sidebar.style.width = '240px';
				sidebar.style.transform = 'translateX(0)';
				sidebar.style.display = 'flex';
				sidebar.style.visibility = 'visible';
				sidebarNav.style.display = 'flex';
				sidebarNav.style.visibility = 'visible';
				
				// Adjust content area
				if (contentArea) {
					contentArea.style.width = 'calc(100% - 240px)';
					contentArea.style.marginLeft = '240px';
				}
				
				if (mainContent) {
					mainContent.style.width = 'calc(100% - 240px)';
					mainContent.style.marginLeft = '240px';
				}
			} else {
				// Hide sidebar
				document.body.classList.add('sidebar-hidden');
				document.body.classList.remove('sidebar-visible');
				
				// Set immediate styles for proper hiding
				sidebar.style.width = '0';
				sidebar.style.transform = 'translateX(-240px)';
				
				// Keep sidebar hidden but don't display:none yet to allow transition
				sidebar.style.visibility = 'hidden';
				sidebarNav.style.visibility = 'hidden';
				
				// After transition time, fully hide
				setTimeout(() => {
					if (!sidebarVisible) {
						sidebar.style.display = 'none';
						sidebarNav.style.display = 'none';
					}
				}, 300);
				
				// Immediately adjust content area to fill space
				if (contentArea) {
					contentArea.style.width = 'calc(100% - 50px)';
					contentArea.style.marginLeft = '50px';
					contentArea.style.paddingLeft = '20px';
				}
				
				if (mainContent) {
					mainContent.style.width = 'calc(100% - 50px)';
					mainContent.style.marginLeft = '50px';
					mainContent.style.paddingLeft = '10px';
				}
			}
		}

		// Check if we're in mobile view
		isMobileView = windowWidth <= 640;
	}

	// Toggle sidebar visibility
	function toggleSidebar() {
		sidebarVisible = !sidebarVisible;
		sidebarStore.set(sidebarVisible);
		updateSidebarVisibility();

		// Save preference in localStorage
		if (browser) {
			try {
				localStorage.setItem('srible_sidebar_visible', sidebarVisible.toString());
			} catch (e) {
				console.error('Error saving sidebar preference:', e);
			}
		}
	}

	// Hide the navbar when on dashboard pages
	onMount(() => {
		// Add a specific class to the body to handle dashboard layout
		document.body.classList.add('dashboard-mode');

		// Check window size
		windowWidth = window.innerWidth;

		// Load saved sidebar preference
		if (browser) {
			try {
				const savedPreference = localStorage.getItem('srible_sidebar_visible');
				if (savedPreference !== null) {
					sidebarVisible = savedPreference === 'true';
				}
			} catch (e) {
				console.error('Error loading sidebar preference:', e);
			}
		}

		updateSidebarVisibility();

		// Add window resize listener
		const handleResize = () => {
			windowWidth = window.innerWidth;
			updateSidebarVisibility();
		};

		window.addEventListener('resize', handleResize);

		// If we're at the root dashboard URL, redirect to overview
		if ($page.url.pathname === '/dashboard') {
			goto('/dashboard/overview');
		}

		return () => {
			// Remove the class when leaving dashboard pages
			document.body.classList.remove('dashboard-mode');
			window.removeEventListener('resize', handleResize);
		};
	});

	afterUpdate(() => {
		updateSidebarVisibility();
	});

	// Check which section is currently active based on URL
	$: activeSection = $page.url.pathname.split('/')[2] || 'overview';

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
	<!-- Add immediate CSS to hide navbar before JavaScript runs -->
	<style>
		body {
			background-color: #f8f8f5;
		}
		/* More specific selector to only target the main site navbar */
		body > nav,
		.global-navbar,
		body > div > nav {
			display: none !important;
		}
		/* Ensure the dashboard sidebar is visible */
		.sidebar,
		.sidebar-nav,
		.dashboard-container {
			display: flex !important;
		}
	</style>
</svelte:head>

<div class="dashboard-container" style="--active-section-color: {activeSectionColor}">
	<aside class="sidebar">
		<div class="sidebar-header">
			<h2>Srible</h2>
			<button on:click={toggleSidebar} class="sidebar-toggle" aria-label="Toggle sidebar">
				{#if sidebarVisible}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				{/if}
			</button>
		</div>
		<nav class="sidebar-nav">
			<a href="/dashboard/overview" class="nav-item {activeSection === 'overview' ? 'active' : ''}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
					/>
					<polyline points="9 22 9 12 15 12 15 22" />
				</svg>
				<span>Overview</span>
			</a>
			<a href="/dashboard/posts" class="nav-item {activeSection === 'posts' ? 'active' : ''}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
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
				<span>Posts</span>
			</a>
			<a
				href="/dashboard/analytics"
				class="nav-item {activeSection === 'analytics' ? 'active' : ''}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M18 20V10M12 20V4M6 20v-6"
					/>
				</svg>
				<span>Analytics</span>
			</a>
			<a href="/dashboard/settings" class="nav-item {activeSection === 'settings' ? 'active' : ''}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 6h18M10 12h11M3 12h3M3 18h18M15 18h3"
					/>
					<circle cx="7" cy="6" r="3" fill="none" stroke="currentColor" stroke-width="2" />
					<circle cx="17" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" />
					<circle cx="7" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="2" />
				</svg>
				<span>Settings</span>
			</a>
			<a href="/dashboard/themes" class="nav-item {activeSection === 'themes' ? 'active' : ''}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992Z"
					/>
				</svg>
				<span>Themes</span>
			</a>
			<a href="/dashboard/archive" class="nav-item {activeSection === 'archive' ? 'active' : ''}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 8v13H3V8M1 3h22v5H1z M10 12h4"
					/>
				</svg>
				<span>Archive</span>
			</a>
		</nav>
	</aside>

	<main class="main-content">
		{#if !sidebarVisible}
			<button on:click={toggleSidebar} class="floating-sidebar-toggle" aria-label="Show sidebar">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</button>
		{/if}
		<slot />
	</main>
</div>

<style>
	/* Dashboard Layout */
	.dashboard-container {
		display: flex;
		min-height: 100vh;
		width: 100%;
		background-color: var(--primary-white, #f8f8f5);
		overflow-x: hidden;
		position: relative;
	}

	/* Sidebar Styles */
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: var(--sidebar-width);
		display: flex;
		flex-direction: column;
		background-color: var(--primary-white, #f8f8f5);
		border-right: 1px solid #e5e7eb;
		z-index: 10;
		transition: transform var(--sidebar-transition-time) ease;
		overflow-x: hidden;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
	}

	.sidebar-header {
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid #e2e8f0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.sidebar-header::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(
			to right,
			#3b82f6,
			/* Blue */ #10b981,
			/* Green */ #8b5cf6,
			/* Purple */ #f59e0b,
			/* Amber */ #ec4899 /* Pink */
		);
	}

	.sidebar-header h2 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
	}

	.sidebar-nav {
		padding: 1rem 0;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		flex: 1;
		scrollbar-width: thin; /* Firefox */
		scrollbar-color: #aaa #f8f8f5; /* Firefox: thumb and track color */
	}

	.nav-item {
		display: flex;
		align-items: center;
		padding: 0.75rem 1.5rem;
		background: none;
		border: none;
		text-align: left;
		font-size: 0.9375rem;
		color: var(--gray-dark, #555);
		cursor: pointer;
		transition: all 0.2s ease;
		gap: 0.75rem;
		width: 100%;
		min-height: 44px; /* For touch-friendliness */
		text-decoration: none;
	}

	.nav-item:hover {
		background-color: rgba(0, 0, 0, 0.03);
		color: var(--primary-black, #1a1a1a);
	}

	.nav-item.active {
		color: var(--active-section-color);
		font-weight: 500;
		background-color: rgba(0, 0, 0, 0.04);
		border-left: 3px solid var(--active-section-color);
	}

	.nav-item svg {
		min-width: 18px;
		flex-shrink: 0;
		display: inline-block !important; /* Force display */
	}

	.nav-item span {
		display: inline-block !important; /* Force display */
	}

	/* Main Content Area */
	.main-content {
		width: calc(100% - var(--sidebar-width));
		margin-left: var(--sidebar-width);
		padding: 20px;
		min-height: 100vh;
		background-color: var(--primary-white, #f8f8f5);
		position: relative;
		transition: width var(--sidebar-transition-time) ease, margin-left var(--sidebar-transition-time) ease;
		overflow-x: hidden;
	}

	/* Hide the main site navbar when in dashboard mode using more specific selectors */
	:global(body.dashboard-mode > nav),
	:global(body.dashboard-mode > div > nav),
	:global(body.dashboard-mode .global-navbar) {
		display: none !important;
	}

	:global(body.dashboard-mode) {
		overflow-x: hidden;
		background-color: var(--primary-white, #f8f8f5);
	}

	/* Ensure the dashboard sidebar is visible */
	:global(body.sidebar-visible) .sidebar,
	:global(body.sidebar-visible) .sidebar-nav {
		transform: translateX(0);
		width: 240px;
	}

	:global(body.sidebar-hidden) .sidebar,
	:global(body.sidebar-hidden) .sidebar-nav {
		transform: translateX(-240px);
		width: 0;
	}

	:global(body.dashboard-mode .sidebar),
	:global(body.dashboard-mode .sidebar-nav) {
		display: flex;
	}

	:global(body.dashboard-mode .dashboard-container) {
		display: flex !important;
	}

	/* Responsive Styles */
	@media (max-width: 992px) {
		/* Tablet adjustments */
	}

	@media (max-width: 768px) {
		.sidebar {
			width: 200px;
		}

		.main-content {
			margin-left: 200px;
			padding: 1.5rem;
		}
	}

	@media (max-width: 640px) {
		.dashboard-container {
			flex-direction: column;
			height: auto; /* Allow container to expand on mobile */
			overflow: auto; /* Allow scrolling on mobile */
		}

		.sidebar {
			width: 100%;
			height: auto;
			position: sticky; /* Sticky instead of fixed on mobile */
			top: 0; /* Stick to the top */
			border-right: none;
			border-bottom: 1px solid #eaeaea;
			overflow: visible; /* Allow overflow for nav */
			z-index: 100; /* Higher z-index to stay on top */
		}

		.sidebar-nav {
			flex-direction: row;
			overflow-x: auto;
			padding: 0.5rem;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none; /* Hide scrollbar in Firefox */
		}

		.sidebar-nav::-webkit-scrollbar {
			display: none; /* Hide scrollbar in Chrome/Safari */
		}

		.nav-item {
			padding: 0.5rem 0.75rem;
			flex-direction: column;
			gap: 0.25rem;
			font-size: 0.75rem;
			min-width: 70px;
		}

		.main-content {
			margin-left: 0;
			padding: 1rem;
			overflow-y: visible; /* Allow scrolling on mobile */
			min-height: calc(100vh - 90px); /* Adjust for header height */
		}
	}

	@media (max-width: 480px) {
		.sidebar-nav {
			justify-content: flex-start;
		}

		.nav-item {
			min-width: 60px;
			padding: 0.5rem;
		}

		.nav-item span {
			font-size: 0.7rem;
		}
	}

	/* Fix for landscape mode */
	@media (max-height: 500px) and (orientation: landscape) {
		.sidebar {
			overflow-y: auto;
		}
	}

	/* Sidebar toggle buttons */
	.sidebar-toggle {
		background-color: transparent;
		border: none;
		border-radius: 4px;
		padding: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s;
		color: #4b5563;
	}

	.sidebar-toggle:hover {
		background-color: #f3f4f6;
		color: var(--active-section-color, #3b82f6);
	}

	/* Floating toggle that appears when sidebar is hidden */
	.floating-sidebar-toggle {
		position: fixed;
		top: 20px;
		left: 10px;
		z-index: 40;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: white;
		border: 1px solid #eaeaea;
		color: #4b5563;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
		transition: all 0.2s ease;
	}

	.floating-sidebar-toggle:hover {
		background-color: #f3f4f6;
		color: var(--active-section-color, #3b82f6);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
		transform: translateY(-1px);
	}
</style>
