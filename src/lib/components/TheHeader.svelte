<script lang="ts">
	import { browser } from '$app/environment';
	import { AppBar, drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type {DrawerSettings} from "@skeletonlabs/skeleton"
	
	const links = [
		{ name: 'Projects', to: '/projects' },
		{ name: 'About', to: '/about' },
		{ name: 'Contact', to: '/contact' }
	];
	let name:string;
	onMount(() => {
		window.addEventListener("resize", ()=> {
			if(window.outerWidth > 1024){
				drawerStore.close()
			}
		})
		console.log(name)
	});
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
	const drawerSettings: DrawerSettings = {
		width: 'w-[280px] md:w-[480px]'
	}
	const openDrawer = () => {
		drawerStore.open(drawerSettings)
	}
</script>

<!-- <div class="bg-surface-200-700-token"> -->

<div class="bg-surface-200-700-token brightness-105">
	<div class="container mx-auto">
		<AppBar class="!bg-inherit">
			<svelte:fragment slot="lead">
				<div>
					<strong
						class="text-2xl uppercase box-decoration-clone font-black bg-clip-text text-transparent bg-gradient-to-br from-primary-700 to-secondary-500 dark:from-primary-600 dark:to-secondary-500 dark:brightness-200"
						><a href="/">FullStackMike</a></strong
					>
				</div></svelte:fragment
			>
			<svelte:fragment slot="default">
				<div class="hidden md:flex">
					<div class="lg:flex-1" />
					<ul class="flex justify-center gap-8 items-center flex-1">
						{#each links as link}
							<li class="font-bold uppercase">
								<a href={link.to}>{link.name}</a>
							</li>
						{/each}
					</ul>
					<div class="hidden lg:flex-1 lg:flex justify-end text-sm font-semibold">
						<a
							class="btn btn-lg bg-initial text-sm text-secondary-500 hover:variant-ringed-secondary"
							href="/michael-spinks-resume.pdf"
							download
						>
							<span> <i class="fa-solid fa-file-lines" /></span><span>Download Resume</span>
						</a>
					</div>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button on:click={openDrawer}><i class=" md:hidden text-xl btn btn-icon fa-solid fa-bars"></i></button>
				<a class="hidden md:block btn btn-sm variant-filled-primary text-white" href="/contact">
					<span class="font-medium text-lg text-white dark:text-white">Contact Now</span>
				</a>
			</svelte:fragment>
		</AppBar>
	</div>
</div>

<style lang="postcss">
	.active {
		@apply text-primary-300-600-token font-bold;
	}
	ul a:hover {
		@apply text-primary-600-300-token;
	}
</style>
