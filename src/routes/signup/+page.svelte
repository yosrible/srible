<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let termsAccepted = false;
	let isSubmitting = false;
	let showSuccessMessage = false;

	$: isFormValid = email.trim() !== '' && termsAccepted;

	async function handleSubmit() {
		if (!isFormValid) return;

		isSubmitting = true;
		try {
			const response = await fetch('/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			if (response.ok) {
				showSuccessMessage = true;
			} else {
				throw new Error('Failed to submit form');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('Failed to submit form. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="signup-container">
	<div class="content">
		{#if showSuccessMessage}
			<div class="success-message">
				<h1>Thank you for your interest!</h1>
				<p>We're launching soon. We'll notify you when we're ready to go.</p>
				<button class="back-button" on:click={() => goto('/')}>Back to Home</button>
			</div>
		{:else}
			<h1>Join the waitlist</h1>

			<form on:submit|preventDefault={handleSubmit}>
				<div class="form-group">
					<input type="email" bind:value={email} placeholder="Email address" required />
				</div>

				<div class="terms-group">
					<label class="checkbox-label">
						<input type="checkbox" bind:checked={termsAccepted} />
						<span>I agree to the <a href="/terms" class="terms-link">Terms and conditions</a></span>
					</label>
				</div>

				<button type="submit" class="signup-button" disabled={!isFormValid || isSubmitting}>
					{#if isSubmitting}
						<div class="loading-spinner"></div>
						<span>Submitting...</span>
					{:else}
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
					{/if}
				</button>
			</form>
		{/if}
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
	.signup-container {
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

	input[type='email'] {
		width: 100%;
		padding: 0.875rem;
		font-size: 1.0625rem;
		border: 1px solid var(--gray-medium);
		border-radius: 8px;
		background: white;
		transition: border-color 0.2s ease;
	}

	input[type='email']:focus {
		outline: none;
		border-color: var(--primary-black);
	}

	.terms-group {
		margin-bottom: 1.5rem;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--gray-dark);
		font-size: 0.9375rem;
	}

	.terms-link {
		color: #7873f5;
		text-decoration: none;
	}

	.terms-link:hover {
		text-decoration: underline;
	}

	.signup-button {
		width: 100%;
		padding: 0.75rem;
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
	}

	.signup-button::before {
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

	.signup-button:hover:not(:disabled)::before {
		transform: translateX(100%);
	}

	.signup-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(120, 115, 245, 0.3);
	}

	.signup-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.signup-button .arrow-icon {
		width: 1.2em;
		height: 1.2em;
		transition: transform 0.3s ease;
	}

	.signup-button:hover:not(:disabled) .arrow-icon {
		transform: translateX(3px);
	}

	.loading-spinner {
		width: 1.2em;
		height: 1.2em;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: white;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.success-message {
		text-align: center;
		animation: fadeIn 0.5s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.back-button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		font-weight: 500;
		color: white;
		background-color: #7873f5;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.back-button:hover {
		background-color: #6661e8;
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
		.signup-container {
			padding: 0 2rem;
		}
	}

	@media (max-width: 768px) {
		.signup-container {
			padding: 0 1.5rem;
		}

		.signup-content {
			padding: 2rem;
		}

		h1 {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 480px) {
		.signup-container {
			padding: 0 1rem;
		}

		.signup-content {
			padding: 1.5rem;
		}

		h1 {
			font-size: 2rem;
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

		.signup-content {
			padding: 1rem;
		}
	}
</style>
