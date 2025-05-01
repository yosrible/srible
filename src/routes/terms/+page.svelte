<script lang="ts">
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="terms-container">
	<div class="terms-content">
		<h1>Terms and Conditions</h1>
		<p class="last-updated">Last updated: March 2024</p>

		<section>
			<h2>1. Introduction</h2>
			<p>
				Welcome to Srible. These Terms and Conditions govern your use of our blogging platform and
				services. By accessing or using Srible, you agree to be bound by these Terms.
			</p>
		</section>

		<section>
			<h2>2. Definitions</h2>
			<ul>
				<li>"Platform" refers to the Srible website and services</li>
				<li>"User" refers to any individual or entity using the Platform</li>
				<li>"Content" refers to any text, images, or other materials posted on the Platform</li>
				<li>"Service" refers to the blogging and content creation features provided by Srible</li>
			</ul>
		</section>

		<section>
			<h2>3. User Accounts</h2>
			<p>To use Srible, you must:</p>
			<ul>
				<li>Be at least 13 years of age</li>
				<li>Provide accurate and complete information</li>
				<li>Maintain the security of your account</li>
				<li>Not share your account credentials</li>
			</ul>
		</section>

		<section>
			<h2>4. Content Guidelines</h2>
			<p>Users agree not to post content that:</p>
			<ul>
				<li>Is illegal, harmful, or promotes illegal activities</li>
				<li>Contains hate speech or discrimination</li>
				<li>Infringes on intellectual property rights</li>
				<li>Contains malware or malicious code</li>
				<li>Is spam or promotes commercial activities without permission</li>
			</ul>
		</section>

		<section>
			<h2>5. Intellectual Property</h2>
			<p>
				Users retain ownership of their content. By posting on Srible, you grant us a license to
				display and distribute your content through our Platform.
			</p>
		</section>

		<section>
			<h2>6. Privacy</h2>
			<p>
				Your privacy is important to us. Our Privacy Policy explains how we collect, use, and
				protect your information.
			</p>
		</section>

		<section>
			<h2>7. Service Modifications</h2>
			<p>
				We reserve the right to modify or discontinue any part of the Service at any time. We will
				provide notice of significant changes.
			</p>
		</section>

		<section>
			<h2>8. Limitation of Liability</h2>
			<p>
				Srible is provided "as is" without warranties of any kind. We are not liable for any damages
				arising from your use of the Platform.
			</p>
		</section>

		<section>
			<h2>9. Termination</h2>
			<p>
				We may terminate or suspend your account for violations of these Terms. You may terminate
				your account at any time.
			</p>
		</section>

		<section>
			<h2>10. Changes to Terms</h2>
			<p>
				We may update these Terms from time to time. Continued use of the Platform after changes
				constitutes acceptance of the new Terms.
			</p>
		</section>

		<!-- <section>
			<h2>11. Contact</h2>
			<p>
				For questions about these Terms, please contact us at
				<a href="mailto:legal@srible.com">legal@srible.com</a>
			</p>
		</section> -->
	</div>
</div>

<Footer />

<style>
	.terms-container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.terms-content {
		background: #fff;
		padding: 2rem;
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

	.last-updated {
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
	}

	section {
		margin-bottom: 2rem;
	}

	h2 {
		font-family: 'Poppins', sans-serif;
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #000;
	}

	p {
		font-family: 'Inter', sans-serif;
		line-height: 1.6;
		color: #333;
		margin-bottom: 1rem;
	}

	ul {
		list-style: none;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
	}

	li {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 0.5rem;
		font-family: 'Inter', sans-serif;
		line-height: 1.6;
		color: #333;
	}

	li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: #7873f5;
	}

	a {
		color: #7873f5;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	a:hover {
		color: #ff6ec4;
	}

	@media (max-width: 768px) {
		.terms-container {
			margin: 1rem auto;
			padding: 0 0.5rem;
		}

		.terms-content {
			padding: 1.5rem;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.3rem;
		}
	}
</style>
