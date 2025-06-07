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

<div class="page-container">
	<div class="login-container">
		<div class="waitlist-main-content">
			<div class="launching-soon">
				<h1>We're launching soon!</h1>
				<p>
					We're working hard to bring you an amazing experience. Join our waitlist to be notified
					when we launch.
				</p>
				<a href="/signup" class="waitlist-button">
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
				</a>
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

	.waitlist-main-content {
		width: 100%;
		max-width: 500px;
		background-color: #ffffff;
		padding: 2.5rem;
		border-radius: 12px;
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.06),
			0 1px 3px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
		display: block;
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

	.waitlist-button {
		padding: 1rem 2rem;
		font-size: 1.2rem;
		font-weight: 600;
		color: white;
		background-color: #7873f5;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
		max-width: 280px;
		text-decoration: none;
		margin: 0 auto;
		margin-top: 2rem;
		box-shadow: 0 6px 16px rgba(120, 115, 245, 0.3);
		z-index: 10;
		position: relative;
	}

	.waitlist-button:hover {
		background-color: #6560e4;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(120, 115, 245, 0.4);
	}

	.waitlist-button .arrow-icon {
		width: 1.3em;
		height: 1.3em;
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

		.waitlist-main-content {
			padding: 1.75rem;
			max-width: 420px;
		}

		h1 {
			font-size: 1.75rem;
		}

		.launching-soon {
			padding: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.login-container {
			padding: 0 1rem;
		}

		.waitlist-main-content {
			padding: 1.25rem;
			max-width: 100%;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		}

		h1 {
			font-size: 1.5rem;
			margin-bottom: 1rem;
		}

		p {
			font-size: 1rem;
			margin-bottom: 1.5rem;
		}

		.launching-soon {
			padding: 1rem;
		}
	}

	@media (max-width: 320px) {
		h1 {
			font-size: 1.25rem;
		}

		.waitlist-main-content {
			padding: 1rem;
		}

		.launching-soon {
			padding: 1rem;
		}
	}
</style>
