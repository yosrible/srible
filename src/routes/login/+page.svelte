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
		max-width: 480px;
		background-color: #ffffff;
		padding: 2.5rem;
		border-radius: 12px;
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.06),
			0 1px 3px rgba(0, 0, 0, 0.1);
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
		background-color: var(--primary-black);
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-width: 200px;
	}

	.join-button:hover {
		background-color: var(--primary-black);
	}

	.join-button .arrow-icon {
		width: 1.2em;
		height: 1.2em;
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

		.login-content {
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

		.login-content {
			padding: 1rem;
		}

		.launching-soon {
			padding: 1rem;
		}
	}
</style>
