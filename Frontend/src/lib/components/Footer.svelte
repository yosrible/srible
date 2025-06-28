<script>
	const currentYear = new Date().getFullYear();

	const footerLinks = [
		{ text: 'FAQ', href: '#faq' },
		{ text: 'Docs', href: '/docs' },
		{ text: 'Privacy', href: '/privacy' },
		{ text: 'About', href: '/about' },
		{ text: 'Community', href: '/community' },
		{ text: 'Blog', href: '/blog' },
		{ text: 'Security', href: '/security' }
	];
</script>

<footer>
	<div class="container">
		<div class="footer-content">
			<div class="footer-left">
				<a href="/" class="logo">
					<span class="logo-text">Srible</span>
				</a>
				<div class="social-links">
					<a
						href="https://x.com/yosrible"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="X (Twitter)"
						class="x-logo"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
							stroke="none"
							><path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/></svg
						>
					</a>
					<a
						href="https://github.com/yosrible/srible"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
							<path
								fill="currentColor"
								d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475 0-.237-.012-1.025-.012-1.862-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.186-.85-.65-.013-.663a2.001 2.001 0 0 1 1.537 1.025 2.137 2.137 0 0 0 2.912.825 2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.89 3.89 0 0 1 1.025-2.688 3.672 3.672 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.913-1.3 2.75-1.025 2.75-1.025.37.837.4 1.788.1 2.65a3.86 3.86 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.373 2.373 0 0 1 .7 1.85c0 1.338-.012 2.413-.012 2.75 0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247z"
							/>
						</svg>
					</a>
					<a
						href="https://discord.gg/Q8y4VAThFm"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Discord"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
							<path
								fill="currentColor"
								d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<div class="footer-links">
				{#each footerLinks as link}
					<a href={link.href}>{link.text}</a>
				{/each}
			</div>
		</div>

		<p class="copyright">&copy; {currentYear} Srible</p>
	</div>
</footer>

<style>
	footer {
		background-color: var(--primary-white);
		padding: 1.5rem 0 1rem;
		border-top: 1px solid var(--gray-medium);
		font-size: 0.9rem;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.footer-left {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.logo {
		text-decoration: none;
		font-size: 1.25rem;
		font-weight: 700;
		display: inline-block;
	}

	.logo-text {
		color: var(--primary-black);
		font-weight: 700;
		font-family: 'Space Grotesk', sans-serif;
		background: linear-gradient(90deg, #000, #333);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.social-links {
		display: flex;
		gap: 0.75rem;
	}

	.social-links a,
	.x-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
	}

	.social-links a svg {
		width: 20px;
		height: 20px;
	}

	.social-links a {
		color: var(--text-secondary);
		transition: color 0.3s ease;
	}

	.social-links a:hover {
		color: var(--primary-black);
	}

	.footer-links {
		display: flex;
		gap: 1.25rem;
	}

	.footer-links a {
		color: var(--gray-dark);
		text-decoration: none;
		transition: color 0.3s ease;
		font-size: 0.85rem;
	}

	.footer-links a:hover {
		color: var(--primary-black);
	}

	.copyright {
		text-align: center;
		color: var(--gray-dark);
		font-size: 0.8rem;
		margin: 0;
	}

	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			gap: 1rem;
			align-items: center;
			text-align: center;
		}

		.footer-left {
			flex-direction: column;
			gap: 0.75rem;
		}

		.footer-links {
			flex-wrap: wrap;
			justify-content: center;
			gap: 1rem 1.25rem;
		}
	}

	@media (max-width: 480px) {
		footer {
			padding: 1.25rem 0 0.75rem;
		}

		.footer-links {
			gap: 0.75rem 1rem;
		}

		.footer-links a {
			font-size: 0.8rem;
		}
	}
</style>
