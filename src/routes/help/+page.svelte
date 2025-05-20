<script lang="ts">
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="help-container">
	<div class="help-content">
		<h1>Help Center</h1>
		<p class="subtitle">Get support and connect with our community</p>

		<section>
			<h2>Join Our Discord Community</h2>
			<div class="support-card">
				<div class="support-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
						<path
							fill="currentColor"
							d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
						/>
					</svg>
				</div>
				<div class="support-info">
					<h3>Discord Server</h3>
					<p>
						Join our Discord community to get help, share ideas, and connect with other writers.
					</p>
					<a
						href="https://discord.gg/Q8y4VAThFm"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-primary">Join Discord</a
					>
				</div>
			</div>
		</section>

		<section>
			<h2>Frequently Asked Questions</h2>
			<div class="faq-grid">
				<div class="faq-item">
					<h3>When will Srible launch?</h3>
					<p>
						We're currently in development and will be launching soon. Join our waitlist to be
						notified when we go live.
					</p>
				</div>
				<div class="faq-item">
					<h3>What features will be available?</h3>
					<p>
						We're building a clean, distraction-free blogging platform with essential features for
						writers.
					</p>
				</div>
				<div class="faq-item">
					<h3>How can I get early access?</h3>
					<p>
						Join our waitlist and follow us on social media for updates on early access
						opportunities.
					</p>
				</div>
				<div class="faq-item">
					<h3>Will there be a free plan?</h3>
					<p>
						Yes, we'll offer a free plan with basic features to help you get started with blogging.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h2>Still Need Help?</h2>
			<p>
				If you can't find what you're looking for, our Discord community is the best place to get
				support. Join us and ask your questions there!
			</p>
		</section>
	</div>
</div>

<Footer />

<style>
	.help-container {
		max-width: 800px;
		margin: 4rem auto;
		padding: 0 1rem;
	}

	.help-content {
		background: #fff;
		padding: 3rem;
		border-radius: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
	}

	h1 {
		font-family: 'Poppins', sans-serif;
		font-size: 2.5rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 0.5rem;
		background: linear-gradient(90deg, #000, #333);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.subtitle {
		text-align: center;
		color: #666;
		font-size: 1.2rem;
		margin-bottom: 3rem;
		font-family: 'Inter', sans-serif;
	}

	section {
		margin-bottom: 3rem;
	}

	h2 {
		font-family: 'Poppins', sans-serif;
		font-size: 1.8rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		color: #000;
	}

	.support-card {
		display: flex;
		align-items: center;
		gap: 2rem;
		background: #fafafa;
		padding: 2rem;
		border-radius: 1rem;
	}

	.support-icon {
		color: #7873f5;
	}

	.support-info {
		flex: 1;
	}

	.support-info h3 {
		font-family: 'Poppins', sans-serif;
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #000;
	}

	.support-info p {
		font-family: 'Inter', sans-serif;
		color: #666;
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.faq-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.faq-item {
		background: #fafafa;
		padding: 1.5rem;
		border-radius: 0.75rem;
	}

	.faq-item h3 {
		font-family: 'Poppins', sans-serif;
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #000;
	}

	.faq-item p {
		font-family: 'Inter', sans-serif;
		color: #666;
		line-height: 1.5;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.3s ease;
		cursor: pointer;
		border: none;
		background: linear-gradient(90deg, #ff6ec4, #7873f5);
		color: white;
	}

	.btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(120, 115, 245, 0.3);
	}

	p {
		font-family: 'Inter', sans-serif;
		line-height: 1.6;
		color: #333;
		margin-bottom: 1rem;
	}

	@media (max-width: 768px) {
		.help-container {
			margin: 2rem auto;
			padding: 0 0.5rem;
		}

		.help-content {
			padding: 2rem;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		.support-card {
			flex-direction: column;
			text-align: center;
		}

		.faq-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
