<script lang="ts">
	import { AppBar, drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { useRoutes } from '../utils/homeRoutes';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	const links = useRoutes('about', 'projects', 'contact');
	export let isTop: boolean

	let curPath: string;
	let windowWidth: number;
	$: curPath = $page.url.pathname;
	$: if (windowWidth > 1024) {
		drawerStore.close();
	}

	const drawerSettings: DrawerSettings = {
		width: 'w-[280px] md:w-[480px]'
	};
	const openDrawer = () => {
		drawerStore.open(drawerSettings);
	};

	onMount(()=>{
		window.addEventListener("scroll", () => {
			console.log("Hello")
		})
	})
</script>

<!-- <div class="bg-surface-200-700-token"> -->
<svelte:window bind:outerWidth={windowWidth}  />
<!-- <div class="bg-surface-200-700-token brightness-105"> -->
<!-- <div class="bg-transparent bg-surface-200-700-token brightness-105"> -->
<div class="bg-transparent brightness-105 transition {isTop === false ? 'bg-surface-200-700-token shadow-md' : 'shadow-none'}">
	<!-- <div class="container mx-auto"> -->
	<div class="px-1 mx-auto">
		<AppBar class="!bg-inherit" padding="p-1 md:px-4">
			<svelte:fragment slot="lead">
				<div>
					<strong
						class="text-lg md:text-2xl uppercase box-decoration-clone font-black bg-clip-text text-transparent bg-gradient-to-br from-primary-700 to-secondary-500 dark:from-primary-600 dark:to-secondary-500 dark:brightness-200"
						><a href="/">FullStackMike</a></strong
					>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<div class="hidden md:flex">
					<ul class="flex justify-start gap-8 items-center pl-8  flex-1">
						{#each links as link}
							<li
								class="font-black uppercase {curPath.split('/').includes(link.name) ? "": "opacity-50 hover:opacity-90 hover:text-primary-600-300-token"}"
								class:active={curPath.split('/')[1].includes(link.name)}
							>
								<a href={link.to}>{link.name}</a>
							</li>
						{/each}
					</ul>
					<div class="hidden lg:flex-1 lg:flex justify-end text-sm font-semibold">
						<a
							class="btn btn-md bg-initial text-sm text-secondary-500 hover:variant-ringed-secondary"
							href="/michael-spinks-resume.pdf"
							download
						>
							<span> <i class="fa-solid fa-file-lines" /></span><span>Download Resume</span>
						</a>
					</div>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button on:click={openDrawer}
					><i class=" md:hidden text-xl btn btn-icon fa-solid fa-bars" /></button
				>
				<a class="hidden md:block btn btn-sm variant-filled-primary text-white" href="/contact">
					<span class="font-medium text-base text-white dark:text-white">Contact Now</span>
				</a>
			</svelte:fragment>
		</AppBar>
	</div>
</div>

<style lang="postcss">
	.active {
		@apply text-primary-600-300-token opacity-100;
	}


</style>
