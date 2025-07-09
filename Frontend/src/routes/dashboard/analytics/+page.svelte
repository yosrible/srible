<script>
	import { onMount } from 'svelte';
	
	// Selected time period
	let selectedPeriod = '30d';
	
	// Theme reactivity
	let isDarkMode = false;
	
	onMount(() => {
		// Check initial theme
		isDarkMode = document.documentElement.classList.contains('dark');
		
		// Watch for theme changes
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
					isDarkMode = document.documentElement.classList.contains('dark');
				}
			});
		});
		
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});
		
		return () => {
			observer.disconnect();
		};
	});

	// Placeholder data for analytics
	let totalViews = 5873;
	let lastWeek = 834;
	let thisWeek = 1127;
	let percentChange = (((thisWeek - lastWeek) / lastWeek) * 100).toFixed(1);
	let uniqueVisitors = 3241;

	// Monthly data for chart
	let monthlyData = [
		{ month: 'Jan', views: 240 },
		{ month: 'Feb', views: 310 },
		{ month: 'Mar', views: 450 },
		{ month: 'Apr', views: 780 },
		{ month: 'May', views: 1127 }
	];

	// Browser data
	let browserData = [
		{ name: 'Chrome', users: 2345, percentage: 62.4 },
		{ name: 'Safari', users: 967, percentage: 25.8 },
		{ name: 'Firefox', users: 326, percentage: 8.7 },
		{ name: 'Edge', users: 94, percentage: 2.5 },
		{ name: 'Other', users: 23, percentage: 0.6 }
	];

	// Device data
	let deviceData = [
		{ name: 'Desktop', users: 2178, percentage: 58.0 },
		{ name: 'Mobile', users: 1310, percentage: 34.9 },
		{ name: 'Tablet', users: 267, percentage: 7.1 }
	];

	// Page visit data
	let pageVisitData = [
		{ path: '/', title: 'Homepage', views: 2341, avgTime: '2:24' },
		{
			path: '/blog/minimalism-in-design',
			title: 'Minimalism in Design',
			views: 1247,
			avgTime: '4:18'
		},
		{
			path: '/blog/writing-effective-content',
			title: 'Writing Effective Content',
			views: 843,
			avgTime: '3:52'
		},
		{ path: '/about', title: 'About', views: 625, avgTime: '1:47' },
		{ path: '/contact', title: 'Contact', views: 412, avgTime: '1:15' },
		{ path: '/blog/seo-tips', title: 'SEO Tips for Bloggers', views: 405, avgTime: '3:36' }
	];

	// Time data
	let timeData = [
		{ hour: '00:00', views: 78 },
		{ hour: '03:00', views: 42 },
		{ hour: '06:00', views: 105 },
		{ hour: '09:00', views: 384 },
		{ hour: '12:00', views: 521 },
		{ hour: '15:00', views: 648 },
		{ hour: '18:00', views: 472 },
		{ hour: '21:00', views: 236 }
	];

	// Calculate max percentages for bar sizing
	const maxBrowserPercentage = Math.max(...browserData.map((b) => b.percentage));
	const maxDevicePercentage = Math.max(...deviceData.map((d) => d.percentage));

	// Growth data for monthly chart
	let growthData = monthlyData.map((item, index, array) => {
		if (index === 0) return { ...item, growth: 0 };
		const prevViews = array[index - 1].views;
		const growth = prevViews ? ((item.views - prevViews) / prevViews) * 100 : 0;
		return { ...item, growth };
	});
</script>

<header class="content-header flex justify-between items-center mb-8">
	<h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">Analytics</h1>
	<div class="period-filter flex gap-2">
		<button
			class="period-btn px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 {selectedPeriod === '24h' ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
			on:click={() => (selectedPeriod = '24h')}
		>
			24h
		</button>
		<button
			class="period-btn px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 {selectedPeriod === '7d' ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
			on:click={() => (selectedPeriod = '7d')}
		>
			7d
		</button>
		<button
			class="period-btn px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 {selectedPeriod === '30d' ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
			on:click={() => (selectedPeriod = '30d')}
		>
			30d
		</button>
		<button
			class="period-btn px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 {selectedPeriod === '3m' ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
			on:click={() => (selectedPeriod = '3m')}
		>
			3m
		</button>
		<button
			class="period-btn px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 {selectedPeriod === '1y' ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
			on:click={() => (selectedPeriod = '1y')}
		>
			1y
		</button>
	</div>
</header>

