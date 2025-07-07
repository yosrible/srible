<script lang="ts">
	// Page content
</script>

<div class="community-container">
	<div class="community-content">
		<h1>Join Our Community</h1>
		<p class="subtitle">Connect with other writers and stay updated on Srible's development</p>

		<div class="social-grid">
			<a
				href="https://twitter.com/srible"
				target="_blank"
				rel="noopener noreferrer"
				class="social-card"
			>
				<div class="social-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<path
							fill="currentColor"
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						/>
					</svg>
				</div>
				<h2>Follow us on X</h2>
				<p>Get the latest updates, announcements, and writing tips</p>
				<span class="social-handle">@yosrible</span>
			</a>

			<a
				href="https://discord.gg/Q8y4VAThFm"
				target="_blank"
				rel="noopener noreferrer"
				class="social-card"
			>
				<div class="social-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<path
							fill="currentColor"
							d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
						/>
					</svg>
				</div>
				<h2>Join our Discord</h2>
				<p>Connect with other writers, share ideas, and get support</p>
				<span class="social-handle">discord.gg/Q8y4VAThFm</span>
			</a>
		</div>

		<div class="community-cta">
			<p>Want to be the first to know when we launch?</p>
			<a href="/signup" class="btn btn-primary">Join Waitlist</a>
		</div>
	</div>
</div>

<style>
	.community-container {
		max-width: 800px;
		margin: 4rem auto;
		padding: 0 1rem;
	}

	.community-content {
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

	.social-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2.5rem;
		margin: 3rem 0;
	}

	.social-card {
		background: #fff;
		border-radius: 12px;
		padding: 2rem;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		border: 1px solid #eee;
	}

	.social-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
	}

	.social-icon {
		width: 48px;
		height: 48px;
		margin-bottom: 1.5rem;
		color: #7873f5;
	}

	.social-card h2 {
		font-family: 'Poppins', sans-serif;
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #000;
	}

	.social-card p {
		font-family: 'Inter', sans-serif;
		color: #666;
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.social-handle {
		font-family: 'Inter', sans-serif;
		font-weight: 500;
		color: #7873f5;
		margin-top: auto;
	}

	.community-cta {
		text-align: center;
		margin-top: 2rem;
	}

	.community-cta p {
		font-family: 'Inter', sans-serif;
		color: #666;
		margin-bottom: 1rem;
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

	@media (max-width: 1200px) {
		.community-container {
			padding: 0 2rem;
		}

		.social-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}
	}

	@media (max-width: 768px) {
		.community-container {
			padding: 0 1.5rem;
		}

		.community-content {
			padding: 2rem;
		}

		h1 {
			font-size: 2.5rem;
		}

		h2 {
			font-size: 1.8rem;
		}

		.social-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}


	}

	@media (max-width: 480px) {
		.community-container {
			padding: 0 1rem;
		}

		.community-content {
			padding: 1.5rem;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		.btn {
			width: 100%;
			justify-content: center;
		}
	}

	@media (max-width: 320px) {
		h1 {
			font-size: 1.75rem;
		}

		h2 {
			font-size: 1.3rem;
		}

		.community-content {
			padding: 1rem;
		}
	}
</style>
