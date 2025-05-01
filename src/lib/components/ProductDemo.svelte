<script lang="ts">
</script>

<section class="product-demo">

	<div class="container">
		<h2 class="section-title">See Srible in Action</h2>
		<p class="section-subtitle">
			Experience the simplicity and elegance of our platform
		</p>

		<div class="demo-content">
			<div class="demo-container">
				<div class="demo-placeholder">
					<div class="placeholder-content">
						<div class="demo-features">
							<div class="demo-feature">
								<div
									class="feature-icon"
									style="background: linear-gradient(135deg, #ff6ec4, #7873f5)"
								></div>
								<div class="feature-text">Clean Editor</div>
								<div class="feature-decoration"></div>
							</div>
							<div class="demo-feature">
								<div
									class="feature-icon"
									style="background: linear-gradient(135deg, #7873f5, #42e695)"
								></div>
								<div class="feature-text">One-Click Publishing</div>
								<div class="feature-decoration"></div>
							</div>
							<div class="demo-feature">
								<div
									class="feature-icon"
									style="background: linear-gradient(135deg, #42e695, #ff6ec4)"
								></div>
								<div class="feature-text">Custom Themes</div>
								<div class="feature-decoration"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&display=swap');

	.product-demo {
		padding: clamp(2rem, 5vw, 4rem) 1rem;
		background-color: var(--primary-white);
		position: relative;
		overflow: hidden;
	}

	@keyframes float-blob {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(30px, -30px) scale(1.1);
		}
		50% {
			transform: translate(0, 0) scale(1);
		}
		75% {
			transform: translate(-30px, 30px) scale(0.9);
		}
	}

	.section-title {
		font-family: 'Poppins', sans-serif;
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 700;
		text-align: center;
		color: #000;
		margin-bottom: 0.5rem;
		position: relative;
		z-index: 1;
		background: linear-gradient(90deg, #000, #333);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.section-subtitle {
		font-family: 'Inter', sans-serif;
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		position: relative;
		z-index: 1;
	}

	.demo-content {
		max-width: 1000px;
		margin: 0 auto;
		width: 100%;
		position: relative;
		z-index: 1;
	}

	.demo-container {
		position: relative;
		border-radius: 1rem;
		overflow: hidden;
		border: 1px solid rgba(238, 238, 238, 0.5);
		margin: 0 auto;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
	}

	.demo-container:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
	}

	.demo-placeholder {
		aspect-ratio: 16/9;
		background-color: rgba(248, 248, 245, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		overflow: hidden;
		position: relative;
	}

	.placeholder-content {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #666;
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		padding: 1rem;
	}

	.demo-features {
		display: flex;
		flex-direction: column;
		gap: clamp(0.75rem, 2vw, 1rem);
		padding: clamp(0.75rem, 2vw, 1.5rem);
		width: 100%;
		max-width: 400px;
	}

	.demo-feature {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background-color: rgba(248, 248, 245, 0.8);
		backdrop-filter: blur(10px);
		padding: clamp(0.5rem, 1.5vw, 0.75rem);
		border-radius: 0.75rem;
		border: 1px solid rgba(238, 238, 238, 0.5);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.demo-feature:hover {
		transform: translateX(10px) scale(1.02);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
		border-color: transparent;
	}

	.feature-icon {
		width: clamp(28px, 5vw, 36px);
		height: clamp(28px, 5vw, 36px);
		border-radius: 50%;
		flex-shrink: 0;
		position: relative;
		z-index: 1;
		transition: transform 0.3s ease;
	}

	.demo-feature:hover .feature-icon {
		transform: scale(1.1) rotate(5deg);
	}

	.feature-text {
		font-family: 'Inter', sans-serif;
		font-weight: 500;
		font-size: clamp(0.9rem, 2vw, 1rem);
		color: #000;
		position: relative;
		z-index: 1;
	}

	.feature-decoration {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: linear-gradient(90deg, #ff6ec4, #7873f5, #42e695);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.demo-feature:hover .feature-decoration {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.demo-features {
			padding: 0.75rem;
		}

		.demo-feature {
			padding: 0.5rem;
		}

		.feature-icon {
			width: 28px;
			height: 28px;
		}

	}

	@media (max-width: 480px) {
		.demo-placeholder {
			aspect-ratio: auto;
			min-height: 250px;
		}
	}
</style>
