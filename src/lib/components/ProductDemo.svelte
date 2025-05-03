<script lang="ts">
	import { onMount } from 'svelte';
	
	let activeTab = 'editor';
	let isInView = false;
	let demoSection: HTMLElement;
	
	function setActiveTab(tab: string) {
		activeTab = tab;
	}
	
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					isInView = true;
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 });
		
		if (demoSection) {
			observer.observe(demoSection);
		}
		
		return () => {
			if (demoSection) observer.unobserve(demoSection);
		};
	});
</script>

<section class="product-demo" bind:this={demoSection}>
	<div class="container">
		<h2 class="section-title">See Srible in Action</h2>
		<p class="section-subtitle">
			Experience the simplicity and elegance of our platform
		</p>

		<div class="demo-content">
			<div class="demo-tabs">
				<button 
					class="tab-button {activeTab === 'editor' ? 'active' : ''}"
					on:click={() => setActiveTab('editor')}
				>
					<span class="tab-icon">✍️</span>
					Editor
				</button>
				<button 
					class="tab-button {activeTab === 'preview' ? 'active' : ''}"
					on:click={() => setActiveTab('preview')}
				>
					<span class="tab-icon">👁️</span>
					Preview
				</button>
				<button 
					class="tab-button {activeTab === 'analytics' ? 'active' : ''}"
					on:click={() => setActiveTab('analytics')}
				>
					<span class="tab-icon">📊</span>
					Analytics
				</button>
			</div>
			
			<div class="demo-container {isInView ? 'in-view' : ''}">
				<!-- Editor Tab -->
				<div class="demo-tab-content {activeTab === 'editor' ? 'active' : ''}">
					<div class="mockup-container">
						<div class="mockup-header">
							<div class="mockup-controls">
								<span class="control-dot" style="background: #FF6EC4"></span>
								<span class="control-dot" style="background: #7873F5"></span>
								<span class="control-dot" style="background: #42E695"></span>
							</div>
							<div class="mockup-title">Untitled Post - Srible Editor</div>
						</div>
						<div class="mockup-content">
							<div class="editor-toolbar">
								<span class="toolbar-item">B</span>
								<span class="toolbar-item"><i>I</i></span>
								<span class="toolbar-item"><u>U</u></span>
								<span class="toolbar-separator"></span>
								<span class="toolbar-item">H1</span>
								<span class="toolbar-item">H2</span>
								<span class="toolbar-separator"></span>
								<span class="toolbar-item">🔗</span>
								<span class="toolbar-item">📷</span>
							</div>
							<div class="editor-area">
								<h1 class="editor-title">My Thoughts on Minimalism</h1>
								<p class="editor-paragraph">The essence of minimalism isn't about having less, but about making room for more of what matters. In an era of constant distraction, focusing on the essential allows us to create space for what truly matters.</p>
								<p class="editor-paragraph">Below are three principles that guide my minimal approach to design and living:</p>
								<ul class="editor-list">
									<li class="editor-list-item">Intentionality in every choice</li>
									<li class="editor-list-item">Quality over quantity</li>
									<li class="editor-list-item">Focus on functionality</li>
								</ul>
							</div>
							<div class="publish-button">
								<button>Publish</button>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Preview Tab -->
				<div class="demo-tab-content {activeTab === 'preview' ? 'active' : ''}">
					<div class="mockup-container">
						<div class="mockup-header">
							<div class="mockup-controls">
								<span class="control-dot" style="background: #FF6EC4"></span>
								<span class="control-dot" style="background: #7873F5"></span>
								<span class="control-dot" style="background: #42E695"></span>
							</div>
							<div class="mockup-title">My Thoughts on Minimalism - Published Blog</div>
						</div>
						<div class="mockup-content preview-content">
							<div class="blog-header">
								<h1 class="blog-title">My Thoughts on Minimalism</h1>
								<div class="blog-meta">
									<span class="blog-author">By Alex Doe</span>
									<span class="blog-date">May 3, 2025</span>
								</div>
							</div>
							<div class="blog-body">
								<p class="blog-paragraph">The essence of minimalism isn't about having less, but about making room for more of what matters. In an era of constant distraction, focusing on the essential allows us to create space for what truly matters.</p>
								<p class="blog-paragraph">Below are three principles that guide my minimal approach to design and living:</p>
								<ul class="blog-list">
									<li class="blog-list-item">Intentionality in every choice</li>
									<li class="blog-list-item">Quality over quantity</li>
									<li class="blog-list-item">Focus on functionality</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Analytics Tab -->
				<div class="demo-tab-content {activeTab === 'analytics' ? 'active' : ''}">
					<div class="mockup-container">
						<div class="mockup-header">
							<div class="mockup-controls">
								<span class="control-dot" style="background: #FF6EC4"></span>
								<span class="control-dot" style="background: #7873F5"></span>
								<span class="control-dot" style="background: #42E695"></span>
							</div>
							<div class="mockup-title">Blog Analytics - Srible Dashboard</div>
						</div>
						<div class="mockup-content analytics-content">
							<div class="analytics-header">
								<h3 class="analytics-title">Post Performance</h3>
								<div class="analytics-filters">
									<span class="filter-active">7 days</span>
									<span>30 days</span>
									<span>All time</span>
								</div>
							</div>
							
							<div class="analytics-metrics">
								<div class="metric-card">
									<div class="metric-value">1,247</div>
									<div class="metric-label">Views</div>
								</div>
								<div class="metric-card">
									<div class="metric-value">4:21</div>
									<div class="metric-label">Avg. Read Time</div>
								</div>
								<div class="metric-card">
									<div class="metric-value">38</div>
									<div class="metric-label">Shares</div>
								</div>
							</div>
							
							<div class="analytics-chart">
								<div class="chart-bars">
									<div class="chart-bar" style="height: 30%;"></div>
									<div class="chart-bar" style="height: 45%;"></div>
									<div class="chart-bar" style="height: 75%;"></div>
									<div class="chart-bar" style="height: 60%;"></div>
									<div class="chart-bar" style="height: 85%;"></div>
									<div class="chart-bar" style="height: 95%;"></div>
									<div class="chart-bar" style="height: 70%;"></div>
								</div>
								<div class="chart-labels">
									<span>Apr 27</span>
									<span>Apr 28</span>
									<span>Apr 29</span>
									<span>Apr 30</span>
									<span>May 1</span>
									<span>May 2</span>
									<span>May 3</span>
								</div>
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
