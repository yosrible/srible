<script lang="ts">
	import { onMount } from 'svelte';

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

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{
				threshold: 0.1
			}
		);

		document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

		return () => {
			document.querySelectorAll('.fade-in').forEach((el) => observer.unobserve(el));
		};
	});
</script>

<section class="features" id="why">
	<div class="features-background">
		<div class="gradient-blob blob-1"></div>
		<div class="gradient-blob blob-2"></div>
		<div class="gradient-blob blob-3"></div>
		<div class="brain-scribble"></div>
	</div>
	<div class="container">
		<h2 class="section-title scroll-animate">Why choose Srible?</h2>
		<p class="section-subtitle scroll-animate">
			We've built a platform that puts writers first, with features designed for simplicity and
			focus.
		</p>

		<div class="features-grid">
			{#each features as feature, i}
				<div class="feature-card" style="animation-delay: {i * 0.1}s">
					<div class="feature-icon" style="background: {feature.gradient}">{feature.icon}</div>
					<h3>{feature.title}</h3>
					<p>{feature.description}</p>
					<div class="card-decoration"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&display=swap');

	.features {
		padding: clamp(2rem, 5vw, 4rem) 1rem;
		background-color: #fff;
		position: relative;
		overflow: hidden;
	}

	.features-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 0;
		opacity: 0.4;
	}

	.gradient-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.5;
		animation: float-blob 25s infinite ease-in-out;
	}

	.blob-1 {
		top: 10%;
		left: 10%;
		width: 400px;
		height: 400px;
		background: linear-gradient(135deg, #ff6ec4, #7873f5);
		animation-delay: 0s;
	}

	.blob-2 {
		top: 50%;
		right: 10%;
		width: 300px;
		height: 300px;
		background: linear-gradient(135deg, #7873f5, #42e695);
		animation-delay: -8s;
	}

	.blob-3 {
		bottom: 10%;
		left: 50%;
		width: 350px;
		height: 350px;
		background: linear-gradient(135deg, #42e695, #ff6ec4);
		animation-delay: -16s;
	}

	.brain-scribble {
		position: absolute;
		bottom: 15%;
		right: 10%;
		width: 150px;
		height: 150px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%237873f5' stroke='%237873f5' stroke-width='2' d='M50,20 C30,20 20,40 20,50 C20,70 30,80 50,80 C70,80 80,70 80,50 C80,40 70,20 50,20 Z M40,50 C40,45 45,40 50,40 C55,40 60,45 60,50 C60,55 55,60 50,60 C45,60 40,55 40,50 Z M30,30 C25,25 20,30 20,35 C20,40 25,45 30,40 M70,30 C75,25 80,30 80,35 C80,40 75,45 70,40 M30,70 C25,75 20,70 20,65 C20,60 25,55 30,60 M70,70 C75,75 80,70 80,65 C80,60 75,55 70,60'/%3E%3C/svg%3E");
		background-size: contain;
		background-repeat: no-repeat;
		opacity: 0.2;
		animation: float-brain 22s infinite ease-in-out;
		animation-delay: -5s;
		transform-origin: center;
	}

	@keyframes float-brain {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(20px, -20px) rotate(3deg);
		}
		50% {
			transform: translate(0, 0) rotate(0deg);
		}
		75% {
			transform: translate(-20px, 20px) rotate(-3deg);
		}
	}

	@keyframes float-blob {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(30px, -30px) scale(1.1);
		}
		50% {
			transform: translate(0, 0) scale(1);
		}
		75% {
			transform: translate(-30px, 30px) scale(0.9);
		}
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
		background-color: rgba(255, 255, 255, 0.8);
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

	.card-decoration {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: linear-gradient(90deg, #ff6ec4, #7873f5, #42e695);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.feature-card:hover .card-decoration {
		opacity: 1;
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

	.fade-in {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
	}

	.fade-in.visible {
		opacity: 1;
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		.features-grid {
			padding: 0;
		}

		.gradient-blob {
			filter: blur(60px);
		}
	}

	@media (max-width: 480px) {
		.feature-card {
			padding: 1.25rem;
		}
	}
</style>
