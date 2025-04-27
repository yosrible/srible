<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<main>
	<slot />
</main>

<style>
	main {
		min-height: 100vh;
		position: relative;
		z-index: 1;
		overflow-x: hidden;
		will-change: transform;
	}

	@media (max-width: 768px) {
		main {
			padding-top: 3.5rem;
		}
	}
</style>
