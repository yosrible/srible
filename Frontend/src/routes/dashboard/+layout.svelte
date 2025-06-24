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
	// Handle window resize
	const handleResize = () => {
		windowWidth = window.innerWidth;
		updateSidebarVisibility();
	};

	onMount(() => {
		// Start with sidebar hidden by default
		sidebarVisible = false;
		sidebarStore.set(false);

		if (browser) {
			try {
				// Load saved preference
				const savedVisibility = localStorage.getItem('srible_sidebar_visible');
				if (savedVisibility === 'true') {
					sidebarVisible = true;
					sidebarStore.set(true);
				}
			} catch (e) {
				console.error('Error loading sidebar preference:', e);
			}

			// Add window resize listener
			window.addEventListener('resize', handleResize);

			// Initial update
			handleResize();

			// Initialize sidebar visibility after a small delay to prevent flash
			setTimeout(() => {
				updateSidebarVisibility();
			}, 10);
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
		/* Hide sidebar and nav by default to prevent flash */
		.sidebar,
		.sidebar-nav {
			display: none !important;
		}

		/* Show when JS sets sidebar-visible */
		.sidebar-visible .sidebar,
		.sidebar-visible .sidebar-nav {
			display: flex !important;
		}

		/* Sidebar visibility handled via JS and body classes */
		.dashboard-container {
			display: flex !important;
		}
	</style>
</svelte:head>

<div class="dashboard-container" style="--active-section-color: {activeSectionColor}">
	<aside class="sidebar">
		<div class="sidebar-header">
			<h2>Srible</h2>
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
		height: 100%;
		width: 280px;
		background-color: #ffffff;
		border-right: 1px solid rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 1100;
		overflow-y: auto;
		transform: translateX(0);
	}

	.dark .sidebar {
		background-color: #111827;
		border-right-color: rgba(255, 255, 255, 0.05);
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
		width: calc(100% - 280px);
		margin-left: 280px;
		padding: 20px;
		min-height: 100vh;
		background-color: var(--primary-white, #f8f8f5);
		position: relative;
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
		width: 280px;
	}

	:global(body.sidebar-hidden) .sidebar,
	:global(body.sidebar-hidden) .sidebar-nav {
		transform: translateX(-100%);
		width: 0;
	}

	.sidebar-hidden .sidebar-toggle {
		left: 0;
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
		position: fixed;
		top: 50%;
		left: 280px;
		width: 24px;
	height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-left: none;
		border-radius: 0 0.5rem 0.5rem 0;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		transform: translateY(-50%);
		z-index: 1100;
		color: #374151;
	}

	.dark .sidebar-toggle {
		background: rgba(17, 24, 39, 0.9);
		border-color: rgba(255, 255, 255, 0.1);
		color: #f3f4f6;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.sidebar-toggle:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.sidebar-toggle:active {
		transform: translateY(0);
	}
</style>
