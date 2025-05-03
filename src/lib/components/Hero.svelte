<script lang="ts">
	import { onMount } from 'svelte';

	let displayText = '';
	const targetText = 'Personal.';
	let cursorVisible = true;
	let typingComplete = false;
	let windowWidth = 0;
	let heroVisual: HTMLDivElement;

	// Typing animation
	function typeText() {
		let charIndex = 0;
		const typingSpeed = 120; // ms per character
		const typingInterval = setInterval(() => {
			if (charIndex < targetText.length) {
				displayText += targetText[charIndex];
				charIndex++;
			} else {
				clearInterval(typingInterval);
				typingComplete = true;
			}
		}, typingSpeed);

		// Less resource-intensive cursor animation with longer interval
		setInterval(() => {
			cursorVisible = !cursorVisible;
		}, 800);
	}

	function handleResize() {
		windowWidth = window.innerWidth;
	}

	onMount(() => {
		windowWidth = window.innerWidth;
		window.addEventListener('resize', handleResize);

		setTimeout(() => {
			typeText();
		}, 800); // Start typing after a short delay

		// Add loaded class to hero visual with a slight delay for animation
		setTimeout(() => {
			if (heroVisual) {
				heroVisual.classList.add('loaded');
			}
		}, 300);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	$: isMobile = windowWidth <= 480;
	$: isTablet = windowWidth > 480 && windowWidth <= 768;
</script>

<section class="hero">
	<div class="container">
		<div class="hero-content">
			<div class="hero-text-area">
				<h1 class:mobile={isMobile} class:tablet={isTablet}>
					Clean. Simple. <span class="highlight typing-container">
						<span class="typed-text">{displayText}</span><span
							class="cursor"
							class:hidden={!cursorVisible || typingComplete}>|</span
						>
					</span>
				</h1>
				<p class="subheading" class:mobile={isMobile}>
					Write without chasing likes. Create without competing for attention. Srible gives you your
					space
				</p>
				<div class="cta-buttons">
					<a href="/signup" class="btn primary-btn">
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
			<div class="hero-visual loaded" bind:this={heroVisual}>
				<div class="floating-elements">
					<div class="floating-element element-1"></div>
					<div class="floating-element element-2"></div>
					<div class="floating-element element-3"></div>
				</div>
				<div class="hero-illustration">
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 600 500"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<!-- Minimal Blog Editor Illustration -->
						<rect
							x="50"
							y="50"
							width="500"
							height="350"
							rx="8"
							fill="#FFFFFF"
							stroke="#E0E0E0"
							stroke-width="2"
						/>
						<rect
							x="50"
							y="50"
							width="500"
							height="40"
							rx="8"
							fill="#F5F5F5"
							stroke="#E0E0E0"
							stroke-width="2"
						/>
						<circle cx="75" cy="70" r="8" fill="#FF6EC4" />
						<circle cx="100" cy="70" r="8" fill="#7873F5" />
						<circle cx="125" cy="70" r="8" fill="#42E695" />

						<!-- Toolbar -->
						<rect x="70" y="110" width="460" height="30" rx="4" fill="#F8F8F5" />
						<rect x="80" y="120" width="20" height="10" rx="2" fill="#E0E0E0" />
						<rect x="110" y="120" width="20" height="10" rx="2" fill="#E0E0E0" />
						<rect x="140" y="120" width="20" height="10" rx="2" fill="#E0E0E0" />
						<rect x="170" y="120" width="20" height="10" rx="2" fill="#E0E0E0" />

						<!-- Content -->
						<rect x="70" y="160" width="300" height="18" rx="2" fill="#333333" />
						<rect x="70" y="190" width="460" height="10" rx="2" fill="#666666" opacity="0.7" />
						<rect x="70" y="210" width="430" height="10" rx="2" fill="#666666" opacity="0.7" />
						<rect x="70" y="230" width="380" height="10" rx="2" fill="#666666" opacity="0.7" />

						<rect x="70" y="260" width="460" height="10" rx="2" fill="#666666" opacity="0.7" />
						<rect x="70" y="280" width="420" height="10" rx="2" fill="#666666" opacity="0.7" />
						<rect x="70" y="300" width="380" height="10" rx="2" fill="#666666" opacity="0.7" />

						<!-- Publish Button -->
						<rect x="450" y="350" width="80" height="30" rx="4" fill="url(#gradient)" />
						<text x="470" y="370" font-family="Inter, sans-serif" font-size="12" fill="white"
							>Publish</text
						>

						<!-- Gradient definition -->
						<defs>
							<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stop-color="#ff6ec4" />
								<stop offset="50%" stop-color="#7873f5" />
								<stop offset="100%" stop-color="#42e695" />
							</linearGradient>
						</defs>
					</svg>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

	.hero {
		min-height: min(80vh, 700px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(1rem, 5vh, 2rem) 1rem;
		background-color: var(--primary-white);
		position: relative;
		overflow: hidden;
		width: 100%;
		box-sizing: border-box;
	}

	.container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 max(1rem, 5%);
		box-sizing: border-box;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	.hero-text-area {
		text-align: left;
		flex: 1;
		max-width: 550px;
	}

	h1 {
		font-family: 'Poppins', sans-serif;
		font-size: clamp(2.25rem, 7vw, 4rem);
		font-weight: 700;
		margin-bottom: clamp(1rem, 3vh, 1.5rem);
		line-height: 1.2;
		color: var(--primary-black);
		letter-spacing: -0.02em;
		position: relative;
	}

	h1.tablet {
		font-size: clamp(2rem, 6vw, 3rem);
		margin-bottom: 1.25rem;
	}

	h1.mobile {
		font-size: clamp(1.75rem, 8vw, 2.5rem);
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	.highlight {
		background: linear-gradient(90deg, #ff6ec4, #7873f5, #42e695);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		position: relative;
	}

	.typing-container {
		display: inline-block;
		min-width: clamp(140px, 18vw, 180px);
		text-align: left;
		font-family: 'Space Mono', monospace;
		font-size: 0.95em;
		font-weight: 700;
		letter-spacing: -0.01em;
		margin-top: 0.1em;
		position: relative;
	}

	.typed-text {
		display: inline;
	}

	.cursor {
		display: inline-block;
		font-weight: 700;
		font-size: 1.05em;
		margin-left: 1px;
		animation: blink 1s infinite;
		color: var(--primary-black);
		-webkit-text-fill-color: var(--primary-black);
		font-family: 'Space Mono', monospace;
	}

	.cursor.hidden {
		opacity: 0;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	.subheading {
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.9rem, 2vw, 1rem); /* Reduced text size */
		color: var(--gray-dark);
		margin-bottom: clamp(1.5rem, 5vh, 2.5rem);
		max-width: min(600px, 95%);
		margin-left: 0;
		margin-right: auto;
		line-height: 1.5;
		font-weight: 400;
		letter-spacing: 0.01em;
	}

	.subheading.mobile {
		font-size: clamp(1rem, 4.5vw, 1.2rem);
		line-height: 1.5;
		margin-bottom: 1.75rem;
		max-width: 100%;
		padding: 0 0.5rem;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
		width: 100%;
	}

	.primary-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: clamp(0.65rem, 2vw, 0.75rem) clamp(1rem, 4vw, 1.5rem);
		border-radius: 0.5rem;
		background-color: var(--primary-black);
		color: var(--primary-white);
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.9rem, 3vw, 1rem);
		font-weight: 500;
		text-decoration: none;
		min-height: 44px;
		touch-action: manipulation;
		transition: transform 0.2s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.primary-btn:active {
		transform: scale(0.98);
	}

	.primary-btn .arrow-icon {
		width: 22px;
		height: 22px;
		transform: translateX(0);
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
		margin-left: 5px;
		opacity: 0.7;
	}

	.primary-btn:hover .arrow-icon {
		transform: translateX(4px);
		opacity: 1;
	}

	/* Hero visual section */
	.hero-visual {
		flex: 1;
		max-width: 600px;
		position: relative;
		min-height: 350px;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.7s ease,
			transform 0.7s ease;
	}

	.hero-visual.loaded {
		opacity: 1;
		transform: translateY(0);
	}

	.hero-illustration {
		position: relative;
		z-index: 2;
		width: 100%;
		height: auto;
		filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.05));
	}

	/* Floating elements */
	.floating-elements {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		pointer-events: none;
	}

	.floating-element {
		position: absolute;
		border-radius: 50%;
		opacity: 0.5;
		filter: blur(20px);
	}

	.element-1 {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #ff6ec4, #7873f5);
		top: 20%;
		left: 15%;
		animation: float-element 8s infinite ease-in-out;
	}

	.element-2 {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, #7873f5, #42e695);
		top: 70%;
		left: 20%;
		animation: float-element 10s infinite ease-in-out reverse;
	}

	.element-3 {
		width: 70px;
		height: 70px;
		background: linear-gradient(135deg, #42e695, #ff6ec4);
		top: 30%;
		left: 75%;
		animation: float-element 9s infinite ease-in-out 1s;
	}

	@keyframes float-element {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(15px, -15px) scale(1.05);
		}
		50% {
			transform: translate(0, 0) scale(1);
		}
		75% {
			transform: translate(-15px, 15px) scale(0.95);
		}
	}

	/* Tablet styles */
	@media (max-width: 992px) {
		.hero-content {
			flex-direction: column;
			text-align: center;
			gap: 3rem;
		}

		.hero-text-area {
			text-align: center;
			max-width: 650px;
		}

		.subheading {
			margin-left: auto;
			margin-right: auto;
		}

		.cta-buttons {
			justify-content: center;
		}

		.hero-visual {
			max-width: 500px;
			order: -1;
		}

		.element-1 {
			top: 10%;
			left: 10%;
		}

		.element-3 {
			top: 20%;
			left: 80%;
		}
	}

	@media (max-width: 768px) {
		.hero {
			padding-top: 1.5rem;
			padding-bottom: 1.5rem;
		}

		.subheading {
			font-size: 0.9rem;
			margin-bottom: 1.75rem;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

		.primary-btn {
			margin-left: 0;
			margin-right: 0;
			margin-bottom: 1rem;
			width: 100%;
			max-width: 300px;
		}

		.hero-visual {
			max-width: 100%;
			min-height: 280px;
		}

		.floating-element {
			filter: blur(15px);
		}
	}

	/* Mobile styles */
	@media (max-width: 480px) {
		.hero {
			padding-top: 1rem;
			padding-bottom: 1rem;
			min-height: 60vh;
		}

		.hero-content {
			gap: 2rem;
		}

		.subheading {
			font-size: 1rem;
			margin-bottom: 1.5rem;
		}

		.subheading.mobile {
			font-size: 0.85rem;
		}

		.primary-btn {
			padding: 12px 16px;
			font-size: 0.95rem;
		}

		.hero-visual {
			min-height: 220px;
		}

		.element-1 {
			width: 60px;
			height: 60px;
		}

		.element-2 {
			width: 45px;
			height: 45px;
		}

		.element-3 {
			width: 50px;
			height: 50px;
		}
	}

	/* Small mobile styles */
	@media (max-width: 360px) {
		.hero {
			padding: 4rem 0.5rem 1.25rem;
		}

		.typing-container {
			min-width: 110px;
		}

		.subheading {
			font-size: 1rem;
			line-height: 1.4;
		}
	}

	/* Landscape mode optimization */
	@media (max-height: 500px) and (orientation: landscape) {
		.hero {
			min-height: auto;
			padding: 5rem 1rem 1.5rem;
		}

		h1 {
			font-size: clamp(1.75rem, 5vw, 2.5rem);
			margin-bottom: 0.75rem;
		}

		.subheading {
			font-size: 1.1rem;
			margin-bottom: 1.25rem;
			max-width: 80%;
		}
	}
</style>
