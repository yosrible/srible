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

<!-- Decorative elements -->
<div class="decorative-elements">
	<div class="scribble scribble-1"></div>
	<div class="scribble scribble-2"></div>
	<div class="scribble scribble-3"></div>
	<div class="scribble scribble-4"></div>
	<div class="scribble scribble-5"></div>
	<div class="scribble scribble-6"></div>
	<div class="scribble scribble-7"></div>
</div>

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

	/* Decorative elements */
	.decorative-elements {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: -1;
		pointer-events: none;
	}

	.scribble {
		position: absolute;
		opacity: 0.15;
		background-size: contain;
		background-repeat: no-repeat;
		animation: float 15s infinite ease-in-out;
	}

	.scribble-1 {
		top: 10%;
		left: 5%;
		width: 150px;
		height: 150px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23ff6ec4' stroke='%23ff6ec4' stroke-width='2' d='M10,50 Q30,20 50,50 T90,50'/%3E%3C/svg%3E");
		animation-delay: 0s;
	}

	.scribble-2 {
		top: 30%;
		right: 10%;
		width: 120px;
		height: 120px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%237873f5' stroke='%237873f5' stroke-width='2' d='M20,20 C40,40 60,60 80,80'/%3E%3C/svg%3E");
		animation-delay: 2s;
	}

	.scribble-3 {
		bottom: 20%;
		left: 15%;
		width: 100px;
		height: 100px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%2342e695' stroke='%2342e695' stroke-width='2' d='M10,90 Q30,70 50,90 T90,90'/%3E%3C/svg%3E");
		animation-delay: 4s;
	}

	.scribble-4 {
		top: 50%;
		right: 20%;
		width: 80px;
		height: 80px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23ff6ec4' stroke='%23ff6ec4' stroke-width='2' d='M20,50 C40,30 60,70 80,50'/%3E%3C/svg%3E");
		animation-delay: 6s;
	}

	.scribble-5 {
		bottom: 10%;
		right: 5%;
		width: 130px;
		height: 130px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%237873f5' stroke='%237873f5' stroke-width='2' d='M10,10 C30,30 70,70 90,90'/%3E%3C/svg%3E");
		animation-delay: 8s;
	}

	.scribble-6 {
		top: 15%;
		left: 25%;
		width: 110px;
		height: 110px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%2342e695' stroke='%2342e695' stroke-width='2' d='M20,80 L30,70 L40,80 L50,70 L60,80 L70,70 L80,80 M30,70 L30,40 L70,40 L70,70 M20,20 L30,30 L40,20 L50,30 L60,20 L70,30 L80,20'/%3E%3C/svg%3E");
		animation-delay: 10s;
	}

	.scribble-7 {
		bottom: 30%;
		right: 25%;
		width: 100px;
		height: 100px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23ff6ec4' stroke='%23ff6ec4' stroke-width='2' d='M50,20 C30,20 20,40 20,50 C20,70 30,80 50,80 C70,80 80,70 80,50 C80,40 70,20 50,20 Z M40,50 C40,45 45,40 50,40 C55,40 60,45 60,50 C60,55 55,60 50,60 C45,60 40,55 40,50 Z M30,30 C25,25 20,30 20,35 C20,40 25,45 30,40 M70,30 C75,25 80,30 80,35 C80,40 75,45 70,40 M30,70 C25,75 20,70 20,65 C20,60 25,55 30,60 M70,70 C75,75 80,70 80,65 C80,60 75,55 70,60'/%3E%3C/svg%3E");
		animation-delay: 12s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		25% {
			transform: translateY(-10px) rotate(2deg);
		}
		50% {
			transform: translateY(0) rotate(0deg);
		}
		75% {
			transform: translateY(10px) rotate(-2deg);
		}
	}

	/* Section decorations */
	.section-decoration {
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		width: 100px;
		height: 4px;
		background: linear-gradient(90deg, #ff6ec4, #7873f5, #42e695);
		border-radius: 2px;
		opacity: 0.7;
	}

	.faq-section {
		max-width: 760px;
		margin: 3rem auto;
		padding: 2rem 1rem;
		background: #fff;
		position: relative;
		border-radius: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
	}

	.faq-title {
		font-family: 'Poppins', sans-serif;
		font-size: 2.5rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 0.5rem;
		color: #000;
		background: linear-gradient(90deg, #000, #333);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.faq-subtitle {
		text-align: center;
		color: #666;
		font-size: 1.1rem;
		margin-bottom: 2rem;
		font-family: 'Inter', sans-serif;
	}

	.faq-list {
		font-family: 'Inter', sans-serif;
	}

	.faq-list details {
		margin-bottom: 1rem;
		background: #fff;
		border: 1px solid #eee;
		border-radius: 0.75rem;
		padding: 0.5rem;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.faq-list details::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 4px;
		height: 100%;
		background: linear-gradient(to bottom, #ff6ec4, #7873f5);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.faq-list details:hover::before,
	.faq-list details[open]::before {
		opacity: 1;
	}

	.faq-list details[open] {
		background: #fafafa;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.faq-list summary {
		display: flex;
		align-items: center;
		font-weight: 500;
		cursor: pointer;
		font-size: 1.1rem;
		padding: 0.75rem;
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
		font-size: 1rem;
		line-height: 1.5;
	}

	.faq-list details > summary {
		list-style: none;
	}

	.faq-list details > summary::before {
		content: '+';
		margin-right: 0.75rem;
		color: #999;
		font-size: 1.2rem;
		transition: transform 0.3s ease;
	}

	.faq-list details[open] > summary::before {
		content: '-';
		transform: rotate(180deg);
	}

	.scroll-animate {
		opacity: 1;
		transform: none;
		transition:
			opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.scroll-animate.will-animate {
		opacity: 0;
		transform: translateY(40px) scale(0.95) rotateZ(-3deg) skewY(2deg);
	}

	.scroll-animate.will-animate.visible {
		opacity: 1;
		transform: none;
	}

	@media (max-width: 768px) {
		.faq-section {
			margin: 2rem auto;
			padding: 1.5rem 1rem;
		}

		.faq-title {
			font-size: 2rem;
		}
	}

	.pricing-section {
		max-width: 900px;
		margin: 3rem auto;
		padding: 2rem 1rem;
		background: #fff;
		border-radius: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
		position: relative;
	}

	.pricing-title {
		font-family: 'Poppins', sans-serif;
		font-size: 2.5rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 0.5rem;
		background: linear-gradient(90deg, #000, #333);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.pricing-subtitle {
		text-align: center;
		color: #666;
		font-size: 1.1rem;
		margin-bottom: 2.5rem;
		font-family: 'Inter', sans-serif;
	}

	.pricing-cards {
		display: flex;
		gap: 2rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.pricing-card {
		background: #fff;
		border: 1px solid #eee;
		border-radius: 0.75rem;
		padding: 2rem 1.5rem;
		flex: 1 1 260px;
		max-width: 320px;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.pricing-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
	}

	.card-decoration {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: linear-gradient(90deg, #ff6ec4, #7873f5, #42e695);
		opacity: 0.7;
	}

	.pricing-card h3 {
		font-size: 1.3rem;
		margin-bottom: 0.5rem;
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		color: #000;
	}

	.price {
		font-size: 2.2rem;
		font-weight: 700;
		color: #000;
		margin-bottom: 1rem;
		background: linear-gradient(90deg, #000, #333);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.price span {
		font-size: 1rem;
		font-weight: 400;
		color: #666;
		-webkit-text-fill-color: #666;
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

	.btn:hover::before {
		transform: translateX(100%);
	}

	.btn-primary {
		background: linear-gradient(90deg, #ff6ec4, #7873f5);
		color: white;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(120, 115, 245, 0.3);
	}

	.btn-secondary {
		background: #f5f5f5;
		color: #333;
	}

	.btn-secondary:hover {
		background: #eee;
		transform: translateY(-2px);
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
		margin-left: 0.5em;
		vertical-align: middle;
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
	}

	.pricing-card--free {
		position: relative;
		z-index: 1;
		background: #fff;
		border: 2.5px solid transparent;
		border-radius: 0.75rem;
	}
	.pricing-card--free::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		padding: 2.5px;
		background: linear-gradient(270deg, #ff6ec4, #7873f5, #42e695, #ff6ec4);
		background-size: 600% 600%;
		animation: gradient-border 4s ease infinite;
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		z-index: 2;
	}
	@keyframes gradient-border {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
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

	@media (max-width: 1200px) {
		.container {
			padding: 0 2rem;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 1.5rem;
		}

		.hero h1 {
			font-size: 2.5rem;
		}

		.hero p {
			font-size: 1.1rem;
		}

		.pricing-cards {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.pricing-card {
			max-width: 100%;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}

		.demo-container {
			padding: 1rem;
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
			padding: 1.5rem;
		}

		.pricing-card h3 {
			font-size: 1.5rem;
		}

		.pricing-card .price {
			font-size: 2rem;
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
			padding: 1rem;
		}
	}
</style>
