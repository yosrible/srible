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
      <div class="pricing-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6" stroke="#3B82F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
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
    <div class="pricing-card featured">
      <div class="pricing-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981" stroke="#10B981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
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
      <div class="pricing-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6" stroke="#8B5CF6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
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
  padding: 3rem 0;
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

	/* Section title styles are defined in the SectionTitle component */

	.pricing-cards {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
  box-sizing: border-box;
  align-items: stretch;
}

.pricing-cards::-webkit-scrollbar {
		display: none;
	}

	.pricing-card {
  background: #fff;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  flex: 1 1 300px;
  max-width: 100%;
  min-width: 0; /* Prevents flex items from overflowing */
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  margin: 0;
}

.pricing-card.featured {
  border: 2px solid #000;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.pricing-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  background-color: rgba(243, 244, 246, 0.3);
  transform: scale(1);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.pricing-card:hover .pricing-icon {
  transform: scale(1.1);
  background-color: rgba(243, 244, 246, 0.5);
}

.pricing-icon svg {
  width: 22px;
  height: 22px;
}

.coming-soon {
  background: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.6);
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.9;
  text-align: center;
  margin: 0 0 1.25rem 0;
  width: 100%;
  transition: all 0.2s ease;
}

.pricing-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  text-align: center;
  color: #111827;
}

.price {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0.4rem 0 1.5rem;
  text-align: center;
  color: #111827;
  line-height: 1.2;
}

.price span {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  margin-left: 4px;
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
  font-size: 0.95rem;
  color: #4b5563;
  display: flex;
  align-items: center;
  line-height: 1.5;
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
	border: none;
}

.btn-coming-soon {
	background: transparent;
	color: #666;
	border: 1px solid #e0e0e0;
	cursor: not-allowed;
}

.btn-coming-soon:hover {
	background: transparent;
	color: #666;
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
/* 1010px - 901px */
@media (max-width: 1010px) and (min-width: 901px) {
  .pricing-section {
    padding: 2.5rem 0;
  }
  
  .pricing-cards {
    gap: 1.5rem;
    padding: 0 1.5rem;
    max-width: 100%;
  }
  
  .pricing-card {
    flex: 1 1 calc(50% - 1.5rem);
    min-width: 320px;
    max-width: calc(50% - 0.75rem);
    padding: 1.75rem 1.25rem;
  }
  
  .price {
    font-size: 1.85rem;
  }
}

/* 900px - 801px */
@media (max-width: 900px) and (min-width: 801px) {
  .pricing-section {
    padding: 2.25rem 0;
  }
  
  .pricing-cards {
    gap: 1.25rem;
    padding: 0 1.25rem;
  }
  
  .pricing-card {
    flex: 1 1 calc(50% - 1.25rem);
    min-width: 300px;
    max-width: 100%;
    padding: 1.5rem 1rem;
  }
  
  .price {
    font-size: 1.75rem;
  }
}

/* 800px - 701px */
@media (max-width: 800px) and (min-width: 701px) {
  .pricing-section {
    padding: 2rem 0;
  }
  
  .pricing-cards {
    padding: 0 1.25rem;
    gap: 1.25rem;
  }
  
  .pricing-card {
    flex: 1 1 100%;
    max-width: 100%;
    padding: 1.5rem 1.25rem;
  }
  
  .pricing-card.featured {
    transform: none;
  }
  
  .price {
    font-size: 1.75rem;
  }
}

/* 700px - 601px */
@media (max-width: 700px) and (min-width: 601px) {
  .pricing-section {
    padding: 1.75rem 0;
  }
  
  .pricing-cards {
    padding: 0 1.25rem;
    gap: 1.25rem;
  }
  
  .pricing-card {
    flex: 1 1 100%;
    max-width: 100%;
    padding: 1.5rem 1.25rem;
  }
  
  .price {
    font-size: 1.65rem;
  }
}

/* 600px and below */
@media (max-width: 600px) {
  .pricing-section {
    padding: 1.5rem 0.75rem;
  }
  
  .pricing-cards {
    padding: 0 0.5rem;
    gap: 1rem;
  }
  
  .pricing-card {
    padding: 1.5rem 1rem;
  }
  
  .price {
    font-size: 1.5rem;
  }
}

@media (max-width: 767px) {
  .pricing-cards {
    flex-direction: column;
    align-items: stretch;
    padding: 0 1rem;
    gap: 1.5rem;
  }
  
  .pricing-card {
    flex: 1 1 100%;
    max-width: 100%;
    margin: 0;
    padding: 1.5rem 1.25rem;
  }
  
  .pricing-card.featured {
    transform: none;
  }
  
  .pricing-icon {
    width: 44px;
    height: 44px;
    margin-bottom: 1rem;
  }
  
  .price {
    font-size: 2rem;
    margin: 0.25rem 0 1.25rem;
  }
  
  .coming-soon {
    padding: 0.4rem 0.75rem;
    margin-bottom: 1rem;
  }
  
  .pricing-card ul {
    gap: 0.6rem;
    margin-bottom: 1.25rem;
  }
  
  .pricing-card ul li {
    font-size: 0.9rem;
  }
  
  .btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
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
