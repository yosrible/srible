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
	<header class="content-header">
		<h1>Themes</h1>
		<div class="active-theme">
			<span>Active:</span>
			<strong>{activeTheme.name}</strong>
		</div>
	</header>
	
	<div class="dashboard-content">
		<section class="themes-section">
			<h2>Choose a Theme</h2>
			<div class="theme-grid">
				{#each themes as theme}
					<div class="theme-card {theme.active ? 'active' : ''}">
						<div class="theme-preview">
							<div class="placeholder-preview">
								<div class="placeholder-header"></div>
								<div class="placeholder-content">
									<div class="placeholder-title"></div>
									<div class="placeholder-text"></div>
									<div class="placeholder-text"></div>
									<div class="placeholder-text short"></div>
								</div>
							</div>
						</div>
						<div class="theme-info">
							<h3>{theme.name}</h3>
							<p>{theme.description}</p>
							<div class="theme-actions">
								<button class="preview-btn" on:click|stopPropagation={() => previewTheme(theme.id)}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
										<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
										<circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" stroke-width="2"/>
									</svg>
									Preview
								</button>
								<button class="apply-btn" on:click|stopPropagation={() => applyTheme(theme.id)}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
										<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20 6L9 17l-5-5"/>
									</svg>
									Apply
								</button>
							</div>
						</div>
						{#if theme.active}
							<div class="active-badge">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
									<path
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
									/>
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
	
	/* Desktop styles */
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
	
	.active-theme {
		padding: 0.5rem 1rem;
		background-color: #f8f8f5;
		border-radius: 6px;
		font-size: 0.875rem;
		color: var(--gray-dark, #555);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.active-theme strong {
		color: var(--primary-black, #1a1a1a);
	}

	/* Dashboard Content */
	.dashboard-content {
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		padding: 2rem;
		margin-bottom: 2rem;
	}
	
	.themes-section {
		margin-bottom: 2.5rem;
	}
	
	.themes-section:last-child {
		margin-bottom: 0;
	}
	
	.themes-section h2 {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
		font-weight: 600;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #eaeaea;
	}
	
	/* Theme Grid */
	.theme-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}
	
	.theme-card {
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		overflow: hidden;
		transition: all 0.2s ease;
		position: relative;
	}
	
	.theme-card:hover {
		border-color: var(--primary-black, #1a1a1a);
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
	}
	
	.theme-card.active {
		border-color: var(--primary-black, #1a1a1a);
		border-width: 3px;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
	}
	
	.theme-preview {
		height: 180px;
		background-color: #fafafa;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.placeholder-preview {
		width: 90%;
		height: 80%;
	}
	
	.placeholder-header {
		height: 20px;
		background-color: #e6e6e6;
		margin-bottom: 12px;
		border-radius: 4px;
	}
	
	.placeholder-content {
		padding: 10px;
	}
	
	.placeholder-title {
		height: 16px;
		background-color: #e6e6e6;
		margin-bottom: 12px;
		width: 80%;
		border-radius: 4px;
	}
	
	.placeholder-text {
		height: 8px;
		background-color: #e6e6e6;
		margin-bottom: 8px;
		border-radius: 4px;
	}
	
	.placeholder-text.short {
		width: 60%;
	}
	
	.theme-info {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		height: calc(100% - 180px); /* Subtract preview height */
	}
	
	.theme-info h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--primary-black, #1a1a1a);
	}
	
	.theme-info p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--gray-dark, #555);
		line-height: 1.5;
		flex-grow: 1; /* Push buttons to bottom */
	}
	
	.theme-actions {
		display: flex;
		gap: 0.75rem;
		width: 100%;
		margin-top: 1.25rem;
	}
	
	.theme-actions button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.65rem 0.5rem;
		font-size: 0.85rem;
		font-weight: 500;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
		flex: 1;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}
	
	.preview-btn {
		background-color: rgba(59, 130, 246, 0.05);
		border: 1px solid rgba(59, 130, 246, 0.3);
		color: #3b82f6;
	}
	
	.preview-btn:hover {
		background-color: rgba(59, 130, 246, 0.1);
		border-color: rgba(59, 130, 246, 0.5);
	}
	
	.active-badge {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: rgba(236, 72, 153, 0.85); /* Pink with transparency */
		color: white;
		border-radius: 12px;
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		backdrop-filter: blur(2px);
		box-shadow: 0 2px 4px rgba(236, 72, 153, 0.2);
	}
	

	
	.apply-btn {
		background-color: rgba(16, 185, 129, 0.05);
		color: #10b981;
		border: 1px solid rgba(16, 185, 129, 0.3);
		border-radius: 6px;
		padding: 0.65rem 0.75rem;
		font-size: 0.85rem;
		font-weight: 500;
		cursor: pointer;
	}
	
	.apply-btn:hover {
		background-color: rgba(16, 185, 129, 0.1);
		border-color: rgba(16, 185, 129, 0.5);
	}

	@media (max-width: 768px) {
		.content-header h1 {
			font-size: 1.25rem;
		}

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
