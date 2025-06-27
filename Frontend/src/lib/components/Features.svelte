<script>
  import SectionTitle from './ui/SectionTitle.svelte';

  const features = [
		{
			title: 'Distraction-free Writing',
			description: 'Clean, minimalist editor to keep you in the flow.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h16M12 4v16"/></svg>`
		},
		{
			title: 'Your Space',
			description: 'Share without social pressure. Your blog, your rules.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
		},
		{
			title: 'Simple Publishing',
			description: 'One click to publish. No complex settings needed.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 19.5h10m0 0L8.75 17m3.25 2.5L8.75 22m10.25-2.5h-5M9 7.5l3.5-3.5M9 7.5V2m0 5.5l-7 7 7 7 7-7-7-7zm7 7h5a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1h-2"/></svg>`
		},
		{
			title: 'Custom Domain',
			description: 'Use your own domain to build your personal brand.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
		},
		{
			title: 'Clean Design',
			description: 'Beautiful themes that put your content first.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06z"/><path d="M12 8c2 1 3 2.5 3 5"/></svg>`
		},
		{
			title: 'Privacy Focused',
			description: 'No tracking or analytics. We respect your privacy.',
			icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
		}
	];
</script>

<section class="features scroll-animate" id="why">
	<div class="container">
		<SectionTitle 
      title="Why choose Srible?"
      subtitle="A platform that puts writers first, with features for simplicity and focus."
    />

		<div class="features-grid">
			{#each features as feature}
				<div class="feature-card">
					<div class="card-content">
						<div class="feature-icon">
							{@html feature.icon}
						</div>
						<div class="text-content">
							<h3>{feature.title}</h3>
							<p>{feature.description}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

	.features {
		padding: 4rem 1rem;
		position: relative;
		overflow: hidden;
		background-image: 
			linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
			linear-gradient(180deg, rgba(0,0,0,0.03) 1px, transparent 1px);
		background-size: 30px 30px;
		background-position: -1px -1px;
		background-color: #ffffff;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Section title styles are now handled by the SectionTitle component */

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.feature-card {
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		padding: 1.5rem;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.feature-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.card-content {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.feature-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background-color: #f3f4f6;
		margin-bottom: 1rem;
	}

	.text-content {
		flex: 1;
	}

	.text-content h3 {
		font-family: 'Inter', sans-serif;
		font-size: 1.125rem;
		font-weight: 600;
		color: #111827;
		margin-bottom: 0.5rem;
	}

	.text-content p {
		font-size: 0.9375rem;
		line-height: 1.5;
		color: #4b5563;
		margin: 0;
	}

	@media (max-width: 640px) {
		.features {
			padding: 3rem 1rem;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.feature-card {
			padding: 1.25rem;
		}
		
		.feature-icon {
			width: 42px;
			height: 42px;
			min-width: 42px;
			border-radius: 10px;
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
		
		/* Section title responsive styles are now handled by the SectionTitle component */
		
		p {
			font-size: 0.8rem;
		}
	}
</style>
