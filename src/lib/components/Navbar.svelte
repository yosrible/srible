<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let isScrolled = false;
	let isMenuOpen = false;
	let windowWidth = 0;

	function handleScroll() {
		requestAnimationFrame(() => {
			isScrolled = window.scrollY > 50;
		});
	}

	function toggleMenu(event?: MouseEvent) {
		// Prevent any parent click events from firing
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		
		// Toggle menu state with a small delay to ensure UI updates properly
		window.setTimeout(() => {
			isMenuOpen = !isMenuOpen;
			
			// Lock/unlock body scroll
			document.body.style.overflow = isMenuOpen ? 'hidden' : '';
			
			// Force update the menu active state in the DOM
			const navLinks = document.querySelector('.nav-links');
			if (navLinks) {
				if (isMenuOpen) {
					navLinks.classList.add('active');
				} else {
					navLinks.classList.remove('active');
				}
			}
			
			// Log to verify it's working
			console.log('Menu state:', isMenuOpen);
		}, 10);
	}

	function closeMenu() {
		if (isMenuOpen) {
			isMenuOpen = false;
			document.body.style.overflow = '';
			
			// Force update the DOM
			const navLinks = document.querySelector('.nav-links');
			if (navLinks) {
				navLinks.classList.remove('active');
			}
		}
	}

	function goBack() {
		window.history.back();
	}

	function navigateToSection(section: string) {
		if (section === 'faq') {
			closeMenu();
			// If we're already on the help page, scroll to FAQ section
			if ($page.url.pathname === '/help') {
				const faqSection = document.getElementById('faq-section');
				if (faqSection) {
					faqSection.scrollIntoView({ behavior: 'smooth' });
				}
			} else {
				// Otherwise, navigate to help page with hash
				goto('/help#faq-section');
			}
		} else if ($page.url.pathname !== '/') {
			goto(`/#${section}`);
		} else {
			const element = document.getElementById(section);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
				closeMenu();
			}
		}
	}

	function handleResize() {
		windowWidth = window.innerWidth;
		if (windowWidth > 768 && isMenuOpen) {
			closeMenu();
		}
	}

	onMount(() => {
		windowWidth = window.innerWidth;
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize, { passive: true });
		
		// Close menu when clicking outside
		const handleClickOutside = (event: MouseEvent) => {
			const navElement = document.querySelector('nav');
			const menuToggle = document.querySelector('.menu-toggle');
			const target = event.target as Element;
			
			// Only process if menu is open and we're not clicking within the menu content or toggle button
			if (isMenuOpen && 
				navElement && 
				menuToggle && 
				!target.closest('.nav-links') && 
				!menuToggle.contains(target)) {
				closeMenu();
			}
		};
		
		// Add a touch handler for mobile devices to ensure menu works properly
		const handleTouch = (event: TouchEvent) => {
			const menuToggle = document.querySelector('.menu-toggle');
			if (menuToggle && event.target instanceof Element && menuToggle.contains(event.target)) {
				event.preventDefault();
				toggleMenu();
			}
		};
		
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('touchend', handleTouch, { passive: false });
		
		// Apply initial state to menu
		const navLinks = document.querySelector('.nav-links');
		if (navLinks) {
			navLinks.classList.toggle('active', isMenuOpen);
		}
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('touchend', handleTouch);
			document.body.style.overflow = '';
		};
	});

	$: isCreatePage = false;
	$: isLoginOrSignup = $page.url.pathname === '/login' || $page.url.pathname === '/signup';
	$: isMobile = windowWidth <= 768;
</script>

