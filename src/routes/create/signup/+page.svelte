<script lang="ts">
	let email = '';
	let password = '';
	let termsAccepted = false;

	// Password validation
	$: isPasswordValid = password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
	$: isFormValid = email.trim() !== '' && isPasswordValid && termsAccepted;

	function handleSubmit() {
		if (!isFormValid) return;
		// TODO: Handle form submission
		console.log('Form submitted:', { email, password });
	}

	function handleSocialLogin(provider: 'github' | 'google' | 'x') {
		// TODO: Handle social login
		console.log('Social login with:', provider);
	}
</script>

<div class="signup-container">
	<div class="content">
		<h1>Set up your account</h1>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-group">
				<input type="email" bind:value={email} placeholder="Email address" required />
			</div>

			<div class="form-group">
				<input type="password" bind:value={password} placeholder="Password" required />
				<div class="password-requirements" class:invalid={password.length > 0 && !isPasswordValid}>
					<span class:valid={password.length >= 8}>• At least 8 characters</span>
					<span class:valid={/[A-Za-z]/.test(password)}>• Contains letters</span>
					<span class:valid={/[0-9]/.test(password)}>• Contains numbers</span>
				</div>
			</div>

			<div class="terms-group">
				<label class="checkbox-label">
					<input type="checkbox" bind:checked={termsAccepted} />
					<span>I agree to the <a href="/terms" class="terms-link">Terms and conditions</a></span>
				</label>
			</div>

			<button type="submit" class="signup-button" disabled={!isFormValid}> Create </button>

			<div class="divider">
				<span>or continue with</span>
			</div>

			<div class="social-buttons">
				<button type="button" class="social-button" on:click={() => handleSocialLogin('github')}>
					<svg viewBox="0 0 24 24" class="social-icon github">
						<path
							fill="currentColor"
							d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
						/>
					</svg>
					<span>GitHub</span>
				</button>

				<button type="button" class="social-button" on:click={() => handleSocialLogin('google')}>
					<svg viewBox="0 0 24 24" class="social-icon google">
						<path
							fill="#4285F4"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="#34A853"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="#FBBC05"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						/>
						<path
							fill="#EA4335"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					<span>Google</span>
				</button>

				<button type="button" class="social-button" on:click={() => handleSocialLogin('x')}>
					<svg viewBox="0 0 24 24" class="social-icon x">
						<path
							fill="currentColor"
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						/>
					</svg>
					<span>X (Twitter)</span>
				</button>
			</div>
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

	input[type='email'],
	input[type='password'] {
		width: 100%;
		padding: 0.875rem;
		font-size: 1.0625rem;
		border: 1px solid var(--gray-medium);
		border-radius: 8px;
		background: white;
		transition: border-color 0.2s ease;
	}

	input[type='email']:focus,
	input[type='password']:focus {
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
		background-color: #7873f5;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.signup-button:hover:not(:disabled) {
		background-color: #6661e8;
	}

	.signup-button:disabled {
		background-color: #7873f5;
		opacity: 0.5;
		cursor: not-allowed;
	}

	.password-requirements {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--gray-dark);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.password-requirements.invalid {
		color: #dc2626;
	}

	.password-requirements span {
		transition: color 0.2s ease;
	}

	.password-requirements span.valid {
		color: #22c55e;
	}

	.divider {
		margin: 2rem 0;
		display: flex;
		align-items: center;
		text-align: center;
		color: var(--gray-dark);
		font-size: 0.875rem;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid var(--gray-medium);
	}

	.divider span {
		margin: 0 1rem;
	}

	.social-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.social-button {
		width: 100%;
		padding: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		background: white;
		border: 1px solid var(--gray-medium);
		border-radius: 6px;
		color: var(--primary-black);
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.social-button:hover {
		background-color: #f8f9fa;
		border-color: var(--gray-dark);
	}

	.social-icon {
		width: 24px;
		height: 24px;
	}

	.social-icon.github {
		color: #24292e;
	}

	.social-icon.x {
		color: #000000;
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

		.social-buttons {
			gap: 0.75rem;
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
