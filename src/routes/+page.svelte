<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import ProductDemo from '$lib/components/ProductDemo.svelte';
	import Features from '$lib/components/Features.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	let observer: IntersectionObserver;

	onMount(() => {
		setupIntersectionObserver();

		// Handle browser navigation events
		window.addEventListener('popstate', handleNavigation);

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
</script>

<Hero />
<ProductDemo />
<Features />

<section class="faq-section scroll-animate" id="faq">
	<div class="section-decoration"></div>
	<h2 class="faq-title">Everything You Need to Know About Srible</h2>
	<p class="faq-subtitle">Find answers to your questions below</p>
	<div class="faq-list">
		<details class="faq-item">
			<summary>What is Srible?</summary>
			<p>
				Srible is a platform for personal blogging, focused on clean design and distraction-free
				writing.
			</p>
		</details>
		<details class="faq-item">
			<summary>How do I create a blog?</summary>
			<p>Click the "Create a blog" button on the homepage and follow the signup process.</p>
		</details>
		<details class="faq-item">
			<summary>Is Srible free to use?</summary>
			<p>
				Yes, Srible offers a free plan for all users. Premium features may be available in the
				future.
			</p>
		</details>
		<details class="faq-item">
			<summary>Can I customize my blog?</summary>
			<p>Yes! You can personalize your blog with themes and custom settings.</p>
		</details>
	</div>
</section>

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

<Footer />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&display=swap');

	.faq-section {
		max-width: 680px;
		margin: 2.5rem auto;
		padding: 1.75rem 1rem;
		background: #f8f8f5;
		position: relative;
		border-radius: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
	}

	.faq-title {
		font-family: 'Poppins', sans-serif;
		font-size: clamp(1.4rem, 4vw, 1.7rem);
		font-weight: 700;
		text-align: center;
		margin-bottom: 0.4rem;
		color: #000;
	}

	.faq-subtitle {
		text-align: center;
		color: #666;
		font-size: clamp(0.85rem, 2.5vw, 1rem);
		margin-bottom: 2rem;
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.faq-item {
		border-bottom: 1px solid #eee;
		padding-bottom: 0.75rem;
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-list summary {
		display: flex;
		align-items: center;
		font-weight: 500;
		cursor: pointer;
		font-size: clamp(0.95rem, 3vw, 1.1rem);
		padding: 0.75rem;
		min-height: 44px;
		color: #000;
		position: relative;
		transition: color 0.2s ease;
	}

	.faq-list summary:hover {
		color: #7873f5;
	}

	.faq-list p {
		margin: 0 0.75rem 0.75rem 0.75rem;
		color: #666;
		font-size: clamp(0.9rem, 3vw, 1rem);
		line-height: 1.5;
		padding-right: 0.5rem;
	}

	.faq-list details > summary {
		list-style: none;
	}

	.faq-list details > summary::before {
		content: '+';
		margin-right: 0.75rem;
		font-weight: 600;
		font-size: 1.2rem;
		min-width: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.faq-list details[open] > summary::before {
		content: '-';
	}

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

	.btn[disabled],
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
		.pricing-card {
			max-width: 90%;
		}
		.faq-section {
			margin: 1.75rem auto;
			padding: 1.25rem 0.75rem;
		}
		.faq-list summary {
			padding: 0.65rem;
		}
		.faq-list p {
			padding: 0 0.5rem 0.5rem 1.5rem;
			margin: 0;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 1rem;
		}

		.hero h1 {
			font-size: 2rem;
		}

		.hero p {
			font-size: 1rem;
		}

		.cta-buttons {
			flex-direction: column;
			gap: 1rem;
		}

		.btn {
			width: 100%;
			justify-content: center;
		}

		.pricing-card {
			padding: 1.5rem 1rem;
			max-width: 95%;
		}

		.pricing-card h3 {
			font-size: 1.4rem;
		}

		.pricing-card .price {
			font-size: 1.8rem;
		}
		
		.badge {
			font-size: 0.7rem;
			padding: 0.15em 0.5em;
		}
		.faq-section {
			margin: 1.25rem auto;
			padding: 1rem 0.5rem;
			border-radius: 0.75rem;
		}
		.faq-title {
			margin-bottom: 0.3rem;
		}
		.faq-subtitle {
			margin-bottom: 1.5rem;
		}
		.faq-list {
			gap: 0.5rem;
		}
		.faq-item {
			padding-bottom: 0.5rem;
		}
		.faq-list details > summary::before {
			font-size: 1.1rem;
			margin-right: 0.5rem;
		}
	}

	@media (max-width: 320px) {
		.hero h1 {
			font-size: 1.75rem;
		}

		.hero p {
			font-size: 0.9rem;
		}

		.pricing-card {
			padding: 1rem 0.75rem;
		}
		
		.pricing-card h3 {
			font-size: 1.3rem;
		}
		
		.badge {
			font-size: 0.65rem;
			display: block;
			margin: 0.3rem auto 0;
		}
		.faq-title {
			font-size: 1.35rem;
		}
		.faq-subtitle {
			font-size: 0.85rem;
			margin-bottom: 1.5rem;
		}
		.faq-list summary {
			font-size: 0.9rem;
			padding: 0.5rem;
		}
		.faq-list p {
			font-size: 0.85rem;
		}
	}
</style>
