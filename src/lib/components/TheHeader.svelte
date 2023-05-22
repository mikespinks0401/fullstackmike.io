<script lang="ts">
	import { browser } from '$app/environment';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	const links = [
		{ name: 'Projects', to: '/projects'},
		{ name: 'About', to: '/about' },
		{ name: 'Contact', to: '/contact' }
	];

	let curPath: string;
	$: {
		if (browser && window.location.pathname) {
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

<div class="bg-surface-100-800-token">
	<div class="container mx-auto">
		<AppBar class="">
			<svelte:fragment slot="lead">
				<div>
					<strong class="text-xl uppercase"><a href="/">FullStackMike</a></strong>
				</div></svelte:fragment
			>
			<svelte:fragment slot="default">
				<div class="flex">
					<div class="flex-1"></div>
					<ul class="flex justify-center gap-8 flex-1">
						{#each links as link}
							<li class="font-bold uppercase">
								<a href={link.to}>{link.name}</a>
							</li>
						{/each}
					</ul>
					<div class="flex-1 flex gap-3 justify-end">
						<a
							class="btn btn-sm variant-ghost-surface"
							href="https://www.linkedin.com/in/michael-spinks-254879201/"
							target="_blank"
							rel="noreferrer"
						>
							LinkedIn
						</a>
						<a
							class="btn btn-sm variant-ghost-surface"
							href="http://github.com/mikespinks0401"
							target="_blank"
							rel="noreferrer"
						>
							GitHub
						</a>
					</div>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm bg-primary-500 text-white"  href="/contact"> <span class="font-bold text-xl">Get In Touch</span> </a>
			</svelte:fragment>
		</AppBar>
	</div>
</div>

<style lang="postcss">
	.active {
		@apply text-secondary-300-600-token font-bold;
	}
	ul a{
		@apply transition duration-200
	}
	ul a:hover {
		@apply text-secondary-400-500-token;
	}
</style>
