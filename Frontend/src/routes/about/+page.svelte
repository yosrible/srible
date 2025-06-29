<script lang="ts">
	// Page content
</script>

<div class="about-container">
	<div class="about-content">
		<h1>About Srible</h1>
		<p class="subtitle">A platform for writers, by writers</p>

		<section>
			<h2>Our Story</h2>
			<p>
				Srible was born from a simple idea: to create a blogging platform that puts writers first.
				We believe that the best way to share ideas is through clean, distraction-free writing. Our
				platform is designed to help writers focus on what matters most - their content.
			</p>
		</section>

		<section>
			<h2>Our Mission</h2>
			<p>
				We're on a mission to make blogging accessible to everyone while maintaining high standards
				of quality and user experience. We want to empower writers to share their stories, ideas,
				and knowledge with the world without the complexity of traditional blogging platforms.
			</p>
		</section>

		<section>
			<h2>What Makes Us Different</h2>
			<ul>
				<li>
					<strong>Clean Design:</strong> We focus on typography and readability, ensuring your content
					looks great on any device
				</li>
				<li>
					<strong>Simple Interface:</strong> No complicated settings or overwhelming options - just write
					and publish
				</li>
				<li>
					<strong>Fast Performance:</strong> Our platform is built for speed, so your readers get the
					best experience
				</li>
				<li>
					<strong>Writer-First Approach:</strong> Every feature is designed with writers' needs in mind
				</li>
			</ul>
		</section>

		<section>
			<h2>Our Values</h2>
			<div class="values-grid">
				<div class="value-card">
					<h3>Simplicity</h3>
					<p>We believe in keeping things simple and intuitive</p>
				</div>
				<div class="value-card">
					<h3>Quality</h3>
					<p>We're committed to maintaining high standards in everything we do</p>
				</div>
				<div class="value-card">
					<h3>Accessibility</h3>
					<p>We want to make blogging available to everyone</p>
				</div>
				<div class="value-card">
					<h3>Innovation</h3>
					<p>We're constantly looking for ways to improve the writing experience</p>
				</div>
			</div>
		</section>

		<section>
			<h2>Join Our Journey</h2>
			<p>
				We're just getting started, and we'd love for you to be part of our journey. Join our
				waitlist to be among the first to experience Srible when we launch.
			</p>
			<a href="/signup" class="btn btn-primary">Join Waitlist</a>
		</section>
	</div>
</div>

<style>
	.about-container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.about-content {
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

	.subtitle {
		text-align: center;
		color: #666;
		font-size: 1.2rem;
		margin-bottom: 2rem;
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
		margin-bottom: 1rem;
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

	.values-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.value-card {
		background: #fafafa;
		padding: 1.5rem;
		border-radius: 0.75rem;
		transition: transform 0.3s ease;
	}

	.value-card:hover {
		transform: translateY(-5px);
	}

	.value-card h3 {
		font-family: 'Poppins', sans-serif;
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #000;
	}

	.value-card p {
		font-size: 0.95rem;
		color: #666;
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
		.about-container {
			padding: 0 2rem;
		}
	}

	@media (max-width: 768px) {
		.about-container {
			padding: 0 1.5rem;
		}

		.about-content {
			padding: 2rem;
		}

		h1 {
			font-size: 2.5rem;
		}

		h2 {
			font-size: 1.8rem;
		}

		.values-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		.value-card {
			padding: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.about-container {
			padding: 0 1rem;
		}

		.about-content {
			padding: 1.5rem;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		.value-card {
			padding: 1rem;
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

		.about-content {
			padding: 1rem;
		}
	}
</style>
