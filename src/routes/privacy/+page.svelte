<script lang="ts">
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="privacy-container">
	<div class="privacy-content">
		<h1>Privacy Policy</h1>
		<p class="last-updated">Last updated: March 2024</p>

		<section>
			<h2>1. Introduction</h2>
			<p>
				At Srible, we take your privacy seriously. This Privacy Policy explains how we collect, use,
				and protect your personal information when you use our blogging platform.
			</p>
		</section>

		<section>
			<h2>2. Information We Collect</h2>
			<h3>2.1 Information You Provide</h3>
			<ul>
				<li>Email address</li>
				<li>Account information</li>
				<li>Blog content and settings</li>
				<li>Communication preferences</li>
			</ul>

			<h3>2.2 Automatically Collected Information</h3>
			<ul>
				<li>Device information</li>
				<li>Browser type and version</li>
				<li>IP address</li>
				<li>Usage data and analytics</li>
			</ul>
		</section>

		<section>
			<h2>3. How We Use Your Information</h2>
			<p>We use your information to:</p>
			<ul>
				<li>Provide and maintain our services</li>
				<li>Improve user experience</li>
				<li>Send important updates and notifications</li>
				<li>Analyze platform usage and performance</li>
				<li>Prevent fraud and abuse</li>
			</ul>
		</section>

		<section>
			<h2>4. Data Protection</h2>
			<p>
				We implement appropriate security measures to protect your personal information. This
				includes:
			</p>
			<ul>
				<li>Encryption of data in transit and at rest</li>
				<li>Regular security assessments</li>
				<li>Access controls and authentication</li>
				<li>Secure data storage practices</li>
			</ul>
		</section>

		<section>
			<h2>5. Third-Party Services</h2>
			<p>
				We may use third-party services that collect, monitor, and analyze information to help us
				improve our platform. These services have their own privacy policies.
			</p>
		</section>

		<section>
			<h2>6. Your Rights</h2>
			<p>You have the right to:</p>
			<ul>
				<li>Access your personal information</li>
				<li>Correct inaccurate data</li>
				<li>Request deletion of your data</li>
				<li>Opt-out of marketing communications</li>
				<li>Export your data</li>
			</ul>
		</section>

		<section>
			<h2>7. Cookies</h2>
			<p>
				We use cookies and similar tracking technologies to improve your experience. You can control
				cookie preferences through your browser settings.
			</p>
		</section>

		<section>
			<h2>8. Children's Privacy</h2>
			<p>
				Our service is not intended for children under 13. We do not knowingly collect personal
				information from children under 13.
			</p>
		</section>

		<section>
			<h2>9. Changes to This Policy</h2>
			<p>
				We may update this Privacy Policy from time to time. We will notify you of any changes by
				posting the new Privacy Policy on this page.
			</p>
		</section>

		<section>
			<h2>10. Contact Us</h2>
			<p>
				If you have any questions about this Privacy Policy, please contact us at
				<a href="mailto:privacy@srible.com">privacy@srible.com</a>
			</p>
		</section>
	</div>
</div>

<Footer />

<style>
	.privacy-container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.privacy-content {
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

	h3 {
		font-family: 'Poppins', sans-serif;
		font-size: 1.2rem;
		font-weight: 600;
		margin: 1.5rem 0 1rem 0;
		color: #333;
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
		.privacy-container {
			margin: 1rem auto;
			padding: 0 0.5rem;
		}

		.privacy-content {
			padding: 1.5rem;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.3rem;
		}

		h3 {
			font-size: 1.1rem;
		}
	}
</style>
