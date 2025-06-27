<script lang="ts">
	import SectionTitle from './ui/SectionTitle.svelte';
	
	const features = [
		{
			title: 'Beautiful Writing',
			description: 'A distraction-free writing environment with markdown support and real-time preview.'
		},
		{
			title: 'Custom Themes',
			description: 'Personalize your writing space with light and dark themes.'
		},
		{
			title: 'Analytics',
			description: 'Track your content\'s performance with detailed metrics.'
		},
		{
			title: 'Instant Publishing',
			description: 'Publish and share your content with one click.'
		},
		{
			title: 'Secure & Private',
			description: 'Enterprise-grade security for your content.'
		},
		{
			title: 'Fully Responsive',
			description: 'Works on all devices, anywhere, anytime.'
		}
	];
</script>

<section class="product-demo scroll-animate">
	<div class="container">
		<SectionTitle 
		title="See Srible in Action"
		subtitle="Experience the simplicity and power of our platform with these key features"
	/>

		<div class="features-grid">
			{#each features as feature}
				<div class="feature-card">
					<h3 class="card-title">{feature.title}</h3>
					<p class="card-description">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@700&display=swap');

	:global(:root) {
		--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
		--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
	}

	.product-demo {
		padding: clamp(2.5rem, 6vw, 5rem) 1rem;
		background-color: #ffffff;
		will-change: transform;
	}

	.container {
		max-width: min(1200px, 95%);
		margin: 0 auto;
		padding: 0 1.25rem;
	}



	@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.features-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
	gap: clamp(1.25rem, 3vw, 2rem);
	margin-top: clamp(1.5rem, 4vw, 3rem);
	will-change: transform;
}

	.feature-card {
	background: #ffffff;
	border-radius: 1rem;
	padding: clamp(1.5rem, 3vw, 2rem);
	box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02);
	transition: all 0.4s var(--ease-out-expo), transform 0.3s var(--ease-out-quart);
	border: 1px solid rgba(229, 231, 235, 0.8);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	will-change: transform, box-shadow, border-color;
	animation: fadeInUp 0.6s var(--ease-out-quart) both;
	position: relative;
	overflow: hidden;
}

.feature-card::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 3px;
	background: linear-gradient(90deg, #6366f1, #8b5cf6);
	transform: scaleX(0);
	transform-origin: left;
	transition: transform 0.6s var(--ease-out-expo);
}

.feature-card:hover {
	transform: translateY(-6px) scale(1.01);
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
	border-color: rgba(199, 210, 254, 0.5);
}

.feature-card:hover::before {
	transform: scaleX(1);
}

/* Stagger animations */
.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }
.feature-card:nth-child(4) { animation-delay: 0.4s; }
.feature-card:nth-child(5) { animation-delay: 0.5s; }
.feature-card:nth-child(6) { animation-delay: 0.6s; }

	.card-title {
	font-family: 'Inter', sans-serif;
	font-size: clamp(1.125rem, 4vw, 1.25rem);
	font-weight: 600;
	color: #111827;
	margin: 0 0 0.75rem 0;
	line-height: 1.3;
	transition: color 0.3s ease;
}

.card-description {
	font-family: 'Inter', sans-serif;
	font-size: clamp(0.9375rem, 3.5vw, 0.95rem);
	line-height: 1.7;
	color: #4b5563;
	margin: 0;
	opacity: 0.9;
	transition: opacity 0.3s ease;
}

