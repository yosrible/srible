<script>
	import { onMount } from 'svelte';

	onMount(() => {
		checkDefaultFavicon();
	});

	let userSettings = {
		name: '',
		email: '',
		bio: ''
	};

	let siteSettings = {
		favicon: '/favicon.ico',
		subdomain: ''
	};

	// Flag to check if favicon is the default one
	let isDefaultFavicon = true;

	let faviconFile = null;
	let faviconPreview = siteSettings.favicon;

	// Check if it's the default favicon
	function checkDefaultFavicon() {
		isDefaultFavicon = siteSettings.favicon === '/favicon.ico';
	}

	let saved = false;
	let faviconUploading = false;

	function handleSave() {
		// In a real app, this would save the settings to the backend

		// Show success notification
		saved = true;
		setTimeout(() => {
			saved = false;
		}, 3000);
	}

	function handleFaviconChange(event) {
		const file = event.target.files[0];
		if (!file) return;

		if (!file.type.match('image.*')) {
			alert('Please select an image file');
			return;
		}

		if (file.size > 1024 * 1024) {
			// 1MB max
			alert('File size should be less than 1MB');
			return;
		}

		faviconFile = file;

		// Create preview
		const reader = new FileReader();
		reader.onload = (e) => {
			faviconPreview = e.target.result;
			isDefaultFavicon = false;
		};
		reader.readAsDataURL(file);
	}

	function uploadFavicon() {
		if (!faviconFile) return;

		faviconUploading = true;

		// In a real app, this would upload the favicon to the server
		setTimeout(() => {
			// After successful upload
			siteSettings.favicon = faviconPreview;
			faviconUploading = false;
			faviconFile = null;
			isDefaultFavicon = false;

			// Show success notification
			saved = true;
			setTimeout(() => {
				saved = false;
			}, 3000);
		}, 1500);
	}

	function deleteFavicon() {
		if (confirm('Are you sure you want to reset your favicon to the default?')) {
			// In a real app, this would delete the custom favicon from the server
			siteSettings.favicon = '/favicon.ico';
			faviconPreview = '/favicon.ico';
			faviconFile = null;
			isDefaultFavicon = true;

			// Show success notification
			saved = true;
			setTimeout(() => {
				saved = false;
			}, 3000);
		}
	}
</script>

<header class="content-header flex justify-between items-center mb-8">
	<h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">Settings</h1>
	<button class="save-btn bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 border border-gray-900 dark:border-gray-100 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 flex items-center gap-2" on:click={handleSave}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="18"
			height="18"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="3"></circle>
			<path
				d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
			></path>
		</svg>
		<span>Save Changes</span>
	</button>
</header>

