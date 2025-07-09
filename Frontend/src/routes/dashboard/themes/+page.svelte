<script>
	import { onMount } from 'svelte';
	
	let themes = [
		{
			id: 'minimal',
			name: 'Minimal',
			description: 'Our default clean, minimalist theme with focus on content readability.',
			active: true,
			preview: '/theme-previews/minimal.png'
		},
		{
			id: 'serif',
			name: 'Serif',
			description: 'Traditional typography with elegant serif fonts for a classic blog look.',
			active: false,
			preview: '/theme-previews/serif.png'
		},
		{
			id: 'contrast',
			name: 'High Contrast',
			description: 'Dark mode theme with high contrast for improved readability.',
			active: false,
			preview: '/theme-previews/contrast.png'
		}
	];
	
	let activeTheme = themes.find(theme => theme.active);
	let isMobile = false;
	
	// Check if the user is on a mobile device
	onMount(() => {
		isMobile = window.innerWidth < 768;
		
		// If on mobile, hide all dashboard elements except for our message
		if (isMobile) {
			hideDashboardElements();
		}
		
		window.addEventListener('resize', () => {
			const wasMobile = isMobile;
			isMobile = window.innerWidth < 768;
			
			// Only take action if mobile state has changed
			if (wasMobile !== isMobile) {
				if (isMobile) {
					hideDashboardElements();
				} else {
					restoreDashboardElements();
				}
			}
		});
	});
	
	// Function to hide dashboard elements on mobile
	function hideDashboardElements() {
		// Hide sidebar
		const sidebar = document.querySelector('.sidebar');
		if (sidebar) sidebar.style.display = 'none';
		
		// Hide any create post button if it exists
		const createButtons = document.querySelectorAll('.create-post-btn, button:contains("Create"), a:contains("Create")');
		createButtons.forEach(btn => {
			if (btn) btn.style.display = 'none';
		});
	}
	
	// Function to restore dashboard elements when returning to desktop
	function restoreDashboardElements() {
		// Restore sidebar
		const sidebar = document.querySelector('.sidebar');
		if (sidebar) sidebar.style.display = 'flex';
		
		// Restore any create post buttons
		const createButtons = document.querySelectorAll('.create-post-btn, button:contains("Create"), a:contains("Create")');
		createButtons.forEach(btn => {
			if (btn) btn.style.display = '';
		});
	}
	
	function setActiveTheme(themeId) {
		themes = themes.map(theme => ({
			...theme,
			active: theme.id === themeId
		}));
		activeTheme = themes.find(theme => theme.active);
	}
	
	function previewTheme(themeId) {
		// Function to preview the theme without activating it
		console.log('Previewing theme:', themeId);
		// This would typically load a temporary preview
	}
	
	function applyTheme(themeId) {
		// Apply the theme and set it as active
		setActiveTheme(themeId);
		console.log('Applied theme:', themeId);
	}
	
	function goBack() {
		history.back();
	}
</script>

{#if isMobile}
	<div class="mobile-message">
		<button class="back-button" on:click={goBack}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
				<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
			Back
		</button>
		<div class="message-content">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
				<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
				<line x1="8" y1="21" x2="16" y2="21"/>
				<line x1="12" y1="17" x2="12" y2="21"/>
			</svg>
			<h2>Desktop Only Feature</h2>
			<p>Theme customization is currently available only on desktop devices. Please switch to a desktop computer to access this feature.</p>
		</div>
	</div>
{:else}
	<header class="content-header flex justify-between items-center mb-8">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">Themes</h1>
		<div class="active-theme bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
			<span>Active:</span>
			<strong class="text-gray-900 dark:text-gray-100">{activeTheme.name}</strong>
		</div>
	</header>
	
	<div class="dashboard-content bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-8 mb-8">
		<section class="themes-section">
			<h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100 pb-2 border-b border-gray-200 dark:border-gray-600">Choose a Theme</h2>
			<div class="theme-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each themes as theme}
					<div class="theme-card border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-md overflow-hidden transition-all duration-200 relative hover:border-gray-900 dark:hover:border-gray-300 {theme.active ? 'border-gray-900 dark:border-gray-300 border-3 shadow-lg' : ''}">
						<div class="theme-preview h-44 bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
							<div class="placeholder-preview w-11/12 h-4/5">
								<div class="placeholder-header h-5 bg-gray-200 dark:bg-gray-600 mb-3 rounded"></div>
								<div class="placeholder-content p-2.5">
									<div class="placeholder-title h-4 bg-gray-200 dark:bg-gray-600 mb-3 w-4/5 rounded"></div>
									<div class="placeholder-text h-2 bg-gray-200 dark:bg-gray-600 mb-2 rounded"></div>
									<div class="placeholder-text h-2 bg-gray-200 dark:bg-gray-600 mb-2 rounded"></div>
									<div class="placeholder-text h-2 bg-gray-200 dark:bg-gray-600 mb-2 rounded w-3/5"></div>
								</div>
							</div>
						</div>
						<div class="theme-info p-5 flex flex-col h-32">
							<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{theme.name}</h3>
							<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">{theme.description}</p>
							<div class="theme-actions flex gap-3 mt-5">
								<button class="preview-btn bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md px-3 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 flex items-center gap-2 flex-1 justify-center" on:click|stopPropagation={() => previewTheme(theme.id)}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
										<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
										<circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" stroke-width="2"/>
									</svg>
									Preview
								</button>
								<button class="apply-btn bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-md px-3 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 flex items-center gap-2 flex-1 justify-center" on:click|stopPropagation={() => applyTheme(theme.id)}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
										<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20 6L9 17l-5-5"/>
									</svg>
									Apply
								</button>
							</div>
						</div>
						{#if theme.active}
							<div class="active-badge absolute top-2.5 right-2.5 bg-pink-500 text-white rounded-full px-3 py-1 text-xs flex items-center gap-1 shadow-lg">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
									<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
									<polyline points="22 4 12 14.01 9 11.01" />
								</svg>
								<span>Active</span>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	</div>
{/if}

<style>
	/* Mobile message styles */
	.mobile-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem 1.5rem;
		text-align: center;
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		background-color: #f8f8f5;
	}
	
	.back-button {
		align-self: flex-start;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: none;
		color: var(--primary-black, #1a1a1a);
		font-size: 1rem;
		font-weight: 500;
		padding: 0.5rem 0;
		margin-bottom: 2rem;
		cursor: pointer;
	}
	
	.message-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 320px;
		margin: auto;
	}
	
	.message-content svg {
		margin-bottom: 1.5rem;
		color: var(--gray-dark, #555);
	}
	
	.message-content h2 {
		margin: 0 0 1rem 0;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
	}
	
	.message-content p {
		color: var(--gray-dark, #555);
		line-height: 1.5;
		margin: 0;
	}

	/* Responsive styles only - no hardcoded colors */
	@media (max-width: 768px) {
		.dashboard-content {
			padding: 1.5rem;
		}
		
		.theme-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.content-header {
			flex-direction: column;
		}
		
		.dashboard-content {
			padding: 1rem;
		}
		
		.theme-actions {
			flex-direction: column;
			width: 100%;
		}
		
		.theme-actions button {
			width: 100%;
			justify-content: center;
		}
	}
</style>