/* Touch devices optimization */
@media (hover: none) {
	.feature-card {
		transition: none;
	}
	
	.feature-card:active {
		transform: scale(0.98);
	}
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
	.feature-card,
	.feature-card::before {
		transition: none;
		animation: none;
	}
}

	.demo-content {
		max-width: 1000px;
		margin: 0 auto;
		width: 100%;
		position: relative;
		z-index: 1;
	}

	.demo-tabs {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.tab-button {
		font-family: 'Inter', sans-serif;
		background: none;
		border: 1px solid #eee;
		border-radius: 0.5rem;
		padding: 0.6rem 1rem;
		color: #666;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 0.95rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		white-space: nowrap;
	}

	.tab-button:hover {
		background: rgba(248, 248, 245, 0.8);
		border-color: #ddd;
		color: #333;
	}

	.tab-button.active {
		background: linear-gradient(90deg, rgba(255, 110, 196, 0.1), rgba(120, 115, 245, 0.1));
		border-color: rgba(120, 115, 245, 0.3);
		color: #000;
		font-weight: 500;
	}

	.tab-icon {
		font-size: 1.1rem;
	}

	.demo-container {
		position: relative;
		border-radius: 1rem;
		overflow: hidden;
		border: 1px solid rgba(238, 238, 238, 0.7);
		margin: 0 auto;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
		transition: all 0.5s ease;
		transform: translateY(20px);
		opacity: 0.5;
	}

	.demo-container.in-view {
		transform: translateY(0);
		opacity: 1;
	}

	.demo-container:hover {
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
	}

	.demo-tab-content {
		display: none;
	}

	.demo-tab-content.active {
		display: block;
	}

	.mockup-container {
		aspect-ratio: 16/9;
		max-height: 600px;
		overflow: hidden;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.mockup-header {
		background-color: #f5f5f5;
		padding: 0.6rem 1rem;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	.mockup-controls {
		display: flex;
		gap: 0.4rem;
		margin-right: 1rem;
	}

	.control-dot {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
	}

	.mockup-title {
		font-family: 'Inter', sans-serif;
		font-size: 0.85rem;
		color: #666;
		flex: 1;
		text-align: center;
	}

	.mockup-content {
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
		background-color: #fff;
		font-family: 'Inter', sans-serif;
	}

	.editor-toolbar {
		display: flex;
		gap: 0.6rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #eee;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.toolbar-item {
		font-size: 0.9rem;
		font-weight: 500;
		color: #555;
		padding: 0.3rem 0.5rem;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.toolbar-item:hover {
		background-color: #f5f5f5;
		color: #333;
	}

	.toolbar-separator {
		width: 1px;
		height: 1.5rem;
		background-color: #eee;
		margin: 0 0.4rem;
	}

	.editor-area {
		padding-bottom: 1.5rem;
	}

	.editor-title {
		font-size: 1.8rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 1.2rem;
		line-height: 1.3;
	}

	.editor-paragraph {
		font-size: 1rem;
		color: #555;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.editor-list {
		margin-left: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.editor-list-item {
		font-size: 1rem;
		color: #555;
		line-height: 1.6;
		margin-bottom: 0.5rem;
	}

	.publish-button {
		text-align: right;
	}

	.publish-button button {
		background: linear-gradient(90deg, #ff6ec4, #7873f5);
		border: none;
		color: white;
		padding: 0.6rem 1.2rem;
		border-radius: 0.3rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.publish-button button:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(255, 110, 196, 0.2);
	}

	.preview-content {
		padding: 2rem;
	}

	.blog-header {
		margin-bottom: 2rem;
		text-align: center;
	}

	.blog-title {
		font-size: 2.2rem;
		font-weight: 700;
		color: #333;
		margin-bottom: 1rem;
		line-height: 1.2;
	}

	.blog-meta {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		font-size: 0.9rem;
		color: #888;
	}

	.blog-body {
		max-width: 700px;
		margin: 0 auto;
	}

	.blog-paragraph {
		font-size: 1.1rem;
		color: #444;
		line-height: 1.7;
		margin-bottom: 1.5rem;
	}

	.blog-list {
		margin-left: 2rem;
		margin-bottom: 2rem;
	}

	.blog-list-item {
		font-size: 1.1rem;
		color: #444;
		line-height: 1.7;
		margin-bottom: 0.7rem;
	}

	.analytics-content {
		padding: 1.5rem;
	}

	.analytics-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.analytics-title {
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.analytics-filters {
		display: flex;
		gap: 0.8rem;
	}

	.analytics-filters span {
		font-size: 0.9rem;
		color: #888;
		cursor: pointer;
		padding: 0.2rem 0.4rem;
		border-radius: 0.2rem;
		transition: all 0.2s ease;
	}

	.analytics-filters span:hover {
		color: #666;
	}

	.analytics-filters .filter-active {
		color: #7873f5;
		font-weight: 500;
		background-color: rgba(120, 115, 245, 0.1);
	}

	.analytics-metrics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.metric-card {
		padding: 1rem;
		background-color: #f8f8f5;
		border-radius: 0.5rem;
		text-align: center;
	}

	.metric-value {
		font-size: 1.8rem;
		font-weight: 700;
		color: #333;
		margin-bottom: 0.4rem;
	}

	.metric-label {
		font-size: 0.85rem;
		color: #888;
	}

	.analytics-chart {
		margin-top: 1.5rem;
		height: 200px;
		display: flex;
		flex-direction: column;
	}

	.chart-bars {
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.chart-bar {
		flex: 1;
		background: linear-gradient(to top, #7873f5, #ff6ec4);
		border-radius: 3px 3px 0 0;
		transition: height 0.5s ease;
	}

	.chart-labels {
		display: flex;
		justify-content: space-between;
		font-size: 0.8rem;
		color: #888;
	}

	@media (max-width: 768px) {
		.mockup-container {
			aspect-ratio: auto;
			height: 500px;
		}
		
		.tab-button {
			font-size: 0.85rem;
			padding: 0.5rem 0.8rem;
		}
		
		.editor-title, .blog-title {
			font-size: 1.6rem;
		}
		
		.analytics-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.8rem;
		}
		
		.analytics-metrics {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		}
	}

	@media (max-width: 480px) {
		.mockup-container {
			height: 450px;
		}
		
		.mockup-content {
			padding: 1rem;
		}
		
		.preview-content, .analytics-content {
			padding: 1rem;
		}
		
		.metric-value {
			font-size: 1.5rem;
		}
		
		.chart-labels span {
			font-size: 0.7rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 40px;
		}
	}
</style>
