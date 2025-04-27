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
			{ text: 'Careers', href: '/careers' },
			{ text: 'Contact', href: '/contact' }
		],
		resources: [
			{ text: 'Help Center', href: '/help' },
			{ text: 'Community', href: '/community' },
			{ text: 'Status', href: '/status' }
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
					<!-- <a
						href="https://github.com/srible"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path
								d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
							/></svg
						>
					</a> -->
					<!-- <a
						href="https://linkedin.com/company/srible"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path
								d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
							/><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg
						>
					</a> -->
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
</style>
