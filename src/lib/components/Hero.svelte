<script lang="ts">
	import { onMount } from 'svelte';

	let displayText = '';
	const targetText = 'Personal.';
	let cursorVisible = true;
	let typingComplete = false;
	let windowWidth = 0;

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

		// Blinking cursor animation
		setInterval(() => {
			cursorVisible = !cursorVisible;
		}, 500);
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
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

	.hero {
		min-height: min(70vh, 650px);
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
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
		max-width: min(800px, 90%);
		margin: 0 auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
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
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	.subheading {
		font-family: 'Inter', sans-serif;
		font-size: clamp(1.15rem, 3vw, 1.35rem);
		color: var(--gray-dark);
		margin-bottom: clamp(1.5rem, 5vh, 2.5rem);
		max-width: min(650px, 95%);
		margin-left: auto;
		margin-right: auto;
		line-height: 1.6;
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
		width: clamp(1em, 3vw, 1.2em);
		height: clamp(1em, 3vw, 1.2em);
		stroke: currentColor;
	}

	/* Tablet styles */
	@media (max-width: 768px) {
		.hero {
			padding: 5rem 1rem 2rem;
			min-height: auto;
		}
		
		.container {
			padding: 0 1rem;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
			padding: 0 max(1rem, 5%);
		}

		.primary-btn {
			width: min(100%, 300px);
		}
		
		.typing-container {
			font-size: 0.9em;
		}
	}

	/* Mobile styles */
	@media (max-width: 480px) {
		.hero {
			padding: 4.5rem 0.75rem 1.5rem;
		}
		
		.container {
			padding: 0 0.75rem;
		}
		
		.hero-content {
			max-width: 100%;
		}
		
		.primary-btn {
			width: 100%;
			padding: 0.65rem 1rem;
		}
		
		.typing-container {
			font-size: 0.85em;
			min-width: 130px;
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
