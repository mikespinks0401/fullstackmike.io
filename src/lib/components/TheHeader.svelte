<script lang="ts">
	import { browser } from '$app/environment';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	const links = [
		{ name: 'Projects', to: '/projects' },
		{ name: 'About', to: '/about' },
		{ name: 'Contact', to: '/contact' }
	];

	let curPath: string;
	$: {
		if (browser) {
			curPath = window.location.pathname;
			console.log(curPath);
		}
	}
	// const changePath = () => {
	// 	if (browser) {
	// 		curPath = window.location.pathname;
	// 	}
	// };
</script>

<!-- <div class="bg-surface-200-700-token"> -->

<div class="bg-surface-200-700-token brightness-105">
	<div class="container mx-auto">
		<AppBar class="!bg-inherit">
			<svelte:fragment slot="lead">
				<div>
					<strong
						class="text-xl uppercase font-black bg-clip-text text-transparent bg-gradient-to-tr from-primary-700 to-secondary-500 dark:from-primary-600 dark:to-secondary-500 dark:brightness-200"
						><a href="/">FullStackMike</a></strong
					>
				</div></svelte:fragment
			>
			<svelte:fragment slot="default">
				<div class="flex">
					<div class="flex-1" />
					<ul class="flex justify-center gap-8 flex-1">
						{#each links as link}
							<li class="font-bold uppercase">
								<a href={link.to}>{link.name}</a>
							</li>
						{/each}
					</ul>
					<div class="flex-1 flex justify-end text-sm font-semibold">
						<a class="btn btn-sm bg-initial text-xs" href="/michael-spinks-resume.pdf" download>
							Download Resume
						</a>
					</div>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-filled-primary text-white" href="/contact">
					<span class="font-bold text-lg">Contact Now</span>
				</a>
			</svelte:fragment>
		</AppBar>
	</div>
</div>

<style lang="postcss">
	.active {
		@apply text-primary-300-600-token font-bold;
	}
	ul a {
		@apply transition duration-200;
	}
	ul a:hover {
		@apply text-primary-700;
	}
</style>
