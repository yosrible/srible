<script lang="ts">
  import SectionTitle from './ui/SectionTitle.svelte';

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
		}
	];

	function toggleAnswer(index: number) {
		activeIndex = activeIndex === index ? -1 : index;
	}
</script>

<section class="faq scroll-animate" id="faq">
	<div class="container">
		<SectionTitle 
      title="Frequently Asked Questions"
      subtitle="Quick answers to common questions about Srible."
    />

		<div class="faq-grid">
			{#each faqs as faq, i}
				<div class="faq-item" class:active={activeIndex === i}>
					<button class="faq-question" on:click|preventDefault={() => toggleAnswer(i)}>
						<span>{faq.question}</span>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
	
	* {
		font-family: 'Inter', sans-serif;
	}
	
	.faq {
		padding: 3rem 1rem;
		background-color: #fff;
	}

	h2 {
		text-align: center;
		font-size: 2rem;
		margin: 0 0 1rem;
		color: #1a1a1a;
		font-weight: 600;
	}

	.subtitle {
		text-align: center;
		color: #666;
		margin: 0 auto 2rem;
		max-width: 600px;
	}

	.faq-grid {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: 800px;
		margin: 0 auto;
	}
	
	.faq-item {
		border: 1px solid #eaeaea;
		border-radius: 8px;
		overflow: hidden;
		transition: all 0.2s ease;
	}
	
	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1rem 1.25rem;
		border: none;
		background: none;
		text-align: left;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 600;
		color: #333;
	}
	
	.faq-question:hover {
		background-color: #f8f8f8;
	}
	
	.faq-item.active .faq-question {
		background-color: #f8f8f8;
	}
	
	.faq-item svg {
		transition: transform 0.2s ease;
	}
	
	.faq-item.active svg {
		transform: rotate(180deg);
	}
	
	.faq-answer {
		display: none;
		padding: 0 1.25rem 1.25rem;
	}
	
	.faq-item.active .faq-answer {
		display: block;
	}
	
	.faq-answer p {
		margin: 0;
		color: #666;
		line-height: 1.6;
	}
	
	@media (max-width: 768px) {
		.faq {
			padding: 2rem 1rem;
		}
		
		h2 {
			font-size: 1.75rem;
		}
	}
</style>
