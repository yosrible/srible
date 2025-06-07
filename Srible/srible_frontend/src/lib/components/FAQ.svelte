<script lang="ts">
	import { onMount } from 'svelte';
	
	let faqSection: HTMLElement;
	let isInView = false;
	let activeIndex = -1;
	
	const faqs = [
		{
			question: 'How much does Srible cost?',
			answer: 'Srible is free to start. Our basic plan includes all essential blogging features with no hidden fees. Premium plans with advanced features start at $5/month.'
		},
		{
			question: 'Can I use my own domain name?',
			answer: 'Yes! You can connect your custom domain to your Srible blog in just a few clicks. We handle all the technical details for you.'
		},
		{
			question: 'Do I need coding knowledge to use Srible?',
			answer: 'Not at all. Srible is designed for writers, not coders. Our intuitive interface makes it easy to create and publish beautiful content without any technical skills.'
		},
		{
			question: 'How do I import my existing blog?',
			answer: 'Srible offers a simple import tool that works with WordPress, Medium, and other major platforms. Your content, images, and formatting will be preserved.'
		},
		{
			question: 'Is my content safe on Srible?',
			answer: 'Absolutely. We automatically backup your content, use encryption for all data, and you always retain full ownership of everything you publish.'
		}
	];
	
	function toggleAnswer(index: number) {
		activeIndex = activeIndex === index ? -1 : index;
	}
	
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					isInView = true;
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 });
		
		if (faqSection) {
			observer.observe(faqSection);
		}
		
		return () => {
			if (faqSection) observer.unobserve(faqSection);
		};
	});
</script>

<section class="faq" id="faq" bind:this={faqSection}>
	<div class="container">
		<h2 class="section-title">Frequently Asked Questions</h2>
		<p class="section-subtitle">
			Quick answers to common questions about Srible.
		</p>

		<div class="faq-grid {isInView ? 'animate' : ''}">
			{#each faqs as faq, i}
				<div 
					class="faq-item" 
					style="--delay: {i * 0.1}s;"
					class:active={activeIndex === i}
				>
					<button class="faq-question" on:click={() => toggleAnswer(i)}>
						<span>{faq.question}</span>
						<svg 
							class="icon" 
							width="20" 
							height="20" 
							viewBox="0 0 24 24" 
							fill="none" 
							stroke="currentColor" 
							stroke-width="2" 
							stroke-linecap="round" 
							stroke-linejoin="round"
						>
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<line x1="5" y1="12" x2="19" y2="12" class="vertical-line"></line>
						</svg>
					</button>
					<div class="faq-answer">
						<p>{faq.answer}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&display=swap');

	.faq {
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

	.faq-grid {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 800px;
		margin: 0 auto;
		width: 100%;
		position: relative;
		z-index: 1;
	}
	
	.faq-grid .faq-item {
		transform: translateY(0);
		opacity: 1;
	}
	
	.faq-item {
		border-radius: 0.75rem;
		overflow: hidden;
		background-color: rgba(248, 248, 245, 0.8);
		backdrop-filter: blur(5px);
		border: 1px solid rgba(238, 238, 238, 0.8);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
		will-change: transform, opacity;
		transform: translateY(0);
		opacity: 1;
	}
	
	.faq-item.active {
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
	}
	
	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1rem 1.25rem;
		border: none;
		background: transparent;
		font-family: 'Inter', sans-serif;
		font-size: clamp(0.95rem, 2vw, 1.05rem);
		font-weight: 500;
		color: #333;
		text-align: left;
		cursor: pointer;
		transition: none;
	}
	
	.faq-question:hover {
		background-color: rgba(246, 246, 246, 0.9);
	}
	
	.faq-item.active .faq-question {
		border-bottom: 1px solid rgba(238, 238, 238, 0.5);
	}
	
	.icon {
		min-width: 20px;
		transition: none;
	}
	
	.faq-item.active .icon {
		transform: rotate(45deg);
	}
	
	.faq-answer {
		display: none;
		overflow: hidden;
	}
	
	.faq-item.active .faq-answer {
		display: block;
		padding: 0.5rem 1.25rem 1.25rem;
	}
	
	.faq-answer p {
		font-family: 'Inter', sans-serif;
		color: #666;
		font-size: clamp(0.85rem, 1.5vw, 0.9rem);
		line-height: 1.5;
		margin: 0;
	}
	
	@media (max-width: 768px) {
		.faq-grid {
			padding: 0;
		}
		
		.faq-question {
			padding: 0.9rem 1rem;
			font-size: 0.95rem;
		}
		
		.faq-item.active .faq-answer {
			padding: 0.9rem 1rem;
		}
	}
	
	@media (max-width: 480px) {
		.faq-question {
			padding: 0.8rem;
			font-size: 0.9rem;
		}
		
		.faq-item.active .faq-answer {
			padding: 0.8rem;
		}
		
		.faq-answer p {
			font-size: 0.85rem;
		}
	}
</style>
