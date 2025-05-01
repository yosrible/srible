<script lang="ts">
	const features = [
		{
			title: 'Distraction-free Writing',
			description:
				'Focus on your content with our clean, minimalist editor that helps you stay in the flow.',
			icon: '✍️',
			gradient: 'linear-gradient(135deg, #ff6ec4, #7873f5)'
		},
		{
			title: 'Your Space',
			description:
				'Create and share without the pressure of social metrics. Your blog, your rules.',
			icon: '🏠',
			gradient: 'linear-gradient(135deg, #7873f5, #42e695)'
		},
		{
			title: 'Simple Publishing',
			description:
				'One click to publish your thoughts to the world. No complicated settings or configurations.',
			icon: '🚀',
			gradient: 'linear-gradient(135deg, #42e695, #ff6ec4)'
		},
		{
			title: 'Custom Domain',
			description:
				'Use your own domain name to establish your presence and build your personal brand.',
			icon: '🌐',
			gradient: 'linear-gradient(135deg, #ff6ec4, #7873f5)'
		},
		{
			title: 'Clean Design',
			description:
				'Beautiful, responsive themes that put your content first and make reading a pleasure.',
			icon: '🎨',
			gradient: 'linear-gradient(135deg, #7873f5, #42e695)'
		},
		{
			title: 'Privacy Focused',
			description: 'Your data stays yours, with no tracking or analytics. We respect your privacy.',
			icon: '🔒',
			gradient: 'linear-gradient(135deg, #42e695, #ff6ec4)'
		}
	];
</script>

<section class="features" id="why">
	<div class="container">
		<h2 class="section-title">Why choose Srible?</h2>
		<p class="section-subtitle">
			We've built a platform that puts writers first, with features designed for simplicity and
			focus.
		</p>

		<div class="features-grid">
			{#each features as feature, i}
				<div class="feature-card">
					<div class="feature-icon" style="background: {feature.gradient}">{feature.icon}</div>
					<h3>{feature.title}</h3>
					<p>{feature.description}</p>
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
		font-size: clamp(2rem, 5vw, 3rem);
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
		font-size: clamp(1rem, 2.5vw, 1.25rem);
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
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: clamp(1rem, 2vw, 1.5rem);
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		position: relative;
		z-index: 1;
	}

	.feature-card {
		padding: clamp(1.25rem, 3vw, 1.5rem);
		text-align: center;
		background-color: rgba(248, 248, 245, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		border: 1px solid rgba(238, 238, 238, 0.5);
		transition: all 0.3s ease;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.feature-card:hover {
		transform: translateY(-5px) scale(1.02);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
		border-color: transparent;
	}

	.feature-icon {
		font-size: clamp(1.75rem, 4vw, 2.25rem);
		margin-bottom: clamp(0.75rem, 2vw, 1rem);
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		color: white;
		position: relative;
		z-index: 1;
		transition: transform 0.3s ease;
	}

	.feature-card:hover .feature-icon {
		transform: scale(1.1) rotate(5deg);
	}

	h3 {
		font-family: 'Inter', sans-serif;
		font-size: clamp(1.1rem, 2.5vw, 1.25rem);
		margin-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
		font-weight: 500;
		color: #000;
		position: relative;
		z-index: 1;
	}

	p {
		font-family: 'Inter', sans-serif;
		color: #666;
		font-size: clamp(0.9rem, 2vw, 0.95rem);
		line-height: 1.5;
		max-width: 300px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	@media (max-width: 768px) {
		.features-grid {
			padding: 0;
		}
	}

	@media (max-width: 480px) {
		.feature-card {
			padding: 1.25rem;
		}
	}
</style>
