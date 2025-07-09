<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Store for theme: 'light' | 'dark'
	export const theme = writable<'light' | 'dark'>('light');

	function setHtmlClass(next: 'light' | 'dark') {
		const html = document.documentElement;
		if (next === 'dark') {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
	}

	onMount(() => {
		const html = document.documentElement;
		if (html.classList.contains('dark')) {
			theme.set('dark');
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme.set('dark');
			html.classList.add('dark');
		} else {
			theme.set('light');
			html.classList.remove('dark');
		}
	});

	function toggleTheme() {
		theme.update((current) => {
			const next = current === 'light' ? 'dark' : 'light';
			setHtmlClass(next);
			return next;
		});
	}
</script>

<button class="theme-toggle bg-white dark:bg-black text-gray-900 dark:text-gray-100 shadow hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200 p-2 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 ml-0 md:ml-2" on:click={toggleTheme} aria-label="Toggle theme">
	{#if $theme === 'dark'}
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg>
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
		>
			<circle cx="12" cy="12" r="5" fill="currentColor"/>
			<g stroke="currentColor">
				<line x1="12" y1="1.5" x2="12" y2="4" />
				<line x1="12" y1="20" x2="12" y2="22.5" />
				<line x1="4" y1="12" x2="1.5" y2="12" />
				<line x1="20" y1="12" x2="22.5" y2="12" />
				<line x1="5.64" y1="5.64" x2="4.05" y2="4.05" />
				<line x1="18.36" y1="18.36" x2="19.95" y2="19.95" />
				<line x1="5.64" y1="18.36" x2="4.05" y2="19.95" />
				<line x1="18.36" y1="5.64" x2="19.95" y2="4.05" />
			</g>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		border: 1px solid var(--tw-border-opacity, 1) rgba(229, 231, 235, 1); /* fallback for Tailwind border */
		outline: none;
		cursor: pointer;
		box-shadow: 0 2px 8px rgba(0,0,0,0.06);
		margin-left: 0.5rem;
		margin-top: 0;
		margin-bottom: 0;
		height: 2rem;
		width: 2rem;
		min-width: 2rem;
		min-height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
		background: var(--tw-bg-opacity, 1) #fff;
	}
	.theme-toggle:focus {
		box-shadow: 0 0 0 2px #2563eb33;
		border-color: #2563eb;
	}
	.theme-toggle:hover {
		background: #f3f4f6;
		border-color: #d1d5db;
	}
	.dark .theme-toggle {
		background: #18181b;
		border-color: #27272a;
	}
	.dark .theme-toggle:hover {
		background: #27272a;
		border-color: #3f3f46;
	}
	.theme-toggle svg {
		display: block;
		height: 1.25em;
		width: 1.25em;
		margin: 0 auto;
	}
	@media (max-width: 768px) {
		.theme-toggle {
			margin-left: 0.25rem;
			height: 1.75rem;
			width: 1.75rem;
			min-width: 1.75rem;
			min-height: 1.75rem;
		}
	}
</style>