<div class="dashboard-content bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-8 mb-8">
	<!-- Top stats overview -->
	<div class="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
		<div class="stat-card bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
			<div class="stat-header mb-2">
				<span class="text-sm font-medium text-blue-700 dark:text-blue-300">Total Page Views</span>
			</div>
			<div class="stat-value text-3xl font-bold text-gray-900 dark:text-white mb-2">{totalViews}</div>
			<div class="stat-footer">
				<span class="trend text-sm {percentChange > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
					{percentChange > 0 ? '+' : ''}{percentChange}% from last week
				</span>
			</div>
		</div>
		<div class="stat-card bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
			<div class="stat-header mb-2">
				<span class="text-sm font-medium text-gray-600 dark:text-gray-300">Unique Visitors</span>
			</div>
			<div class="stat-value text-3xl font-bold text-gray-900 dark:text-white">{uniqueVisitors}</div>
		</div>
		<div class="stat-card bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
			<div class="stat-header mb-2">
				<span class="text-sm font-medium text-gray-600 dark:text-gray-300">This Week</span>
			</div>
			<div class="stat-value text-3xl font-bold text-gray-900 dark:text-white">{thisWeek}</div>
		</div>
	</div>

	<!-- Monthly traffic overview chart -->
	<div class="analytics-section mb-8">
		<h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Traffic Overview</h2>
		<div class="chart-placeholder bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
			<div class="chart-bars flex items-end justify-between h-48 gap-2">
				{#each growthData as data, index}
					<div class="chart-bar-container flex flex-col items-center flex-1">
						<div
							class="chart-bar w-full rounded-t {index > 0 ? (data.growth >= 0 ? 'bg-green-500 dark:bg-green-400' : 'bg-red-500 dark:bg-red-400') : 'bg-blue-500 dark:bg-blue-400'} relative"
							style="height: {data.views / 12}px;"
						>
							{#if index > 0}
								<div class="growth-indicator absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium {data.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="16"
										height="16"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										{#if data.growth >= 0}
											<polyline points="18 15 12 9 6 15"></polyline>
										{:else}
											<polyline points="6 9 12 15 18 9"></polyline>
										{/if}
									</svg>
								</div>
							{/if}
						</div>
						<div class="chart-label text-xs text-gray-600 dark:text-gray-400 mt-2">{data.month}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Visitor time distribution -->
	<div class="analytics-section mb-8">
		<h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Visitor Time Distribution</h2>
		<div class="chart-placeholder bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
			<div class="chart-bars flex items-end justify-between h-48 gap-2">
				{#each timeData as data, index}
					<div class="chart-bar-container flex flex-col items-center flex-1">
						<div class="chart-bar time-bar w-full bg-purple-500 dark:bg-purple-400 rounded-t relative" style="height: {data.views / 7}px;">
							<div class="time-icon absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-purple-600 dark:text-purple-400">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="14"
									height="14"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<polyline points="12,6 12,12 16,14"></polyline>
								</svg>
							</div>
						</div>
						<div class="chart-label text-xs text-gray-600 dark:text-gray-400 mt-2">{data.hour}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Combined browser & device section -->
	<div class="analytics-section-row grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
		<!-- Browsers -->
		<div class="analytics-section">
			<h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Browsers</h2>
			<div class="data-table-container bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
				<table class="data-table w-full border-collapse">
					<thead>
						<tr class="bg-gray-50 dark:bg-gray-700">
							<th class="text-left px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Browser</th>
							<th class="text-right px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Users</th>
							<th class="text-right px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">%</th>
							<th class="bar-column px-4 py-3 border-b border-gray-200 dark:border-gray-600"></th>
						</tr>
					</thead>
					<tbody>
						{#each browserData as browser, index}
							<tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 {index === browserData.length - 1 ? '' : 'border-b border-gray-200 dark:border-gray-600'}">
								<td class="text-left px-4 py-3 text-sm text-gray-900 dark:text-gray-100 flex items-center">
									<div class="icon-wrapper browser-icon w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
										{#if browser.name === 'Chrome'}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
												<path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" fill="#4285F4"/>
											</svg>
										{:else if browser.name === 'Firefox'}
											<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/1200px-Firefox_logo%2C_2019.svg.png" alt="Firefox" width="16" height="16">
										{:else if browser.name === 'Safari'}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
												<circle cx="12" cy="12" r="12" fill="#1193F2" />
												<path d="m10.92 11.75 5.65-3.38-3.38 5.65-5.66 3.38 3.39-5.65z" fill="white"/>
											</svg>
										{:else if browser.name === 'Edge'}
											<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Microsoft_Edge_logo_%282019%29.png/500px-Microsoft_Edge_logo_%282019%29.png" alt="Edge" width="16" height="16">
										{:else}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<circle cx="12" cy="12" r="10" />
												<line x1="8" y1="12" x2="16" y2="12" />
											</svg>
										{/if}
									</div>
									{browser.name}
								</td>
								<td class="text-right px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{browser.users}</td>
								<td class="text-right px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{browser.percentage}%</td>
								<td class="bar-column px-4 py-3 relative">
									<div class="percentage-bar bg-gray-200 dark:bg-gray-600 h-2 rounded-full absolute left-4 right-4" style="width: {(browser.percentage / maxBrowserPercentage) * 100}%"></div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Devices -->
		<div class="analytics-section">
			<h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Devices</h2>
			<div class="data-table-container bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
				<table class="data-table w-full border-collapse">
					<thead>
						<tr class="bg-gray-50 dark:bg-gray-700">
							<th class="text-left px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Device</th>
							<th class="text-right px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Users</th>
							<th class="text-right px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">%</th>
							<th class="bar-column px-4 py-3 border-b border-gray-200 dark:border-gray-600"></th>
						</tr>
					</thead>
					<tbody>
						{#each deviceData as device, index}
							<tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 {index === deviceData.length - 1 ? '' : 'border-b border-gray-200 dark:border-gray-600'}">
								<td class="text-left px-4 py-3 text-sm text-gray-900 dark:text-gray-100 flex items-center">
									<div class="icon-wrapper device-icon w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mr-3">
										{#if device.name === 'Desktop'}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
												<line x1="8" y1="21" x2="16" y2="21"></line>
												<line x1="12" y1="17" x2="12" y2="21"></line>
											</svg>
										{:else if device.name === 'Mobile'}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
												<line x1="12" y1="18" x2="12.01" y2="18"></line>
											</svg>
										{:else if device.name === 'Tablet'}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
												<line x1="12" y1="18" x2="12.01" y2="18"></line>
											</svg>
										{:else}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<circle cx="12" cy="12" r="10"></circle>
												<line x1="8" y1="12" x2="16" y2="12"></line>
											</svg>
										{/if}
									</div>
									{device.name}
								</td>
								<td class="text-right px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{device.users}</td>
								<td class="text-right px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{device.percentage}%</td>
								<td class="bar-column px-4 py-3 relative">
									<div class="percentage-bar bg-gray-200 dark:bg-gray-600 h-2 rounded-full absolute left-4 right-4" style="width: {(device.percentage / maxDevicePercentage) * 100}%"></div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Page visits table -->
	<div class="analytics-section">
		<h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Top Pages</h2>
		<div class="data-table-container bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
			<table class="data-table w-full border-collapse">
				<thead>
					<tr class="bg-gray-50 dark:bg-gray-700">
						<th class="text-left px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 w-1/3">Page</th>
						<th class="text-left px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 w-1/4">Path</th>
						<th class="text-right px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Views</th>
						<th class="text-right px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Avg. Time</th>
					</tr>
				</thead>
				<tbody>
					{#each pageVisitData as page, index}
						<tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 {index === pageVisitData.length - 1 ? '' : 'border-b border-gray-200 dark:border-gray-600'}">
							<td class="text-left px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">{page.title}</td>
							<td class="text-left px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">{page.path}</td>
							<td class="text-right px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{page.views}</td>
							<td class="text-right px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{page.avgTime}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.content-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.content-header h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
	}
	
	/* Dark mode header text */
	:global(.dark) .content-header h1 {
		color: #f3f4f6;
	}

	.period-filter {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		border-radius: 6px;
		background-color: #f0f0f0;
		padding: 0.25rem;
	}

	.period-btn {
		background: none;
		border: none;
		padding: 0.4rem 0.75rem;
		font-size: 0.875rem;
		border-radius: 4px;
		cursor: pointer;
		color: #555;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.period-btn:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.period-btn.active {
		background-color: white;
		color: #1a1a1a;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	/* Dashboard Content */
	.dashboard-content {
		background-color: #ffffff;
		border-radius: 12px;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		padding: 2rem;
		margin-bottom: 2rem;
	}
	
	/* Dark mode dashboard content */
	:global(.dark) .dashboard-content {
		background-color: #000000;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
	}

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background-color: #fafafa;
		border-radius: 8px;
		padding: 1.5rem;
		border: 1px solid #eaeaea;
		display: flex;
		flex-direction: column;
		min-height: 130px;
	}

	.stat-card.highlight {
		background-color: rgba(0, 0, 0, 0.02);
		border-left: 3px solid var(--primary-black, #1a1a1a);
	}

	.stat-header {
		margin-bottom: 1rem;
		font-size: 0.875rem;
		color: var(--gray-dark, #555);
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--primary-black, #1a1a1a);
		margin-bottom: auto;
	}

	.stat-footer {
		margin-top: 0.75rem;
		font-size: 0.75rem;
	}

	.trend {
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-weight: 500;
	}

	.trend.positive {
		background-color: rgba(16, 185, 129, 0.1);
		color: #065f46;
	}

	.trend.negative {
		background-color: rgba(239, 68, 68, 0.1);
		color: #b91c1c;
	}

	/* Analytics Section */
	.analytics-section {
		margin-top: 1.5rem;
	}

	.analytics-section h2 {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
		font-weight: 600;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
	}
	
	/* Dark mode section headers */
	:global(.dark) .analytics-section h2 {
		color: #f3f4f6;
	}

	.chart-placeholder {
		height: 250px;
		background-color: #fafafa;
		border-radius: 8px;
		border: 1px solid #eaeaea;
		display: flex;
		align-items: flex-end;
		padding: 1.5rem;
	}

	.chart-bars {
		display: flex;
		width: 100%;
		align-items: flex-end;
		justify-content: space-between;
		height: 200px;
	}

	.chart-bar-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.chart-bar {
		width: 40px;
		background-color: #6366f1; /* Default color - indigo */
		border-radius: 4px 4px 0 0;
		transition: height 0.3s ease;
		position: relative;
	}

	.chart-bar.positive {
		background-color: #10b981; /* Green */
	}

	.chart-bar.negative {
		background-color: #ef4444; /* Red */
	}

	.chart-bar.time-bar {
		background-color: #8b5cf6; /* Purple */
	}

	.growth-indicator {
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		color: currentColor;
		background-color: white;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.time-icon {
		position: absolute;
		top: -16px;
		left: 50%;
		transform: translateX(-50%);
		color: #8b5cf6;
		background-color: white;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.chart-label {
		margin-top: 0.75rem;
		font-size: 0.875rem;
		color: var(--gray-dark, #555);
	}
	
	/* Dark mode chart labels */
	:global(.dark) .chart-label {
		color: #9ca3af;
	}

	@media (max-width: 768px) {
		.content-header h1 {
			font-size: 1.25rem;
		}

		.dashboard-content {
			padding: 1.5rem;
		}

		.chart-bar {
			width: 30px;
		}
	}

	/* Analytics section layout */
	.analytics-section-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.data-table-container {
		background-color: #ffffff;
		border-radius: 8px;
		border: 1px solid #eaeaea;
		overflow: hidden;
		margin-top: 1rem;
	}

	.data-table-container.full-width {
		width: 100%;
	}

	.data-table {
		width: 100%;
		border-collapse: collapse;
	}

	.data-table th,
	.data-table td {
		padding: 0.75rem 1rem;
		font-size: 0.9375rem;
	}

	.data-table th {
		text-align: left;
		font-weight: 600;
	}

	/* Dark mode table styles */
	:global(.dark) .data-table th {
		background-color: #374151;
	}

	:global(.dark) .data-table td {
		border-color: #4b5563;
	}

	.data-table .text-left {
		text-align: left;
	}

	.data-table .text-right {
		text-align: right;
	}

	.bar-column {
		width: 40%;
		position: relative;
		padding: 0.75rem 1rem;
	}

	.percentage-bar {
		background-color: #e2e8f0;
		height: 8px;
		border-radius: 4px;
		position: absolute;
		left: 1rem;
		right: 1rem;
	}

	/* Icon styles */
	.icon-wrapper {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		margin-right: 0.75rem;
	}

	.browser-icon {
		background-color: #f0f4ff;
	}

	.browser-icon.chrome svg {
		color: #4285f4;
	}

	.browser-icon.firefox svg {
		color: #ff9500;
	}

	.browser-icon.safari svg {
		color: #1193f2;
	}

	.browser-icon.edge svg {
		color: #0078d7;
	}

	.device-icon.desktop {
		background-color: #f0fff4;
		color: #10b981;
	}

	.device-icon.mobile {
		background-color: #fff0f6;
		color: #ec4899;
	}

	.device-icon.tablet {
		background-color: #fdf2f8;
		color: #8b5cf6;
	}

	.browser-cell,
	.device-cell {
		display: flex;
		align-items: center;
	}

	.page-column {
		width: 30%;
	}

	.path-column {
		width: 25%;
		font-family: monospace;
		font-size: 0.875rem;
		color: #555;
	}

	@media (max-width: 1024px) {
		.analytics-section-row {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	@media (max-width: 640px) {
		.content-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.dashboard-content {
			padding: 1rem;
		}

		.stats-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.chart-bar {
			width: 20px;
		}

		.bar-column {
			display: none;
		}

		.page-column {
			width: auto;
		}

		.path-column {
			display: none;
		}
	}
</style>
