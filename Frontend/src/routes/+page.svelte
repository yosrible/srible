<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import ProductDemo from '$lib/components/ProductDemo.svelte';
	import Features from '$lib/components/Features.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import SectionTitle from '$lib/components/ui/SectionTitle.svelte';
	import { onMount, onDestroy } from 'svelte';
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

	// Check if code is running in browser environment
	const isBrowser = typeof window !== 'undefined';

	onMount(() => {
		// Only run browser-specific code in browser environment
		if (isBrowser) {
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
		}
	});

	onDestroy(() => {
		// Only run browser-specific cleanup in browser environment
		if (isBrowser) {
			window.removeEventListener('popstate', handleNavigation);
			if (observer) {
				observer.disconnect();
			}
		}
	});

	function setupIntersectionObserver() {
		// Only run in browser environment
		if (!isBrowser) return;

		// Disconnect existing observer if any
		if (observer) {
			observer.disconnect();
		}

		// Initialize with a small delay to ensure DOM is ready
		const initObserver = () => {
			// Check if elements exist
			const animatedElements = document.querySelectorAll('.scroll-animate');
			if (!animatedElements.length) return;

			// Create new observer with more aggressive settings
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('visible');
							// Unobserve after animation completes to improve performance
							setTimeout(() => {
								if (entry.isIntersecting) {
									observer?.unobserve(entry.target);
								}
							}, 1000);
						}
					});
				},
				{ 
					root: null, // viewport
					rootMargin: '0px 0px -20px 0px', // Start animation when element is 20px from bottom of viewport
					threshold: 0.05 // trigger when 5% of the element is visible
				}
			);

			// Observe all elements with scroll-animate class
			animatedElements.forEach((el) => {
				// Reset animation state
				el.classList.remove('visible');
				// Force reflow to reset animation
				const elAsHTMLElement = el as HTMLElement;
				void elAsHTMLElement.offsetWidth;
				// Observe the element
				observer.observe(el);
			});

			// Check immediately if elements are already in view
			checkElementsInView(animatedElements);
		};

		// Function to check if elements are already in view
		const checkElementsInView = (elements: NodeListOf<Element>) => {
			const check = () => {
				elements.forEach(el => {
					const rect = el.getBoundingClientRect();
					const isVisible = (
						rect.top <= (window.innerHeight * 0.9) &&
						rect.bottom >= 0
					);
					if (isVisible) {
						el.classList.add('visible');
					}
				});
			};

			// Check immediately and after a short delay
			check();
			setTimeout(check, 100);
		};

		// Run immediately and with a small delay
		setTimeout(initObserver, 50);
	}

	function handleNavigation() {
		// Only run in browser environment
		if (!isBrowser) return;

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
  <SectionTitle 
    title="Simple, Transparent Pricing"
    subtitle="Choose the plan that fits your writing journey"
  />
  <div class="pricing-cards">
    <div class="pricing-card">
      <h3>Enterprise</h3>
      <p class="price">Custom</p>
      <div class="coming-soon">Coming Soon</div>
      <ul>
        <li>Everything in Pro</li>
        <li>Dedicated support</li>
        <li>Custom integrations</li>
        <li>Team features</li>
      </ul>
      <button class="btn btn-coming-soon" disabled>Coming Soon</button>
    </div>
    <div class="pricing-card">
      <h3>Free</h3>
      <p class="price">$0<span>/month</span></p>
      <ul>
        <li>Unlimited posts</li>
        <li>Basic themes</li>
        <li>Srible subdomain</li>
        <li>Community support</li>
      </ul>
      <a href="/signup" class="btn btn-primary">Get Started <span class="arrow">→</span></a>
    </div>
    <div class="pricing-card">
      <h3>Pro</h3>
      <p class="price">$5.99<span>/month</span></p>
      <div class="coming-soon">Coming Soon</div>
      <ul>
        <li>Everything in Free</li>
        <li>Premium themes</li>
        <li>Custom domain</li>
        <li>Advanced analytics</li>
        <li>Priority support</li>
      </ul>
      <button class="btn btn-coming-soon" disabled>Coming Soon</button>
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

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&display=swap');

	/* Main page styles */

	.pricing-section {
		padding: 3rem 1rem;
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		background-image: 
			linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
			linear-gradient(180deg, rgba(0,0,0,0.03) 1px, transparent 1px);
		background-size: 40px 40px;
		background-position: -1px -1px;
	}

	/* Section title styles are defined in the SectionTitle component */

	.pricing-cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: stretch;
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}
	
	.pricing-cards::-webkit-scrollbar {
		display: none;
	}

	.pricing-card {
		display: flex;
		flex-direction: column;
		flex: 1 1 240px;
		max-width: 280px;
		padding: 1.25rem;
		border: 1px solid #eaeaea;
		border-radius: 10px;
		transition: all 0.3s ease;
		height: auto;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		scroll-snap-align: start;
	}
	
	.pricing-card h3 {
		font-size: 1.1rem;
		margin: 0 0 0.4rem;
	}
	
	.price {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0.4rem 0 0.8rem;
	}
	
	.price span {
		font-size: 0.9rem;
		font-weight: 400;
		color: #666;
	}
	
	.pricing-card ul {
		margin: 0.75rem 0;
		padding: 0 0 0 1.5rem;
		flex-grow: 1;
		list-style-position: outside;
	}
	
	.pricing-card li {
		margin-bottom: 0.4rem;
		font-size: 0.85rem;
		line-height: 1.4;
		color: #444;
	}

	.pricing-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.1);
	}

	.coming-soon {
		display: inline-block;
		margin: 0.5rem 0 1rem;
		padding: 0.25rem 0.75rem;
		background: #f0f0f0;
		color: #666;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.btn-coming-soon {
		background: #f5f5f5;
		color: #888;
		border: 1px solid #e0e0e0;
		cursor: not-allowed;
	}

	.btn-coming-soon:hover {
		background: #f5f5f5;
		transform: none;
	}

	.price {
		font-family: 'Inter', sans-serif;
		font-size: 2.5rem;
		font-weight: 600;
		text-align: center;
		margin: 0 0 1.5rem 0;
		color: #000;
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
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.pricing-card ul li {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		color: #444;
		margin-bottom: 0.75rem;
		text-align: center;
		position: relative;
	}

	.pricing-card ul {
		list-style: none;
		padding: 0;
		margin: 0 0 1.5rem 0;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.pricing-card ul li {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		color: #444;
		margin-bottom: 0.75rem;
		text-align: left;
		position: relative;
		padding-left: 1.75rem;
	}

	.pricing-card ul li::before {
		content: '✓';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		color: #000;
		font-weight: bold;
	}

	.btn {
		display: inline-block;
		padding: 0.6rem 1.25rem;
		border-radius: 6px;
		font-family: 'Inter', sans-serif;
		font-weight: 500;
		font-size: 0.9rem;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.2s ease;
		width: 100%;
		max-width: 200px;
		margin: 0.5rem auto 0;
	}

	.btn-primary {
		background: #000;
		color: white;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding: 0.6rem 1.25rem;
		position: relative;
		overflow: hidden;
		font-size: 0.9rem;
	}

  .arrow {
    position: relative;
    right: 0;
    transition: transform 0.3s ease;
  }

  .btn-primary:hover .arrow {
    transform: translateX(4px);
  }

  .btn-primary:hover {
    background: #333;
    border-color: #333;
  }



	/* Responsive adjustments */
	@media (max-width: 900px) {
		.pricing-cards {
			flex-direction: column;
			align-items: center;
		}

		.pricing-card {
			width: 100%;
			max-width: 400px;
		}
	}

	.waitlist-section {
		padding: 5rem 1.5rem;
		text-align: center;
		background: #ffffff;
	}

	.waitlist-title {
		font-family: 'Inter', sans-serif;
		font-size: 2.25rem;
		font-weight: 600;
		margin: 0 0 1rem;
		color: #1a1a1a;
		line-height: 1.2;
	}

	.waitlist-subtitle {
		font-family: 'Inter', sans-serif;
		font-size: 1.125rem;
		font-weight: 400;
		color: #4b5563;
		margin: 0 auto 2.5rem;
		max-width: 600px;
		line-height: 1.6;
	}

	.waitlist-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 500px;
		margin: 0 auto;
	}

	.waitlist-input {
		padding: 0.875rem 1.25rem;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		color: #1f2937;
		transition: all 0.2s ease;
	}

	.waitlist-input:focus {
		outline: none;
		border-color: #000;
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
	}

	.waitlist-btn {
		padding: 0.6rem 1.25rem;
		background: #000;
		color: white;
		border: none;
		border-radius: 6px;
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		text-decoration: none;
		width: 100%;
		max-width: 200px;
		margin: 0.5rem auto 0;
	}

	.waitlist-btn:hover {
		background: #333;
		transform: translateY(-1px);
	}

	.waitlist-btn:active {
		transform: translateY(0);
	}

	.waitlist-message {
		margin: 1rem auto 0;
		padding: clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.5rem, 2vw, 0.75rem);
		border-radius: clamp(0.375rem, 1.5vw, 0.5rem);
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.8rem, 2.5vw, 0.9rem);
		max-width: 500px;
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

	@media (max-width: 1024px) {
		.pricing-section {
			padding: 2.5rem 1rem;
		}
		.pricing-cards {
			padding: 0.5rem 1rem;
		}
	}

	@media (max-width: 768px) {
		.pricing-section {
			padding: 2rem 1rem;
		}
		.pricing-cards {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1.5rem;
			padding: 1rem 0;
			overflow: visible;
		}
		.pricing-card {
			width: 100%;
			max-width: 280px;
			margin: 0;
			padding: 1.25rem;
		}
		/* Section title styles are defined in the SectionTitle component */
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
		.pricing-card ul {
			margin: 0.75rem 0;
			padding-left: 1.25rem;
		}
		.pricing-cards {
			gap: 1.25rem;
			padding: 0.5rem 0.25rem 1rem;
		}
		.pricing-card {
			width: 100%;
			max-width: 260px;
			padding: 1rem;
		}
		.pricing-card h3 {
			font-size: 1.25rem;
		}
		.price {
			font-size: 2rem;
		}
		.pricing-card ul {
			margin: 1rem 0;
		}
		.pricing-card li {
			font-size: 0.9rem;
			margin-bottom: 0.4rem;
		}
		/* Section title styles are defined in the SectionTitle component */
		.btn {
			width: 100%;
			justify-content: center;
			padding: 0.75rem 1.25rem;
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
		.waitlist-subtitle {
			font-size: 0.85rem;
			max-width: 100%;
			margin-bottom: 0.875rem;
		}
		.waitlist-input, .waitlist-btn {
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
