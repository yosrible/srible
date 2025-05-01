<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let form: ActionData;

	let isScrolled = false;
	let email = '';
	let password = '';
	let rememberMe = false;

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 0;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	$: isFormValid = email.trim() !== '' && password.trim() !== '';

	function handleSocialLogin(provider: 'github' | 'google' | 'x') {
		// TODO: Handle social login
		console.log('Social login with:', provider);
	}

	function handleSubmit() {
		if (!isFormValid) return;
		// TODO: Handle form submission
		console.log('Login form submitted:', { email, password, rememberMe });
	}
</script>

<nav class:scrolled={isScrolled}>
	<div class="nav-container">
		<div class="nav-content">
			<a href="/" class="logo">
				<span class="logo-text">Srible</span>
			</a>
			<div class="nav-right">
				<a href="/signup" class="btn btn-primary">
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
		</div>
	</div>
</nav>

<div class="page-container">
	<div class="login-container">
		<div class="login-content">
			<div class="launching-soon">
				<h1>We're launching soon!</h1>
				<p>
					We're working hard to bring you an amazing experience. Join our waitlist to be notified
					when we launch.
				</p>
				<button class="join-button" on:click={() => goto('/signup')}>
					<span>Join Waitlist</span>
					<svg
						class="arrow-icon"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M5 12h14M12 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
	<footer class="minimal-footer">
		<nav class="footer-links">
			<a href="/privacy">Privacy</a>
			<span class="separator">·</span>
			<a href="/terms">Terms</a>
			<span class="separator">·</span>
			<a href="/docs">Docs</a>
			<span class="separator">·</span>
			<a href="/about">About</a>
		</nav>
	</footer>
</div>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		transition: all 0.3s ease;
		background-color: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		padding: 1rem 0;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.nav-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.logo {
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-black);
	}

	.logo-text {
		color: var(--primary-black);
		font-weight: 700;
		font-family: 'Space Grotesk', sans-serif;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.2rem;
		border-radius: 6px;
		font-weight: 500;
		transition: all 0.2s ease;
		text-decoration: none;
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
	}

	.btn-primary:hover .arrow-icon {
		transform: translateX(3px);
	}

	.page-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 1;
		padding-top: 4rem;
	}

	.login-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem 1rem;
		background-color: var(--primary-white);
	}

	.login-content {
		width: 100%;
		max-width: 520px;
		background-color: white;
		padding: 3rem;
		border-radius: 16px;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06),
			0 20px 25px -5px rgba(0, 0, 0, 0.02);
		margin-bottom: 2rem;
	}

	.launching-soon {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 500px;
		margin: 0 auto;
	}

	h1 {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		color: var(--primary-black);
		text-align: center;
	}

	p {
		color: var(--gray-dark);
		margin-bottom: 2rem;
		font-size: 1.125rem;
		line-height: 1.6;
		text-align: center;
		max-width: 400px;
	}

	.join-button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		font-weight: 500;
		color: white;
		background: linear-gradient(90deg, #ff6ec4, #7873f5);
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		position: relative;
		overflow: hidden;
		min-width: 200px;
	}

	.join-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.1)
		);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	.join-button:hover::before {
		transform: translateX(100%);
	}

	.join-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(120, 115, 245, 0.3);
	}

	.join-button .arrow-icon {
		width: 1.2em;
		height: 1.2em;
		transition: transform 0.3s ease;
	}

	.join-button:hover .arrow-icon {
		transform: translateX(3px);
	}

	.minimal-footer {
		padding: 1rem 0;
		text-align: center;
	}

	.footer-links {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	.footer-links a {
		color: var(--gray-dark);
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.2s ease;
	}

	.footer-links a:hover {
		color: var(--primary-black);
	}

	.separator {
		color: var(--gray-medium);
	}

	@media (max-width: 1200px) {
		.login-container {
			padding: 0 2rem;
		}
	}

	@media (max-width: 768px) {
		.login-container {
			padding: 0 1.5rem;
		}

		.login-content {
			padding: 2rem;
		}

		h1 {
			font-size: 2.5rem;
		}

		.launching-soon {
			padding: 2rem;
		}
	}

	@media (max-width: 480px) {
		.login-container {
			padding: 0 1rem;
		}

		.login-content {
			padding: 1.5rem;
		}

		h1 {
			font-size: 2rem;
		}

		.launching-soon {
			padding: 1.5rem;
		}

		.btn {
			width: 100%;
			justify-content: center;
		}
	}

	@media (max-width: 320px) {
		h1 {
			font-size: 1.75rem;
		}

		.login-content {
			padding: 1rem;
		}

		.launching-soon {
			padding: 1rem;
		}
	}
</style>
