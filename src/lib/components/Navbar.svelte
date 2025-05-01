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

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		document.body.style.overflow = isMenuOpen ? 'hidden' : '';
	}

	function closeMenu() {
		if (isMenuOpen) {
			isMenuOpen = false;
			document.body.style.overflow = '';
		}
	}

	function goBack() {
		window.history.back();
	}

	function navigateToSection(section: string) {
		if ($page.url.pathname !== '/') {
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
			
			if (isMenuOpen && 
				navElement && 
				menuToggle && 
				!target.closest('.nav-links') && 
				!menuToggle.contains(target)) {
				closeMenu();
			}
		};
		
		document.addEventListener('click', handleClickOutside);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('click', handleClickOutside);
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
								<a href="/login" class="btn btn-outline" on:click={closeMenu}>Log in</a>
								<a href="/signup" class="btn btn-primary-mobile" on:click={closeMenu}>
									<span>Create a Blog</span>
								</a>
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
							class="menu-toggle" 
							on:click={toggleMenu} 
							aria-label="Toggle menu"
							aria-expanded={isMenuOpen}
							aria-controls="mobile-nav-links"
						>
							<span class="hamburger" class:active={isMenuOpen}></span>
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
		background-color: transparent;
		padding: 1rem 0;
	}

	nav.scrolled {
		background-color: var(--primary-white);
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
		display: none;
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

	.btn-primary, .btn-primary-mobile {
		background-color: var(--primary-black);
		color: var(--primary-white);
		border: none;
	}

	.btn-primary:hover, .btn-primary-mobile:hover {
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
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		z-index: 1002;
		position: relative;
	}

	.hamburger {
		display: block;
		width: 24px;
		height: 2px;
		background-color: var(--primary-black);
		position: relative;
		transition: background-color 0.3s ease;
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		width: 24px;
		height: 2px;
		background-color: var(--primary-black);
		transition: transform 0.3s ease;
	}

	.hamburger::before {
		top: -8px;
	}

	.hamburger::after {
		bottom: -8px;
	}

	.hamburger.active {
		background-color: transparent;
	}

	.hamburger.active::before {
		transform: rotate(45deg);
		top: 0;
	}

	.hamburger.active::after {
		transform: rotate(-45deg);
		bottom: 0;
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
			z-index: 1002; /* Above the menu overlay */
		}
		
		.menu-toggle {
			display: block;
			margin-left: 1rem;
		}
		
		.nav-buttons {
			display: none; /* Hide desktop nav buttons on mobile */
		}
		
		.mobile-buttons {
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: 1rem;
			margin-top: 2rem;
			max-width: 300px;
		}
		
		.nav-links {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			transform: translateY(-100%);
			background-color: var(--primary-white);
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 2rem;
			transition: transform 0.3s ease;
			z-index: 1001;
			padding: 4rem 2rem;
			box-sizing: border-box;
		}
		
		.nav-links.active {
			transform: translateY(0);
			overflow-y: auto;
		}
		
		.nav-link {
			font-size: 1.25rem;
			padding: 0.75rem 0;
		}
		
		.btn {
			padding: 0.75rem 1.5rem;
			font-size: 1rem;
			justify-content: center;
			width: 100%;
			min-height: 44px; /* Better touch target */
		}
		
		.btn-primary-mobile {
			width: 100%;
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
			gap: 0.75rem;
		}
	}

	/* Extra small mobile styles */
	@media (max-width: 360px) {
		.logo {
			font-size: 1.15rem;
		}
		
		.hamburger, .hamburger::before, .hamburger::after {
			width: 22px;
		}
		
		.nav-link {
			font-size: 1rem;
		}
		
		.btn {
			padding: 0.6rem 1rem;
			font-size: 0.9rem;
		}
	}
</style>
