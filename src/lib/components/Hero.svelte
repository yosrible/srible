<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		});

		document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

		return () => {
			document.querySelectorAll('.fade-in').forEach((el) => observer.unobserve(el));
		};
	});
</script>

<section class="hero">
	<div class="hero-background">
		<div class="gradient-blob blob-1"></div>
		<div class="gradient-blob blob-2"></div>
		<div class="gradient-blob blob-3"></div>
		<div class="pen-scribble"></div>
	</div>
	<div class="container">
		<div class="hero-content">
			<h1 class="scroll-animate">
				Clean. Simple. <span class="highlight">Personal.</span>
				<span class="scribble-dot dot-1"></span>
				<span class="scribble-dot dot-2"></span>
				<span class="scribble-dot dot-3"></span>
			</h1>
			<p class="subheading scroll-animate">
				Write without chasing likes. Create without competing for attention. Srible gives you your
				space to express yourself freely.
			</p>
			<div class="cta-buttons">
				<a href="/create" class="btn primary-btn">
					<span>Create a blog</span>
					<svg
						class="arrow-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 12h14m0 0-5-5m5 5-5 5"
						/></svg
					>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&display=swap');

	.hero {
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem 1rem;
		background-color: var(--primary-white);
		position: relative;
		overflow: hidden;
	}

	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 0;
		opacity: 0.6;
	}

	.gradient-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		opacity: 0.5;
		animation: float-blob 20s infinite ease-in-out;
	}

	.blob-1 {
		top: 10%;
		left: 10%;
		width: 300px;
		height: 300px;
		background: linear-gradient(135deg, #ff6ec4, #7873f5);
		animation-delay: 0s;
	}

	.blob-2 {
		top: 50%;
		right: 10%;
		width: 250px;
		height: 250px;
		background: linear-gradient(135deg, #7873f5, #42e695);
		animation-delay: -5s;
	}

	.blob-3 {
		bottom: 10%;
		left: 50%;
		width: 200px;
		height: 200px;
		background: linear-gradient(135deg, #42e695, #ff6ec4);
		animation-delay: -10s;
	}

	.pen-scribble {
		position: absolute;
		top: 20%;
		right: 15%;
		width: 120px;
		height: 120px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23ff6ec4' stroke='%23ff6ec4' stroke-width='2' d='M20,80 L30,70 L40,80 L50,70 L60,80 L70,70 L80,80 M30,70 L30,40 L70,40 L70,70 M20,20 L30,30 L40,20 L50,30 L60,20 L70,30 L80,20'/%3E%3C/svg%3E");
		background-size: contain;
		background-repeat: no-repeat;
		opacity: 0.2;
		animation: float-pen 18s infinite ease-in-out;
		animation-delay: -3s;
		transform-origin: center;
	}

	@keyframes float-pen {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(15px, -15px) rotate(5deg);
		}
		50% {
			transform: translate(0, 0) rotate(0deg);
		}
		75% {
			transform: translate(-15px, 15px) rotate(-5deg);
		}
	}

	@keyframes float-blob {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(20px, -20px) scale(1.1);
		}
		50% {
			transform: translate(0, 0) scale(1);
		}
		75% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 800px;
		margin: 0 auto;
		width: 100%;
	}

	h1 {
		font-family: 'Poppins', sans-serif;
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		margin-bottom: 1.5rem;
		line-height: 1.2;
		color: var(--primary-black);
		letter-spacing: -0.02em;
		position: relative;
	}

	.highlight {
		background: linear-gradient(90deg, #ff6ec4, #7873f5);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		position: relative;
	}

	.scribble-dot {
		position: absolute;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ff6ec4;
		opacity: 0.8;
		animation: float-dot 3s infinite ease-in-out;
	}

	.dot-1 {
		top: -10px;
		right: -15px;
		animation-delay: 0s;
	}

	.dot-2 {
		bottom: -5px;
		left: -10px;
		background: #7873f5;
		animation-delay: -1s;
	}

	.dot-3 {
		top: 50%;
		right: -20px;
		background: #42e695;
		animation-delay: -2s;
	}

	@keyframes float-dot {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(5px, -5px);
		}
	}

	.subheading {
		font-family: 'Inter', sans-serif;
		font-size: clamp(1.1rem, 2.5vw, 1.25rem);
		color: var(--gray-dark);
		margin-bottom: 2.5rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		line-height: 1.6;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.primary-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		background: linear-gradient(90deg, #ff6ec4, #7873f5);
		color: var(--primary-white);
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.primary-btn::before {
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

	.primary-btn:hover::before {
		transform: translateX(100%);
	}

	.primary-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(120, 115, 245, 0.3);
	}

	.primary-btn .arrow-icon {
		width: 1.2em;
		height: 1.2em;
		stroke: currentColor;
		transition: transform 0.3s ease;
	}

	.primary-btn:hover .arrow-icon {
		transform: translateX(3px);
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
		.hero {
			padding: 4rem 1rem 2rem;
			min-height: auto;
		}

		.cta-buttons {
			flex-direction: column;
			padding: 0 1rem;
		}

		.primary-btn {
			width: 100%;
			justify-content: center;
		}

		.gradient-blob {
			filter: blur(40px);
		}
	}
</style>
