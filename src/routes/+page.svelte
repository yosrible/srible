<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import ProductDemo from '$lib/components/ProductDemo.svelte';
	import Features from '$lib/components/Features.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { syncWaitlistToSupabase } from '$lib/waitlistSync';

	let observer: IntersectionObserver;
	let email = '';
	let waitlistStatus: WaitlistStatus = {
		message: '',
		success: false,
		visible: false
	};

	type WaitlistStatus = {
		message: string;
		success: boolean;
		visible: boolean;
		isWarning?: boolean;
	};

	onMount(() => {
		setupIntersectionObserver();

		// Handle browser navigation events
		window.addEventListener('popstate', handleNavigation);

		// Attempt to sync any locally stored emails to Supabase
		syncWaitlistToSupabase().then(result => {
			if (result.success && result.results && result.results.length > 0) {
				console.log('🔄 Synced waitlist emails:', result.message);
			}
		}).catch(err => {
			console.warn('Failed to sync waitlist emails:', err);
		});

		return () => {
			window.removeEventListener('popstate', handleNavigation);
			if (observer) {
				observer.disconnect();
			}
		};
	});

	function setupIntersectionObserver() {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ rootMargin: '0px 0px -10% 0px' }
		);

		document.querySelectorAll('.scroll-animate').forEach((el) => {
			el.classList.add('will-animate');
			observer.observe(el);
		});
	}

	function handleNavigation() {
		// Re-initialize animations when navigating back/forward
		setTimeout(() => {
			setupIntersectionObserver();
		}, 100);
	}

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

	async function handleWaitlistSubmit() {
		if (!email || !email.includes('@')) {
			waitlistStatus = {
				message: 'Please enter a valid email address',
				success: false,
				visible: true
			};
			return;
		}

		try {
			console.log('Submitting email to waitlist:', email);
			const response = await fetch('/api/direct-insert', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			const result = await response.json();
			console.log('Waitlist submission result:', result);
			
			// Special case for already on waitlist
			if (result.success && result.message && result.message.includes('already on our waitlist')) {
				waitlistStatus = {
					message: result.message,
					success: false, // Display in error style (soft red)
					isWarning: true, // Add this flag for special styling
					visible: true
				};
			} else if (result.success) {
				waitlistStatus = {
					message: result.message || 'Thanks for joining the waitlist!',
					success: true,
					visible: true
				};
			} else {
				// Try localStorage fallback
				const fallbackSuccess = storeEmailLocally(email);
				
				if (fallbackSuccess) {
					// Even if the API failed, we saved locally, so show success
					waitlistStatus = {
						message: 'Thanks for joining the waitlist!',
						success: true,
						visible: true
					};
				} else {
					waitlistStatus = {
						message: result.message || 'Something went wrong. Please try again later.',
						success: false,
						visible: true
					};
				}
			}

			if (waitlistStatus.success) {
				email = '';
				// Hide success message after 5 seconds
				setTimeout(() => {
					waitlistStatus.visible = false;
				}, 5000);
			}
		} catch (error) {
			console.error('Error submitting to waitlist:', error);
			
			// Try localStorage fallback
			const fallbackSuccess = storeEmailLocally(email);
			
			if (fallbackSuccess) {
				// Even if the API failed, we saved locally, so show success
				waitlistStatus = {
					message: 'Thanks for joining the waitlist!',
					success: true,
					visible: true
				};
				email = '';
				// Hide success message after 5 seconds
				setTimeout(() => {
					waitlistStatus.visible = false;
				}, 5000);
			} else {
				waitlistStatus = {
					message: 'Something went wrong. Please try again later.',
					success: false,
					visible: true
				};
			}
		}
	}
</script>

<Hero />
<ProductDemo />
<Features />
<FAQ />

<section class="pricing-section scroll-animate" id="pricing">
	<div class="section-decoration"></div>
	<h2 class="pricing-title">Simple, Transparent Pricing</h2>
	<p class="pricing-subtitle">Choose the plan that fits your writing journey. No hidden fees.</p>
	<div class="pricing-cards">
		<div class="pricing-card faded">
			<div class="card-decoration"></div>
			<h3>Pro <span class="badge">Coming Soon</span></h3>
			<p class="price">$5.99<span>/month</span></p>
			<ul>
				<li>Everything in Free</li>
				<li>Premium themes</li>
				<li>Custom domain</li>
				<li>Advanced analytics</li>
				<li>Priority support</li>
			</ul>
			<a href="/signup?plan=pro" class="btn btn-secondary">Coming Soon</a>
		</div>
		<div class="pricing-card pricing-card--free">
			<div class="card-decoration"></div>
			<h3>Free</h3>
			<p class="price">$0<span>/month</span></p>
			<ul>
				<li>Unlimited posts</li>
				<li>Basic themes</li>
				<li>Srible sub domain</li>
				<li>Community support</li>
			</ul>
			<a href="/signup" class="btn btn-primary">Get Started</a>
		</div>
		<div class="pricing-card faded">
			<div class="card-decoration"></div>
			<h3>Enterprise <span class="badge">Custom</span></h3>
			<p class="price">Contact Us</p>
			<ul>
				<li>Everything in Pro</li>
				<li>Dedicated support</li>
				<li>Custom integrations</li>
			</ul>
			<button class="btn btn-secondary">Coming Soon</button>
		</div>
	</div>
</section>

<section class="waitlist-section scroll-animate" id="waitlist">
	<div class="section-decoration"></div>
	<h2 class="waitlist-title">Join Our Waitlist</h2>
	<p class="waitlist-subtitle">Be the first to know when we launch</p>
	
	<div class="waitlist-form">
		<input 
			type="email" 
			bind:value={email} 
			placeholder="Your email address" 
			class="waitlist-input"
			aria-label="Email address for waitlist"
		/>
		<button class="waitlist-btn btn btn-primary" on:click={() => handleWaitlistSubmit()}>
			Join Waitlist
		</button>
	</div>
	
	{#if waitlistStatus.visible}
		<div class="waitlist-message" class:success={waitlistStatus.success} class:error={!waitlistStatus.success} class:warning={waitlistStatus.isWarning}>
			{waitlistStatus.message}
		</div>
	{/if}
</section>

<Footer />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&display=swap');

	/* Main page styles */

	.pricing-section {
		padding: 4rem 0;
		position: relative;
		background: #f8f8f5;
		overflow: hidden;
	}

	.pricing-cards {
		display: flex;
		max-width: 1100px;
		margin: 0 auto;
		gap: 2rem;
		justify-content: center;
		padding: 0 1rem;
		position: relative;
	}

	.pricing-card {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		width: 100%;
		max-width: 320px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.pricing-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
	}

	.pricing-card h3 {
		font-size: clamp(1.4rem, 4vw, 1.75rem);
		font-weight: 700;
		margin-bottom: 1rem;
		color: #000;
		font-family: 'Poppins', sans-serif;
		text-align: center;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.3rem;
	}

	.pricing-title {
		font-family: 'Poppins', sans-serif;
		font-size: clamp(1.8rem, 5vw, 2.5rem);
		font-weight: 700;
		text-align: center;
		margin-bottom: 0.5rem;
		color: #000;
	}

	.pricing-subtitle {
		text-align: center;
		color: #666;
		font-size: clamp(0.9rem, 3vw, 1.1rem);
		margin-bottom: 2.5rem;
		font-family: 'Inter', sans-serif;
	}

	.price {
		font-size: clamp(1.8rem, 5vw, 2.5rem);
		font-weight: 700;
		margin-bottom: 1.5rem;
		color: #000;
		font-family: 'Poppins', sans-serif;
		text-align: center;
	}

	.price span {
		font-size: 1rem;
		font-weight: 400;
		color: #666;
	}

	.pricing-card ul {
		list-style: none;
		padding: 0;
		margin: 0 0 1.5rem 0;
		width: 100%;
	}

	.pricing-card ul li {
		font-size: 1rem;
		color: #333;
		margin-bottom: 0.5rem;
		text-align: left;
		position: relative;
		padding-left: 1.5rem;
	}

	.pricing-card ul li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #42e695;
		font-weight: bold;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.3s ease;
		cursor: pointer;
		border: none;
		position: relative;
		overflow: hidden;
	}

	.btn::before {
		display: none;
	}

	.btn:hover::before {
		display: none;
	}

	.btn-primary {
		background-color: #000;
		color: white;
	}

	.btn-primary:hover {
		background-color: #000;
	}

	.btn-secondary {
		background: #f5f5f5;
		color: #333;
	}

	.btn-secondary:hover {
		background-color: #f5f5f5;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none !important;
	}

	.badge {
		display: inline-block;
		background: #eee;
		color: #666;
		font-size: 0.8rem;
		padding: 0.2em 0.7em;
		border-radius: 0.5em;
		vertical-align: middle;
		white-space: nowrap;
	}

	.pricing-card--free {
		position: relative;
		z-index: 1;
		background: #fff;
		border: 1px solid #eee;
		border-radius: 0.75rem;
	}

	.pricing-card--free::before {
		display: none;
	}

	.pricing-card.faded {
		opacity: 0.4;
		pointer-events: none;
		transform: scale(0.95);
	}

	.pricing-card.faded:hover {
		transform: scale(0.95);
		box-shadow: none;
	}

	.pricing-card.faded .btn {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.pricing-card.faded .badge {
		opacity: 0.6;
	}

	.waitlist-section {
		max-width: 680px;
		margin: 2.5rem auto;
		padding: clamp(1.25rem, 5vw, 1.75rem) clamp(0.75rem, 3vw, 1rem);
		background: #f8f8f5;
		position: relative;
		border-radius: clamp(0.75rem, 2vw, 1rem);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
		text-align: center;
		width: 100%;
		box-sizing: border-box;
	}

	.waitlist-title {
		font-family: 'Poppins', sans-serif;
		font-size: clamp(1.5rem, 5vw, 2.5rem);
		font-weight: 700;
		text-align: center;
		margin-bottom: clamp(0.25rem, 1vw, 0.5rem);
		color: #000;
		line-height: 1.2;
	}

	.waitlist-subtitle {
		text-align: center;
		color: #666;
		font-size: clamp(0.85rem, 3vw, 1.1rem);
		margin-bottom: clamp(1rem, 4vw, 1.5rem);
		font-family: 'Inter', sans-serif;
		line-height: 1.4;
		max-width: 90%;
		margin-left: auto;
		margin-right: auto;
	}

	.waitlist-form {
		display: flex;
		flex-direction: row;
		gap: clamp(0.5rem, 2vw, 0.75rem);
		width: 100%;
		max-width: 500px;
		margin: 0 auto clamp(0.75rem, 3vw, 1rem);
	}

	.waitlist-input {
		flex: 1;
		padding: clamp(0.6rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem);
		border: 1px solid #eee;
		border-radius: clamp(0.375rem, 1.5vw, 0.5rem);
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.875rem, 3vw, 1rem);
		min-height: 48px;
		background: white;
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		box-sizing: border-box;
	}

	.waitlist-input:focus {
		outline: none;
		border-color: #d1d1d1;
	}

	.waitlist-btn {
		min-height: 48px;
		min-width: clamp(100px, 30%, 120px);
		white-space: nowrap;
		font-size: clamp(0.875rem, 3vw, 1rem);
		padding: clamp(0.6rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem);
		border-radius: clamp(0.375rem, 1.5vw, 0.5rem);
		touch-action: manipulation;
	}

	.waitlist-message {
		margin-top: clamp(0.5rem, 2vw, 0.75rem);
		padding: clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.5rem, 2vw, 0.75rem);
		border-radius: clamp(0.375rem, 1.5vw, 0.5rem);
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.8rem, 2.5vw, 0.9rem);
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
		line-height: 1.4;
		width: 100%;
		box-sizing: border-box;
	}

	.waitlist-message.success {
		background-color: #e6f7ed;
		color: #107a42;
	}

	.waitlist-message.error {
		background-color: #ffefef;
		color: #d32f2f;
	}

	.waitlist-message.warning {
		background-color: #fff6f6;
		color: #d32f2f;
	}

	@media (max-width: 768px) {
		.pricing-cards {
			flex-direction: column;
			gap: 1.5rem;
			align-items: center;
		}
		.pricing-section {
			padding: 1.5rem 0.5rem;
		}
		.pricing-title {
			font-size: 2rem;
		}
		.waitlist-section {
			margin: 1.75rem auto;
			padding: 1.25rem 0.75rem;
			width: calc(100% - 2rem);
		}
		.waitlist-form {
			flex-direction: column;
			gap: 0.75rem;
			align-items: stretch;
		}
		.waitlist-input {
			width: 100%;
			min-height: 50px; /* Slightly taller on mobile for better touch targets */
		}
		.waitlist-btn {
			width: 100%;
			min-height: 50px;
			justify-content: center;
			display: flex;
			align-items: center;
		}
		.waitlist-message {
			max-width: 100%;
		}
	}

	@media (max-width: 480px) {
		.btn {
			width: 100%;
			justify-content: center;
		}
		.waitlist-section {
			margin: 1.25rem auto;
			padding: 1rem 0.5rem;
			border-radius: 0.75rem;
			width: calc(100% - 1.5rem);
		}
		.waitlist-title {
			margin-bottom: 0.3rem;
			font-size: 1.8rem;
		}
		.waitlist-subtitle {
			margin-bottom: 1rem;
			font-size: 0.9rem;
			max-width: 95%;
		}
		.waitlist-input, .waitlist-btn {
			min-height: 54px; /* Even larger touch targets on small devices */
		}
	}

	@media (max-width: 320px) {
		.badge {
			font-size: 0.65rem;
			display: block;
			margin: 0.3rem auto 0;
		}
		.waitlist-subtitle {
			font-size: 0.85rem;
			max-width: 100%;
			margin-bottom: 0.875rem;
		}
		.waitlist-input, .waitlist-btn {
			font-size: 0.9rem;
			padding: 0.6rem 1rem;
			min-height: 52px;
		}
		.waitlist-form {
			gap: 0.625rem;
		}
		.waitlist-message {
			font-size: 0.8rem;
			padding: 0.5rem 0.625rem;
		}
	}
	
	/* Handle landscape orientation on mobile */
	@media (max-height: 500px) and (orientation: landscape) {
		.waitlist-section {
			padding: 1rem 0.75rem;
			margin: 1rem auto;
		}
		.waitlist-title {
			font-size: 1.5rem;
			margin-bottom: 0.25rem;
		}
		.waitlist-subtitle {
			font-size: 0.85rem;
			margin-bottom: 0.75rem;
		}
		.waitlist-form {
			flex-direction: row;
			max-width: 90%;
		}
		.waitlist-input, .waitlist-btn {
			min-height: 44px;
		}
		.waitlist-btn {
			min-width: auto;
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}
</style>
