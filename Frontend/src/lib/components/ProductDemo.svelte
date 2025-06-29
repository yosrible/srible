<script lang="ts">
	import SectionTitle from './ui/SectionTitle.svelte';
	
	const features = [
		{
			title: 'Beautiful Writing',
			description: 'A distraction-free writing environment with markdown support and real-time preview.'
		},
		{
			title: 'Custom Themes',
			description: 'Personalize your writing space with light and dark themes.'
		},
		{
			title: 'Analytics',
			description: 'Track your content\'s performance with detailed metrics.'
		},
		{
			title: 'Instant Publishing',
			description: 'Publish and share your content with one click.'
		},
		{
			title: 'Secure & Private',
			description: 'Enterprise-grade security for your content.'
		},
		{
			title: 'Fully Responsive',
			description: 'Works on all devices, anywhere, anytime.'
		}
	];
</script>

<section class="product-demo scroll-animate">
	<div class="container">
		<SectionTitle 
		title="See Srible in Action"
		subtitle="Experience the simplicity and power of our platform with these key features"
	/>

		<div class="features-grid">
			{#each features as feature}
				<div class="feature-card">
					<h3 class="card-title">{feature.title}</h3>
					<p class="card-description">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@700&display=swap');

	:global(:root) {
		--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
		--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
	}

	.product-demo {
		padding: clamp(2.5rem, 6vw, 5rem) 1rem;
		background-color: #ffffff;
		will-change: transform;
	}

	.container {
		max-width: min(1200px, 95%);
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: clamp(1.25rem, 3vw, 2rem);
		margin-top: clamp(1.5rem, 4vw, 3rem);
		will-change: transform;
	}

	.feature-card {
		background: #ffffff;
		border-radius: 1rem;
		padding: clamp(1.5rem, 3vw, 2rem);
		box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02);
		transition: all 0.4s var(--ease-out-expo), transform 0.3s var(--ease-out-quart);
		border: 1px solid rgba(229, 231, 235, 0.8);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		will-change: transform, box-shadow, border-color;
		animation: fadeInUp 0.6s var(--ease-out-quart) both;
		position: relative;
		overflow: hidden;
	}

	.feature-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #6366f1, #8b5cf6);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s var(--ease-out-expo);
	}

	.feature-card:hover {
		transform: translateY(-6px) scale(1.01);
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
		border-color: rgba(199, 210, 254, 0.5);
	}

	.feature-card:hover::before {
		transform: scaleX(1);
	}

	/* Stagger animations */
	.feature-card:nth-child(1) { animation-delay: 0.1s; }
	.feature-card:nth-child(2) { animation-delay: 0.2s; }
	.feature-card:nth-child(3) { animation-delay: 0.3s; }
	.feature-card:nth-child(4) { animation-delay: 0.4s; }
	.feature-card:nth-child(5) { animation-delay: 0.5s; }
	.feature-card:nth-child(6) { animation-delay: 0.6s; }

	.card-title {
		font-family: 'Inter', sans-serif;
		font-size: clamp(1.125rem, 4vw, 1.25rem);
		font-weight: 600;
		color: #111827;
		margin: 0 0 0.75rem 0;
		line-height: 1.3;
		transition: color 0.3s ease;
	}

	.card-description {
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.9375rem, 3.5vw, 0.95rem);
		line-height: 1.7;
		color: #4b5563;
		margin: 0;
		opacity: 0.9;
		transition: opacity 0.3s ease;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Touch devices optimization */
	@media (hover: none) {
		.feature-card {
			transition: none;
		}
		
		.feature-card:active {
			transform: scale(0.98);
		}
	}

	/* Reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.feature-card,
		.feature-card::before {
			transition: none;
			animation: none;
		}
	}
</style>
