<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container">
	<button class="back-button" on:click={() => window.history.back()}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M19 12H5M12 19l-7-7 7-7" />
		</svg>
		<span>Back</span>
	</button>
	<h1>Security</h1>
	<div class="content">
		<p>Learn about our security measures and how we protect your data.</p>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
		position: relative;
	}

	.back-button {
		position: absolute;
		top: 2rem;
		left: 2rem;
		background: none;
		border: none;
		color: var(--gray-dark);
		cursor: pointer;
		padding: 0.6rem 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 500;
	}

	.back-button:hover {
		color: var(--primary-black);
	}

	h1 {
		font-size: 2.5rem;
		margin-top: 4rem;
		margin-bottom: 2rem;
		color: var(--primary-black);
	}

	.content {
		line-height: 1.6;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content p {
		max-width: 600px;
	}
</style>