{#if saved}
	<div class="notification bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
			<path
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
			/>
			<polyline points="22 4 12 14.01 9 11.01" />
		</svg>
		<span>Settings saved successfully</span>
	</div>
{/if}

<div class="dashboard-content bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-8 mb-8">
	<section class="settings-section profile-section mb-8">
		<h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
			<span class="section-icon profile-icon w-5 h-5 bg-gray-400 dark:bg-gray-500 rounded"></span>
			Profile
		</h2>
		<div class="form-group mb-6">
			<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
			<input
				type="text"
				id="name"
				bind:value={userSettings.name}
				placeholder="Your name"
				class="input-field w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
			/>
		</div>
		<div class="form-group mb-6">
			<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
			<input
				type="email"
				id="email"
				bind:value={userSettings.email}
				placeholder="your.email@example.com"
				class="input-field w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
			/>
		</div>
		<div class="form-group mb-6">
			<label for="bio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
			<textarea
				id="bio"
				rows="4"
				bind:value={userSettings.bio}
				placeholder="Writer and web developer passionate about minimal design and clear communication."
				class="input-field w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
			></textarea>
			<div class="help-text text-sm text-gray-500 dark:text-gray-400 mt-1">Brief description that will appear on your blog's about page.</div>
		</div>
	</section>

	<section class="settings-section customization-section">
		<h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
			<span class="section-icon customization-icon w-5 h-5 bg-gray-400 dark:bg-gray-500 rounded"></span>
			Site Customization
		</h2>

		<div class="form-group mb-6">
			<label for="subdomain" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subdomain</label>
			<div class="subdomain-container flex items-center">
				<input
					type="text"
					id="subdomain"
					bind:value={siteSettings.subdomain}
					placeholder="your-blog-name"
					class="input-field flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
				/>
				<span class="domain-suffix px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md text-sm">.srible.com</span>
			</div>
			<div class="help-text text-sm text-gray-500 dark:text-gray-400 mt-1">
				This is your blog's address on the web. Only lowercase letters, numbers, and hyphens
				allowed.
			</div>
		</div>

		<div class="form-group">
			<label for="favicon-upload">Favicon</label>
			<div class="favicon-container">
				<div class="favicon-preview">
					{#if isDefaultFavicon}
						<!-- Default favicon placeholder icon -->
						<div class="no-favicon-placeholder">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="32"
								height="32"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
								<rect x="9" y="9" width="6" height="6"></rect>
							</svg>
							<span>No Favicon</span>
						</div>
					{:else}
						<img
							src={faviconPreview}
							alt="Favicon Preview"
							width="64"
							height="64"
							class="favicon-image"
						/>
					{/if}
				</div>
				<div class="favicon-controls">
					<p class="help-text">
						Your site's favicon appears in browser tabs and bookmarks. Recommended size: 32x32px or
						64x64px.
					</p>

					<div class="favicon-buttons">
						<label class="file-upload-btn">
							<input
								type="file"
								id="favicon-upload"
								accept="image/png,image/jpeg,image/x-icon,image/svg+xml"
								on:change={handleFaviconChange}
							/>
							<span class="file-btn-text">Choose File</span>
						</label>

						{#if faviconFile}
							<button
								class="upload-favicon-btn"
								on:click={uploadFavicon}
								disabled={faviconUploading}
							>
								{#if faviconUploading}
									Uploading...
								{:else}
									Upload Favicon
								{/if}
							</button>
						{/if}

						<button class="delete-favicon-btn" on:click={deleteFavicon}> Reset to Default </button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="settings-section account-section">
		<h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
			<span class="section-icon account-icon w-5 h-5 bg-gray-400 dark:bg-gray-500 rounded"></span>
			Account
		</h2>
		<div class="danger-zone bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-6">
			<h3 class="text-base font-semibold text-red-800 dark:text-red-400 mb-3">Danger Zone</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
			<button class="delete-account-btn bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white border-none rounded-md px-5 py-3 text-sm font-medium cursor-pointer min-h-[44px]">Delete Account</button>
		</div>
	</section>
</div>

<style>
	/* Responsive styles only - no hardcoded colors */
	@media (max-width: 768px) {
		.dashboard-content {
			padding: 1.5rem;
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

		.save-btn {
			width: 100%;
			justify-content: center;
		}
	}

	/* Subdomain styling */
	.subdomain-container {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.subdomain-container .input-field {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		flex-grow: 1;
	}

	/* Favicon styling */
	.favicon-container {
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
	}

	.favicon-preview {
		flex-shrink: 0;
		width: 64px;
		height: 64px;
		border: 1px solid #eaeaea;
		border-radius: 8px;
		padding: 4px;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.favicon-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.no-favicon-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: #999;
	}

	.no-favicon-placeholder span {
		font-size: 0.625rem;
		margin-top: 0.25rem;
	}

	.favicon-controls {
		flex-grow: 1;
	}

	.favicon-buttons {
		display: flex;
		gap: 0.75rem;
		margin-top: 0.75rem;
		flex-wrap: wrap;
	}

	.file-upload-btn {
		background-color: #3176e6;
		color: white !important; /* Ensure text is white */
		border: none;
		border-radius: 6px;
		padding: 0.75rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 500;
		cursor: pointer;
		display: inline-block;
		min-height: 44px; /* Touch-friendly */
		text-align: center;
	}

	.file-upload-btn input[type='file'] {
		display: none;
	}

	.file-upload-btn:hover {
		background-color: #3a5a8a;
	}

	.file-btn-text {
		color: white;
	}

	.upload-favicon-btn {
		background-color: #333;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.75rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 500;
		cursor: pointer;
		min-height: 44px; /* Touch-friendly */
	}

	.upload-favicon-btn:hover {
		background-color: #000;
	}

	.upload-favicon-btn:disabled {
		background-color: #999;
		cursor: not-allowed;
	}

	.delete-favicon-btn {
		background-color: transparent;
		color: #6b7280;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		padding: 0.75rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 500;
		cursor: pointer;
		min-height: 44px; /* Touch-friendly */
	}

	.delete-favicon-btn:hover {
		background-color: #f3f4f6;
	}

	@media (max-width: 640px) {
		.favicon-container {
			flex-direction: column;
			align-items: flex-start;
		}

		.favicon-buttons {
			flex-direction: column;
		}

		.file-upload-btn,
		.upload-favicon-btn,
		.delete-favicon-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
