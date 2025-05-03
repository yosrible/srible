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
		subdomain: 'myblog'
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

<header class="content-header">
	<h1>Settings</h1>
	<button class="save-btn" on:click={handleSave}>
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
	<div class="notification">
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

<div class="dashboard-content">
	<section class="settings-section profile-section">
		<h2><span class="section-icon profile-icon"></span>Profile</h2>
		<div class="form-group">
			<label for="name">Name</label>
			<input
				type="text"
				id="name"
				bind:value={userSettings.name}
				placeholder="Your name"
				class="input-field"
			/>
		</div>
		<div class="form-group">
			<label for="email">Email</label>
			<input
				type="email"
				id="email"
				bind:value={userSettings.email}
				placeholder="your.email@example.com"
				class="input-field"
			/>
		</div>
		<div class="form-group">
			<label for="bio">Bio</label>
			<textarea
				id="bio"
				rows="4"
				bind:value={userSettings.bio}
				placeholder="Writer and web developer passionate about minimal design and clear communication."
				class="input-field"
			></textarea>
			<div class="help-text">Brief description that will appear on your blog's about page.</div>
		</div>
	</section>

	<section class="settings-section customization-section">
		<h2><span class="section-icon customization-icon"></span>Site Customization</h2>

		<div class="form-group">
			<label for="subdomain">Subdomain</label>
			<div class="subdomain-container">
				<input
					type="text"
					id="subdomain"
					bind:value={siteSettings.subdomain}
					placeholder="myblog"
					class="input-field"
				/>
				<span class="domain-suffix">.srible.com</span>
			</div>
			<div class="help-text">
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
		<h2><span class="section-icon account-icon"></span>Account</h2>
		<div class="danger-zone">
			<h3>Danger Zone</h3>
			<p>Once you delete your account, there is no going back. Please be certain.</p>
			<button class="delete-account-btn">Delete Account</button>
		</div>
	</section>
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

	.save-btn {
		background-color: #3b82f6; /* Blue */
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.75rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: background-color 0.2s ease;
		min-height: 44px; /* Touch-friendly */
	}

	.save-btn:hover {
		background-color: #2563eb; /* Darker blue */
	}

	.notification {
		background-color: #1ac954; /* Green background */
		color: white;
		padding: 0.75rem 1rem;
		border-radius: 6px;
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	/* Dashboard Content */
	.dashboard-content {
		background-color: #f8f8f5;
		border-radius: 8px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.settings-section {
		margin-bottom: 2.5rem;
	}

	.settings-section:last-child {
		margin-bottom: 0;
	}

	.settings-section h2 {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
		font-weight: 600;
		color: var(--primary-black, #1a1a1a);
		font-family: 'Space Grotesk', sans-serif;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #eaeaea;
		display: flex;
		align-items: center;
	}

	.section-icon {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		margin-right: 0.75rem;
		position: relative;
	}

	.section-icon::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 14px;
		height: 14px;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.profile-icon {
		background-color: rgba(16, 185, 129, 0.15); /* Green background */
	}

	.profile-icon::before {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' fill='none' stroke='%2310b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E");
	}

	.customization-icon {
		background-color: rgba(139, 92, 246, 0.15); /* Purple background */
	}

	.customization-icon::before {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' fill='none' stroke='%238b5cf6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'%3E%3C/path%3E%3Cpath d='M4.93 4.93l4.24 4.24'%3E%3C/path%3E%3Cpath d='M14.83 14.83l4.24 4.24'%3E%3C/path%3E%3Cpath d='M14.83 9.17l4.24-4.24'%3E%3C/path%3E%3Cpath d='M14.83 9.17l3.53-3.53'%3E%3C/path%3E%3Cpath d='M4.93 19.07l4.24-4.24'%3E%3C/path%3E%3C/svg%3E");
	}

	.account-icon {
		background-color: rgba(245, 158, 11, 0.15); /* Amber background */
	}

	.account-icon::before {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' fill='none' stroke='%23f59e0b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'%3E%3C/path%3E%3C/svg%3E");
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--primary-black, #1a1a1a);
	}

	.input-field {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #eaeaea;
		border-radius: 6px;
		font-size: 0.9375rem;
		color: var(--primary-black, #1a1a1a);
		transition: border-color 0.2s ease;
		font-family: inherit;
	}

	.input-field:focus {
		outline: none;
		border-color: var(--primary-black, #1a1a1a);
	}

	.help-text {
		font-size: 0.875rem;
		color: var(--gray-dark, #555);
		margin-top: 0.5rem;
	}

	.danger-zone {
		background-color: rgba(255, 0, 0, 0.05);
		border: 1px solid rgba(255, 0, 0, 0.15);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.danger-zone h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #cc0000;
		margin-bottom: 0.75rem;
	}

	.danger-zone p {
		font-size: 0.9375rem;
		color: #555;
		margin-bottom: 1rem;
	}

	.delete-account-btn {
		background-color: #cc0000;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.75rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 500;
		cursor: pointer;
		min-height: 44px; /* Touch-friendly */
	}

	.delete-account-btn:hover {
		background-color: #aa0000;
	}

	@media (max-width: 768px) {
		.content-header h1 {
			font-size: 1.25rem;
		}

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

	.domain-suffix {
		background-color: #f0f0f0;
		padding: 0.75rem;
		border: 1px solid #eaeaea;
		border-left: none;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
		font-size: 0.9375rem;
		color: #666;
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
			align-items: center;
			text-align: center;
		}

		.favicon-buttons {
			justify-content: center;
		}
	}
</style>
