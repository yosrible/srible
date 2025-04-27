<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container">
	<h1>Help Center</h1>
	<div class="content">
		<p>Find answers to common questions and learn how to use our platform.</p>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
	}

	h1 {
		font-size: 2.5rem;
		margin: 2rem 0 2rem 0;
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
