<script lang="ts">
	import { onMount } from 'svelte';
	
	let featuresSection: HTMLElement;
	let isInView = false;
	
	const features = [
		{
			title: 'Distraction-free Writing',
			description: 'Clean, minimalist editor to keep you in the flow.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h16M12 4v16"/></svg>`,
			gradient: 'linear-gradient(135deg, #ff6ec4, #7873f5)',
			color: '#ff6ec4'
		},
		{
			title: 'Your Space',
			description: 'Share without social pressure. Your blog, your rules.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
			gradient: 'linear-gradient(135deg, #7873f5, #42e695)',
			color: '#7873f5'
		},
		{
			title: 'Simple Publishing',
			description: 'One click to publish. No complex settings needed.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 19.5h10m0 0L8.75 17m3.25 2.5L8.75 22m10.25-2.5h-5M9 7.5l3.5-3.5M9 7.5V2m0 5.5l-7 7 7 7 7-7-7-7zm7 7h5a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1h-2"/></svg>`,
			gradient: 'linear-gradient(135deg, #42e695, #ff6ec4)',
			color: '#42e695'
		},
		{
			title: 'Custom Domain',
			description: 'Use your own domain to build your personal brand.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
			gradient: 'linear-gradient(135deg, #ff6ec4, #7873f5)',
			color: '#ff6ec4'
		},
		{
			title: 'Clean Design',
			description: 'Beautiful themes that put your content first.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06z"/><path d="M12 8c2 1 3 2.5 3 5"/></svg>`,
			gradient: 'linear-gradient(135deg, #7873f5, #42e695)',
			color: '#7873f5'
		},
		{
			title: 'Privacy Focused',
			description: 'No tracking or analytics. We respect your privacy.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
			gradient: 'linear-gradient(135deg, #42e695, #ff6ec4)',
			color: '#42e695'
		}
	];
	
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					isInView = true;
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 });
		
		if (featuresSection) {
			observer.observe(featuresSection);
		}
		
		return () => {
			if (featuresSection) observer.unobserve(featuresSection);
		};
	});
</script>

<section class="features" id="why" bind:this={featuresSection}>
	<div class="container">
		<h2 class="section-title">Why choose Srible?</h2>
		<p class="section-subtitle">
			A platform that puts writers first, with features for simplicity and focus.
		</p>

		<div class="features-grid {isInView ? 'animate' : ''}">
			{#each features as feature, i}
				<div class="feature-card" style="--delay: {i * 0.1}s;">
					<div class="card-content">
						<div class="feature-icon" style="background: {feature.gradient}">
							{@html feature.icon}
						</div>
						<div class="text-content">
							<h3>{feature.title}</h3>
							<p>{feature.description}</p>
						</div>
					</div>
					<div class="card-indicator" style="background: {feature.color}"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&display=swap');

	.features {
		padding: clamp(2rem, 5vw, 4rem) 1rem;
		background-color: var(--primary-white);
		position: relative;
		overflow: hidden;
	}

	.section-title {
		font-family: 'Poppins', sans-serif;
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		font-weight: 700;
		text-align: center;
		color: #000;
		margin-bottom: 0.5rem;
		position: relative;
		z-index: 1;
		background: linear-gradient(90deg, #000, #333);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.section-subtitle {
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.9rem, 2vw, 1rem);
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		position: relative;
		z-index: 1;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
		gap: clamp(1rem, 2vw, 1.5rem);
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		position: relative;
		z-index: 1;
	}
	
	.features-grid .feature-card {
		transform: translateY(0);
		opacity: 1;
	}

	.feature-card {
		padding: clamp(1rem, 2vw, 1.25rem);
		background-color: rgba(248, 248, 245, 0.8);
		backdrop-filter: blur(5px);
		border-radius: 0.75rem;
		border: 1px solid rgba(238, 238, 238, 0.8);
		transition: none;
		height: 100%;
		position: relative;
		overflow: hidden;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
		
		will-change: transform, opacity;
		transform: translateY(0);
		opacity: 1;
	}
	
	.card-content {
		display: flex;
		align-items: flex-start;
		text-align: left;
		gap: 1rem;
	}
	
	.text-content {
		flex: 1;
	}

	.feature-card:hover {
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
		border-color: transparent;
	}

	.feature-icon {
		width: 50px;
		height: 50px;
		min-width: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		color: white;
		position: relative;
		z-index: 1;
		transition: none;
	}
	
	:global(.feature-icon svg) {
		width: 24px;
		height: 24px;
		stroke-width: 2px;
	}

	.feature-card:hover .feature-icon {
		transform: scale(1.1);
	}
	
	.card-indicator {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3px;
		transition: none;
	}
	
	.feature-card:hover .card-indicator {
		height: 5px;
	}

	h3 {
		font-family: 'Inter', sans-serif;
		font-size: clamp(1rem, 2vw, 1.15rem);
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #000;
		position: relative;
		z-index: 1;
	}

	p {
		font-family: 'Inter', sans-serif;
		color: #666;
		font-size: clamp(0.85rem, 1.5vw, 0.9rem);
		line-height: 1.5;
		margin: 0;
		position: relative;
		z-index: 1;
	}

	@media (max-width: 880px) {
		.features-grid {
			padding: 0;
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
		}
	}

	@media (max-width: 480px) {
		.feature-card {
			padding: 1rem;
		}
		
		.feature-icon {
			width: 42px;
			height: 42px;
			min-width: 42px;
			border-radius: 10px;
		}
		
		:global(.feature-icon svg) {
			width: 20px;
			height: 20px;
		}
		
		.card-content {
			gap: 0.75rem;
		}
	}
	
	/* Small mobile optimizations */
	@media (max-width: 360px) {
		.feature-card {
			padding: 0.85rem;
		}
		
		.feature-icon {
			width: 36px;
			height: 36px;
			min-width: 36px;
		}
		
		:global(.feature-icon svg) {
			width: 18px;
			height: 18px;
		}
		
		h3 {
			font-size: 0.95rem;
			margin-bottom: 0.35rem;
		}
		
		p {
			font-size: 0.8rem;
		}
	}
</style>
