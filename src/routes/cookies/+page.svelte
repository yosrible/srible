<script lang="ts">
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="cookies-container">
	<div class="cookies-content">
		<h1>Cookie Policy</h1>
		<p class="last-updated">Last updated: March 2024</p>

		<section>
			<h2>1. Local Storage Usage</h2>
			<p>
				We use browser local storage to store your theme preference (light/dark mode) for a better
				user experience. This data is stored locally on your device and is not sent to our servers.
			</p>
		</section>

		<section>
			<h2>2. Managing Local Storage</h2>
			<p>
				You can clear your local storage data at any time through your browser settings. This will
				reset your theme preference to the default setting.
			</p>
			<p>To manage local storage in your browser:</p>
			<ul>
				<li>Chrome: Settings → Privacy and security → Clear browsing data</li>
				<li>Firefox: Options → Privacy & Security → Clear Data</li>
				<li>Safari: Preferences → Privacy → Manage Website Data</li>
				<li>Edge: Settings → Privacy, search, and services → Clear browsing data</li>
			</ul>
		</section>

		<section>
			<h2>3. Changes to This Policy</h2>
			<p>
				We may update this policy from time to time. We will notify you of any changes by posting
				the new policy on this page.
			</p>
		</section>

		<section>
			<!-- <h2>4. Contact Us</h2>
			<p>
				If you have any questions about our data storage practices, please contact us at
				<a href="mailto:privacy@srible.com">privacy@srible.com</a>
			</p> -->
		</section>
	</div>
</div>

<Footer />

<style>
	.cookies-container {
		max-width: 800px;
		margin: 4rem auto;
		padding: 0 1rem;
	}

	.cookies-content {
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
		.cookies-container {
			margin: 2rem auto;
			padding: 0 0.5rem;
		}

		.cookies-content {
			padding: 2rem;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.3rem;
		}
	}
</style>