<nav class:scrolled={isScrolled}>
	<div class="container">
		<div class="nav-content">
			<div class="left-section">
				<a href="/" class="logo" on:click={closeMenu}>
					<span class="logo-text">Srible</span>
				</a>
			</div>

			{#if !isCreatePage}
				<div class="center-section">
					<div class="nav-links" class:active={isMenuOpen} role="navigation" aria-label="Main navigation" id="mobile-nav-links">
						<button class="nav-link" on:click={() => navigateToSection('why')}>Why Srible?</button>
						<button class="nav-link" on:click={() => navigateToSection('pricing')}>Pricing</button>
						<a href="/docs" class="nav-link" on:click={closeMenu}>Docs</a>
						<button class="nav-link" on:click={() => navigateToSection('faq')}>FAQ</button>
						
						{#if isMobile}
							<div class="mobile-buttons">
								<a href="/login" class="nav-link mobile-login" on:click={closeMenu}>Log in</a>
								<a href="/signup" class="nav-link mobile-signup" on:click={closeMenu}>Create a Blog</a>
							</div>
						{/if}
					</div>
				</div>

				<div class="right-section">
					{#if !isMobile}
						<div class="nav-buttons">
							{#if $page.url.pathname !== '/' && windowWidth > 1024}
								<button class="btn btn-back" on:click={goBack}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M19 12H5M12 19l-7-7 7-7" />
									</svg>
									<span>Back</span>
								</button>
							{/if}
							<a href="/login" class="btn btn-outline">Log in</a>
							<a href="/signup" class="btn {isLoginOrSignup ? 'btn-transparent' : 'btn-primary'}">
								<span>Create a Blog</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="arrow-icon"
								>
									<path d="M5 12h14M12 5l7 7-7 7" />
								</svg>
							</a>
						</div>
					{/if}

					{#if isMobile}
						<button 
							class="menu-toggle {isMenuOpen ? 'active' : ''}" 
							on:click|preventDefault|stopPropagation|capture={toggleMenu} 
							aria-label="Toggle mobile menu"
							aria-expanded={isMenuOpen}
							aria-controls="mobile-nav-links"
							style="touch-action: manipulation;"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon">
								{#if isMenuOpen}
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								{:else}
									<line x1="3" y1="12" x2="21" y2="12"></line>
									<line x1="3" y1="6" x2="21" y2="6"></line>
									<line x1="3" y1="18" x2="21" y2="18"></line>
								{/if}
							</svg>
						</button>
					{/if}
				</div>
			{:else}
				<div class="nav-buttons nav-buttons-minimal">
					<button class="btn btn-back" on:click={goBack}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M19 12H5M12 19l-7-7 7-7" />
						</svg>
						<span>Back</span>
					</button>
					<a href="/login" class="btn btn-outline">Log in</a>
				</div>
			{/if}
		</div>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		transition:
			background-color 0.3s ease,
			padding 0.3s ease;
		background-color: var(--primary-white, #f8f8f5);
		padding: 1rem 0;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
	}

	nav.scrolled {
		background-color: var(--primary-white, #f8f8f5);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
		padding: 0.5rem 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.nav-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left-section {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.center-section {
		flex: 2;
		display: flex;
		justify-content: center;
	}

	.right-section {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.logo {
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-black);
		position: relative;
		z-index: 1001;
	}

	.logo-text {
		color: var(--primary-black);
		font-weight: 700;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease-in-out;
	}

	.nav-link {
		text-decoration: none;
		color: var(--primary-black);
		font-weight: 500;
		position: relative;
		padding: 0.5rem 0;
		background: none;
		border: none;
		cursor: pointer;
		font-size: inherit;
		font-family: inherit;
		white-space: nowrap;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background-color: var(--primary-black);
		transition: width 0.3s ease;
	}
	.nav-link:hover::after {
		width: 100%;
	}

	.mobile-buttons {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
		margin-top: 2rem;
		max-width: 300px;
		align-items: center;
	}

	.nav-buttons {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: flex-end;
	}

	.nav-buttons-minimal {
		margin-left: 0;
	}

	.btn {
		text-decoration: none;
		padding: 0.6rem 1.2rem;
		border-radius: 6px;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		white-space: nowrap;
		transition: transform 0.2s ease;
	}
	
	.btn:active {
		transform: scale(0.98);
	}

	.btn-back {
		background: none;
		border: none;
		color: var(--gray-dark);
		cursor: pointer;
		padding: 0.6rem 1rem;
	}

	.btn-back:hover {
		color: var(--primary-black);
	}

	.btn-outline {
		background-color: transparent;
		border: none;
		color: var(--primary-black);
	}

	.btn-outline:hover {
		color: var(--primary-black);
	}

	.btn-primary {
		background-color: var(--primary-black);
		color: var(--primary-white);
		border: none;
	}

	.btn-primary:hover {
		background-color: var(--primary-black);
	}

	.btn-transparent {
		background-color: transparent;
		color: var(--primary-black);
		border: none;
	}

	.arrow-icon {
		width: 16px;
		height: 16px;
	}

	.menu-toggle {
		background: transparent;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		cursor: pointer;
		display: none;
		padding: 0.5rem;
		transition: all 0.2s ease;
		line-height: 0;
		width: 48px; /* Even larger touch target */
		height: 48px; /* Even larger touch target */
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000; /* Ensure the button is always clickable */
		position: relative; /* Establish stacking context */
		margin-left: 5px;
		background-color: rgba(248, 248, 245, 0.95);
	}

	.menu-icon {
		color: var(--primary-black);
		stroke-width: 2;
		transition: transform 0.3s ease;
	}
	
	/* Add a subtle box shadow to the menu toggle for better visibility */
	.menu-toggle:hover, .menu-toggle.active {
		background-color: rgba(0, 0, 0, 0.06);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	/* Large desktop styles */
	@media (min-width: 1400px) {
		.container {
			max-width: 1320px;
		}
		
		.nav-links {
			gap: 2.5rem;
		}
		
		.btn {
			padding: 0.7rem 1.4rem;
			font-size: 1rem;
		}
	}

	/* Tablet and smaller desktop styles */
	@media (max-width: 1200px) {
		.container {
			padding: 0 1.25rem;
		}
		
		.nav-links {
			gap: 1.75rem;
		}
	}

	@media (max-width: 1024px) {
		.nav-links {
			gap: 1.5rem;
		}
		
		.center-section {
			flex: 3;
		}
		
		.right-section {
			flex: 1;
		}
	}

	/* Mobile styles */
	@media (max-width: 768px) {
		.container {
			padding: 0 1rem;
		}
		
		.nav-content {
			position: relative;
			justify-content: space-between;
		}
		
		.center-section {
			position: static;
			flex: auto;
		}
		
		.left-section, .right-section {
			flex: auto;
			z-index: 1002;
		}
		
		.menu-toggle {
			display: flex;
			z-index: 2001;
			touch-action: manipulation;
		}
		
		.nav-buttons {
			display: none;
		}
		
		.nav-links {
			display: flex;
			flex-direction: column;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background-color: var(--primary-white, #f8f8f5);
			z-index: 1000;
			padding: 5rem 2rem 2rem;
			transform: translateY(-100%);
			transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
			opacity: 0;
			visibility: hidden;
			align-items: flex-start;
			gap: 1.5rem;
			overflow-y: auto;
			pointer-events: none;
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		}
		
		.nav-links.active {
			transform: translateY(0);
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
			backdrop-filter: blur(5px);
		}
		
		.nav-link {
			font-size: 1.25rem;
			padding: 0.75rem 1rem;
			transition: all 0.2s ease;
			border-radius: 6px;
			text-align: left;
			width: 100%;
		}
		
		.nav-link:hover {
			background-color: rgba(0, 0, 0, 0.03);
		}
		
		.btn {
			padding: 0.75rem 1.5rem;
			font-size: 1rem;
			justify-content: center;
			width: 100%;
			min-height: 44px; /* Better touch target */
		}
		
		.mobile-login, .mobile-signup {
			text-decoration: none;
			text-align: left;
			display: block;
			width: 100%;
			padding: 0.75rem 1rem;
			min-height: 44px;
			align-items: center;
		}
		
		.mobile-login {
			color: var(--primary-black);
			border-radius: 6px;
			background-color: transparent;
			border: 1px solid var(--primary-black);
		}
		
		.mobile-signup {
			color: var(--primary-white);
			font-weight: bold;
			background-color: var(--primary-black);
			border-radius: 6px;
		}
		

	}

	/* Small mobile styles */
	@media (max-width: 480px) {
		.logo {
			font-size: 1.25rem;
		}
		
		.container {
			padding: 0 0.75rem;
		}
		
		.nav-link {
			font-size: 1.1rem;
		}
		
		.nav-links {
			padding: 4rem 1rem;
			gap: 1.5rem;
		}
		
		.mobile-buttons {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			width: 100%;
			margin-top: 1.5rem;
			align-items: stretch;
			text-align: left;
		}
	}

	/* Extra small mobile styles */
	@media (max-width: 360px) {
		.logo {
			font-size: 1.15rem;
		}
		
		/* Mobile menu icon styles are now handled by SVG */
		
		.nav-link {
			font-size: 1rem;
		}
		
		.btn {
			padding: 0.6rem 1rem;
			font-size: 0.9rem;
		}
	}
</style>
