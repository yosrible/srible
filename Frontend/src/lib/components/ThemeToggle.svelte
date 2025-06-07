<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const theme = writable<'light' | 'dark'>('light');

	onMount(() => {
		const saved = localStorage.getItem('theme');
		if (
			saved === 'dark' ||
			(saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			theme.set('dark');
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			theme.set('light');
			document.documentElement.setAttribute('data-theme', 'light');
		}
	});

	function toggleTheme() {
		theme.update((current) => {
			const next = current === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', next);
			document.documentElement.setAttribute('data-theme', next);
			return next;
		});
	}
</script>

<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
	{#if $theme === 'dark'}
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg
		>
	{:else}
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><circle cx="12" cy="12" r="5" /><path
				d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95-1.41-1.41M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41"
			/></svg
		>
	{/if}
</button>

<style>
	.theme-toggle {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.4em;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.theme-toggle svg {
		display: block;
		color: var(--text-color, #222);
	}
</style>
