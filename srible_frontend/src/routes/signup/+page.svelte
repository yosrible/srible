<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { syncWaitlistToSupabase } from '$lib/waitlistSync';

	let email = '';
	let termsAccepted = false;
	let isSubmitting = false;
	let showSuccessMessage = false;
	let showAlreadyRegisteredMessage = false;
	let showErrorMessage = false;
	let resultMessage = '';

	$: isFormValid = email.trim() !== '' && termsAccepted;

	// Try to sync any local emails when component mounts
	onMount(() => {
		// Attempt to sync any locally stored emails to Supabase
		syncWaitlistToSupabase().then(result => {
			if (result.success && result.results && result.results.length > 0) {
				console.log('🔄 Synced waitlist emails:', result.message);
			}
		}).catch(err => {
			console.warn('Failed to sync waitlist emails:', err);
		});
	});

	// Fallback function to store email locally when Supabase is unavailable
	function storeEmailLocally(email: string) {
		try {
			// Store in localStorage as fallback
			const timestamp = new Date().toISOString();
			let waitlistEmails = [];
			
			try {
				const storedEmails = localStorage.getItem('srible_waitlist_emails');
				if (storedEmails) {
					waitlistEmails = JSON.parse(storedEmails);
				}
			} catch (e) {
				// localStorage might be disabled or corrupted
				console.warn('Could not read from localStorage');
			}
			
			// Check if email already exists
			const emailExists = waitlistEmails.some((entry: any) => entry.email === email);
			if (!emailExists) {
				waitlistEmails.push({ email, timestamp });
				localStorage.setItem('srible_waitlist_emails', JSON.stringify(waitlistEmails));
			}
			
			return true;
		} catch (e) {
			console.warn('Failed to use localStorage fallback', e);
			return false;
		}
	}

	async function handleSubmit() {
		if (!isFormValid) return;

		isSubmitting = true;
		showErrorMessage = false;
		
		try {
			const response = await fetch('/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			const result = await response.json();
			console.log('Signup result:', result);
			
			if (response.ok) {
				if (result.message && result.message.includes('already on our waitlist')) {
					// Show already registered message
					showAlreadyRegisteredMessage = true;
					resultMessage = result.message;
				} else {
					// Show success message for new registrations
					showSuccessMessage = true;
				}
			} else {
				// Try localStorage fallback
				const fallbackSuccess = storeEmailLocally(email);
				
				if (fallbackSuccess) {
					// Even if the API failed, we saved locally, so show success
					showSuccessMessage = true;
				} else {
					// Both API and fallback failed
					throw new Error(result.error || 'Failed to submit form');
				}
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			
			// Try localStorage fallback
			const fallbackSuccess = storeEmailLocally(email);
			
			if (fallbackSuccess) {
				// Even if the API failed, we saved locally, so show success
				showSuccessMessage = true;
			} else {
				// Show inline error message instead of alert
				showErrorMessage = true;
				resultMessage = 'We couldn\'t process your submission. Please try again later.';
			}
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="signup-container">
	<div class="content">
		{#if showSuccessMessage}
			<div class="success-message">
				<svg class="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="10" fill="#4ade80" />
					<path d="M8 12l3 3 5-5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
				<h1>Thank you for joining!</h1>
				<p>We'll notify you as soon as Srible launches. We're excited to have you on board.</p>
				<button class="back-button" on:click={() => goto('/')}>
					<span>Back to Home</span>
				</button>
			</div>
		{:else if showAlreadyRegisteredMessage}
			<div class="already-registered-message">
				<svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="10" fill="#f76363" />
					<path d="M12 8v4M12 16h.01" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
				<h1>Already registered</h1>
				<p>{resultMessage}</p>
				<button class="back-button" on:click={() => goto('/')}>
					<span>Back to Home</span>
				</button>
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
				
				{#if showErrorMessage}
					<div class="error-message">
						{resultMessage}
					</div>
				{/if}

				<button type="submit" class="signup-button waitlist-button" disabled={!isFormValid || isSubmitting}>
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
		max-width: 480px;
		background-color: white;
		padding: 2.5rem;
		border-radius: 12px;
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.06),
			0 1px 3px rgba(0, 0, 0, 0.1);
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
	
	.error-message {
		padding: 0.75rem;
		margin-bottom: 1.5rem;
		background-color: #fff6f6;
		border-radius: 0.5rem;
		color: #d32f2f;
		font-size: 0.9375rem;
		text-align: center;
	}

	.signup-button {
		width: 100%;
		padding: 0.75rem;
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
	}

	.signup-button:hover:not(:disabled) {
		background-color: var(--primary-black);
	}

	.signup-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.waitlist-button {
		background-color: #7873f5;
		box-shadow: 0 4px 12px rgba(120, 115, 245, 0.2);
		font-size: 1.1rem;
		padding: 1rem 1.25rem;
		margin-top: 0.5rem;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.waitlist-button:hover:not(:disabled) {
		background-color: #6560e4;
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(120, 115, 245, 0.3);
	}

	.signup-button .arrow-icon {
		width: 1.2em;
		height: 1.2em;
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

	.success-message, .already-registered-message {
		text-align: center;
		animation: fadeIn 0.5s ease-out;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.already-registered-message p {
		color: #d32f2f;
		margin-bottom: 2rem;
		line-height: 1.6;
		font-size: 1.1rem;
	}

	.success-message p {
		color: var(--gray-dark);
		margin-bottom: 2rem;
		line-height: 1.6;
		font-size: 1.1rem;
	}

	.success-icon, .info-icon {
		width: 4rem;
		height: 4rem;
		margin: 0 auto 1.5rem;
		animation: scaleIn 0.5s ease-out forwards;
	}

	@keyframes scaleIn {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		70% {
			transform: scale(1.1);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
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
		background-color: var(--primary-black);
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 180px;
	}

	.back-button:hover {
		background-color: var(--primary-black);
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.back-button:active {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

	@media (max-width: 768px) {
		.signup-container {
			padding: 0 1.5rem;
		}

		.content {
			padding: 1.75rem;
			max-width: 420px;
		}

		h1 {
			font-size: 1.75rem;
			margin-bottom: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.signup-container {
			padding: 0 1rem;
		}

		.content {
			padding: 1.25rem;
			max-width: 100%;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		}

		h1 {
			font-size: 1.5rem;
			margin-bottom: 1rem;
		}

		.success-message p, .already-registered-message p {
			font-size: 1rem;
			margin-bottom: 1.5rem;
		}

		.success-icon, .info-icon {
			width: 3.5rem;
			height: 3.5rem;
			margin-bottom: 1rem;
		}
	}

	@media (max-width: 320px) {
		h1 {
			font-size: 1.25rem;
		}

		.content {
			padding: 1rem;
		}
	}
</style>
