<script>
	const currentYear = new Date().getFullYear();

	const footerLinks = {
		product: [
			{ text: 'Why Srible?', href: '#why' },
			{ text: 'Pricing', href: '#pricing' },
			{ text: 'Documentation', href: '/docs' }
		],
		company: [
			{ text: 'About', href: '/about' },
			{ text: 'Blog', href: '/blog' },
			{ text: 'Contact', href: '/contact' }
		],
		resources: [
			{ text: 'Help Center', href: '/help' },
			{ text: 'Community', href: '/community' }
		],
		legal: [
			{ text: 'Privacy', href: '/privacy' },
			{ text: 'Terms', href: '/terms' },
			{ text: 'Security', href: '/security' },
			{ text: 'Cookies', href: '/cookies' }
		]
	};
</script>

<footer>
	<div class="container">
		<div class="footer-content">
			<div class="footer-brand">
				<a href="/" class="logo">
					<span class="logo-text">Srible</span>
					<span class="logo-dot dot-1"></span>
					<span class="logo-dot dot-2"></span>
					<span class="logo-dot dot-3"></span>
				</a>
				<p class="tagline">Create beautiful blogs with ease</p>
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
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor"
							stroke="none"
							stroke-width="0"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/></svg
						>
					</a>
					<a
						href="https://discord.gg/Q8y4VAThFm"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Discord"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
							<path
								fill="currentColor"
								d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
							/></svg
						>
					</a>
				</div>
			</div>

			<div class="footer-links">
				{#each Object.entries(footerLinks) as [category, links]}
					<div class="link-group">
						<h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
						<ul>
							{#each links as link}
								<li>
									<a href={link.href}>{link.text}</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; {currentYear} Srible. All rights reserved.</p>
			<div class="footer-bottom-links">
				<a href="/privacy">Privacy Policy</a>
				<span class="separator">·</span>
				<a href="/terms">Terms of Service</a>
				<span class="separator">·</span>
				<a href="/cookies">Cookie Policy</a>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--primary-white);
		padding: 4rem 0 2rem;
		border-top: 1px solid var(--border-color);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.footer-content {
		display: grid;
		grid-template-columns: 1.5fr 2fr;
		gap: 4rem;
		margin-bottom: 3rem;
	}

	.footer-brand {
		max-width: 320px;
	}

	.logo {
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		display: inline-block;
		position: relative;
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

	.logo-dot {
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		opacity: 0.8;
		animation: float-dot 3s infinite ease-in-out;
	}

	.dot-1 {
		top: -5px;
		right: -10px;
		background: #ff6ec4;
		animation-delay: 0s;
	}

	.dot-2 {
		bottom: -3px;
		left: -8px;
		background: #7873f5;
		animation-delay: -1s;
	}

	.dot-3 {
		top: 50%;
		right: -15px;
		background: #42e695;
		animation-delay: -2s;
	}

	@keyframes float-dot {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(3px, -3px);
		}
	}

	.tagline {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-links a {
		color: var(--text-secondary);
		transition: color 0.3s ease;
	}

	.social-links a:hover {
		color: var(--primary-black);
	}

	.x-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
	}

	.footer-links {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
	}

	.link-group h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: var(--primary-black);
	}

	.link-group ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.link-group li {
		margin-bottom: 0.5rem;
	}

	.link-group a {
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.link-group a:hover {
		color: var(--primary-black);
	}

	.footer-bottom {
		padding-top: 2rem;
		border-top: 1px solid var(--border-color);
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--text-secondary);
	}

	.footer-bottom-links {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.footer-bottom-links a {
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.footer-bottom-links a:hover {
		color: var(--primary-black);
	}

	.separator {
		color: var(--text-secondary);
	}

	@media (max-width: 1024px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.footer-links {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		footer {
			padding: 3rem 0 1.5rem;
		}

		.footer-links {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.footer-bottom {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
	}

	@media (max-width: 1200px) {
		.footer-container {
			padding: 0 2rem;
		}
	}

	@media (max-width: 768px) {
		.footer-container {
			padding: 0 1.5rem;
		}

		.footer-content {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}

		.footer-bottom {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
	}

	@media (max-width: 480px) {
		.footer-container {
			padding: 0 1rem;
		}

		.footer-content {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.footer-section h3 {
			font-size: 1.1rem;
		}

		.footer-section a {
			font-size: 0.9rem;
		}

		.social-links {
			gap: 1rem;
		}

		.social-links a {
			width: 2rem;
			height: 2rem;
		}
	}

	@media (max-width: 320px) {
		.footer-section h3 {
			font-size: 1rem;
		}

		.footer-section a {
			font-size: 0.85rem;
		}

		.social-links {
			gap: 0.75rem;
		}

		.social-links a {
			width: 1.75rem;
			height: 1.75rem;
		}
	}
</style>
