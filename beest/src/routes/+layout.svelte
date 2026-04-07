<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(*), :global(*::before), :global(*::after) {
		box-sizing: border-box;
	}

	:global(html) {
		min-height: 100%;
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		min-height: 100vh;
		font-family: "Courier New", monospace;
		background-color: #47453f;
		color: #e6f4fe;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
		-webkit-text-size-adjust: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	:global(img), :global(svg), :global(video), :global(canvas), :global(picture) {
		display: block;
		max-width: 100%;
		height: auto;
	}

	:global(button), :global(input), :global(textarea), :global(select) {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		font: inherit;
		background-repeat: no-repeat;
	}

	:global(button) {
		line-height: 1.1;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(a:focus-visible), :global(button:focus-visible), :global(input:focus-visible) {
		outline: 2px solid #93b4cd;
		outline-offset: 3px;
	}

	@media (pointer: fine) {
		:global(*) {
			cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='28' viewBox='0 0 32 36'%3E%3Cpolygon points='3,2 3,30 12,23 19,34 25,31 18,20 29,17' fill='%23ffffff' stroke='%234b4840' stroke-width='3' stroke-linejoin='round'/%3E%3C/svg%3E") 2 2, auto;
		}

		:global(*:active) {
			cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='36' viewBox='0 0 32 36'%3E%3Cpolygon points='3,2 3,30 12,23 19,34 25,31 18,20 29,17' fill='%23ffffff' stroke='%234b4840' stroke-width='3' stroke-linejoin='round'/%3E%3C/svg%3E") 3 2, auto;
		}
	}
</style>
