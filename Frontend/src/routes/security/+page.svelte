<script lang="ts">
	// Page content
</script>

<div class="security-container">
	<div class="security-content">
		<h1>Security</h1>
		<p class="subtitle">Your data's security is our top priority</p>

		<section>
			<h2>Data Protection</h2>
			<div class="security-grid">
				<div class="security-card">
					<div class="security-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
							<path
								fill="currentColor"
								d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
							/>
						</svg>
					</div>
					<h3>Encryption</h3>
					<p>
						All data is encrypted in transit and at rest using industry-standard encryption
						protocols.
					</p>
				</div>

				<div class="security-card">
					<div class="security-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
							<path
								fill="currentColor"
								d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
							/>
						</svg>
					</div>
					<h3>Secure Authentication</h3>
					<p>
						We use secure authentication methods and follow best practices for password storage and
						management.
					</p>
				</div>

				<div class="security-card">
					<div class="security-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
							<path
								fill="currentColor"
								d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
							/>
						</svg>
					</div>
					<h3>Regular Backups</h3>
					<p>Your content is regularly backed up to ensure it's always safe and recoverable.</p>
				</div>
			</div>
		</section>

		<section>
			<h2>Our Security Measures</h2>
			<div class="measures-list">
				<div class="measure-item">
					<h3>Infrastructure Security</h3>
					<p>
						We use industry-leading cloud infrastructure providers with robust security measures and
						regular security audits.
					</p>
				</div>

				<div class="measure-item">
					<h3>Access Control</h3>
					<p>
						Strict access controls ensure that only authorized personnel can access your data, and
						all access is logged and monitored.
					</p>
				</div>

				<div class="measure-item">
					<h3>Compliance</h3>
					<p>
						We follow industry best practices and comply with relevant data protection regulations
						to ensure your data is handled responsibly.
					</p>
				</div>

				<div class="measure-item">
					<h3>Security Monitoring</h3>
					<p>
						Our systems are continuously monitored for potential security threats, and we have
						procedures in place to respond to any incidents.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h2>Your Role in Security</h2>
			<p>
				While we take care of the technical aspects of security, there are steps you can take to
				enhance your account's security:
			</p>
			<ul>
				<li>Use a strong, unique password</li>
				<li>Enable two-factor authentication when available</li>
				<li>Keep your login credentials secure</li>
				<li>Be cautious of phishing attempts</li>
			</ul>
		</section>

		<section>
			<h2>Reporting Security Issues</h2>
			<p>If you discover a security vulnerability or have concerns about our security practices</p>
		</section>
	</div>
</div>

<style>
	.security-container {
		max-width: 800px;
		margin: 4rem auto;
		padding: 0 1rem;
	}

	.security-content {
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

	.security-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.security-card {
		background: #fafafa;
		padding: 2rem;
		border-radius: 1rem;
		text-align: center;
	}

	.security-icon {
		color: #7873f5;
		margin-bottom: 1rem;
	}

	.security-card h3 {
		font-family: 'Poppins', sans-serif;
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #000;
	}

	.security-card p {
		font-family: 'Inter', sans-serif;
		color: #666;
		line-height: 1.5;
	}

	.measures-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.measure-item {
		background: #fafafa;
		padding: 1.5rem;
		border-radius: 0.75rem;
	}

	.measure-item h3 {
		font-family: 'Poppins', sans-serif;
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #000;
	}

	.measure-item p {
		font-family: 'Inter', sans-serif;
		color: #666;
		line-height: 1.5;
	}

	ul {
		list-style: none;
		padding-left: 1.5rem;
		margin: 1rem 0;
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

	@media (max-width: 1200px) {
		.security-container {
			padding: 0 2rem;
		}

		.security-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}
	}

	@media (max-width: 768px) {
		.security-container {
			padding: 0 1.5rem;
		}

		.security-content {
			padding: 2rem;
		}

		h1 {
			font-size: 2.5rem;
		}

		h2 {
			font-size: 1.8rem;
		}

		.security-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.security-card {
			padding: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.security-container {
			padding: 0 1rem;
		}

		.security-content {
			padding: 1.5rem;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		.security-card {
			padding: 1rem;
		}
	}

	@media (max-width: 320px) {
		h1 {
			font-size: 1.75rem;
		}

		h2 {
			font-size: 1.3rem;
		}

		.security-content {
			padding: 1rem;
		}
	}
</style>
