<script>
	import { goto } from '$app/navigation';

	let blogTitle = '';
	let domainName = '';

	$: isFormValid = blogTitle.trim() !== '' && domainName.trim() !== '';

	async function handleSubmit() {
		if (!isFormValid) return;
		// TODO: Store blog details in session/store
		await goto('/create/signup');
	}
</script>

<div class="create-container">
	<div class="content">
		<h1>Create a blog</h1>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-group">
				<input
					type="text"
					bind:value={blogTitle}
					placeholder="Your blog title"
					class="title-input"
				/>
			</div>

			<div class="form-group domain-group">
				<input type="text" bind:value={domainName} placeholder="Domain name" class="domain-input" />
				<span class="domain-suffix">.srible.com</span>
			</div>

			<button type="submit" class="create-button" disabled={!isFormValid}> Create </button>
		</form>
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
	.create-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem 1rem;
		background-color: var(--primary-white);
	}

	.content {
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

	h1 {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 2rem;
		color: var(--primary-black);
		text-align: center;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	input {
		width: 100%;
		padding: 0.875rem;
		font-size: 1.0625rem;
		border: 1px solid var(--gray-medium);
		border-radius: 8px;
		background: white;
		transition: border-color 0.2s ease;
	}

	input:focus {
		outline: none;
		border-color: var(--primary-black);
	}

	.domain-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.domain-input {
		flex: 1;
	}

	.domain-suffix {
		font-size: 1rem;
		color: var(--gray-dark);
		white-space: nowrap;
	}

	.create-button {
		width: 100%;
		padding: 0.75rem;
		margin-top: 1rem;
		font-size: 1rem;
		font-weight: 500;
		color: white;
		background-color: #7873f5;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.create-button:hover:not(:disabled) {
		background-color: #6661e8;
	}

	.create-button:disabled {
		background-color: #7873f5;
		opacity: 0.5;
		cursor: not-allowed;
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

	@media (max-width: 480px) {
		.content {
			padding: 2rem 1.5rem;
			margin: 1rem;
			border-radius: 12px;
		}

		.domain-group {
			flex-direction: column;
			align-items: flex-start;
		}

		.domain-suffix {
			margin-left: 0.25rem;
			margin-top: 0.25rem;
		}

		.footer-links {
			flex-wrap: wrap;
			padding: 0 1rem;
		}

		.separator {
			margin: 0 0.25rem;
		}
	}
</style>
