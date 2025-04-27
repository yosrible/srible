<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let isScrolled = false;
	let isMenuOpen = false;

	function handleScroll() {
		requestAnimationFrame(() => {
			isScrolled = window.scrollY > 50;
		});
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		document.body.style.overflow = isMenuOpen ? 'hidden' : '';
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
			}
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.body.style.overflow = '';
		};
	});

	$: isCreatePage = $page.url.pathname === '/create';
</script>

<nav class:scrolled={isScrolled}>
	<div class="container">
		<div class="nav-content">
			<a href="/" class="logo">
				<span class="logo-text">Srible</span>
			</a>

			{#if !isCreatePage}
				<div class="nav-links" class:active={isMenuOpen}>
					<button class="nav-link" on:click={() => navigateToSection('why')}>Why Srible?</button>
					<button class="nav-link" on:click={() => navigateToSection('pricing')}>Pricing</button>
					<a href="/docs" class="nav-link">Docs</a>
					<button class="nav-link" on:click={() => navigateToSection('faq')}>FAQ</button>
				</div>

				<div class="nav-buttons">
					{#if $page.url.pathname !== '/'}
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
					<a href="/create" class="btn btn-primary">
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
							<line x1="5" y1="12" x2="19" y2="12"></line>
							<polyline points="12 5 19 12 12 19"></polyline>
						</svg>
					</a>
				</div>

				<button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
					<span class="hamburger" class:active={isMenuOpen}></span>
				</button>
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
		will-change: background-color, padding;
	}

	nav.scrolled {
		background-color: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		padding: 0.75rem 0;
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
		position: relative;
	}

	.logo {
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-black);
		position: relative;
		will-change: transform;
	}

	.logo-text {
		color: var(--primary-black);
		font-weight: 700;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
		align-items: center;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		will-change: transform;
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
		will-change: transform;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--primary-black);
		transition: width 0.3s ease;
		will-change: width;
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.nav-buttons {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin-left: auto;
	}

	.nav-buttons-minimal {
		margin-left: 0;
	}

	.btn {
		text-decoration: none;
		padding: 0.6rem 1.2rem;
		border-radius: 6px;
		font-weight: 500;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		will-change: transform, box-shadow;
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
		background-color: var(--primary-black);
		color: var(--primary-white);
	}

	.btn-primary {
		background: linear-gradient(90deg, #ff6ec4, #7873f5);
		color: var(--primary-white);
		border: none;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 12px rgba(120, 115, 245, 0.3);
	}

	.arrow-icon {
		width: 16px;
		height: 16px;
		transition: transform 0.3s ease;
		will-change: transform;
	}

	.btn-primary:hover .arrow-icon {
		transform: translateX(3px);
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		margin-left: auto;
	}

	.hamburger {
		display: block;
		width: 24px;
		height: 2px;
		background-color: var(--primary-black);
		position: relative;
		transition: background-color 0.3s ease;
		will-change: transform;
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		width: 24px;
		height: 2px;
		background-color: var(--primary-black);
		transition: transform 0.3s ease;
		will-change: transform;
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

	@media (max-width: 1024px) {
		.nav-links {
			gap: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding-left: 1rem;
			padding-right: 1rem;
		}

		.nav-links {
			position: fixed;
			top: 0;
			right: -100%;
			width: 80%;
			height: 100vh;
			background-color: var(--primary-white);
			flex-direction: column;
			padding: 5rem 2rem;
			transition: right 0.3s ease;
			will-change: right;
		}

		.nav-links.active {
			right: 0;
		}

		.nav-buttons {
			display: none;
		}

		.menu-toggle {
			display: block;
		}

		.nav-buttons-minimal {
			display: flex;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding-left: 0.75rem;
			padding-right: 0.75rem;
		}

		.nav-links {
			width: 100%;
		}

		.btn {
			padding: 0.5rem 1rem;
		}
	}
</style>
