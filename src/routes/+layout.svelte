<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import {
		AppShell,
		Drawer,
		LightSwitch,
		AppBar,
		Modal,
		drawerStore
	} from '@skeletonlabs/skeleton';
	import TheHeader from '$lib/components/TheHeader.svelte';
	import TheFooter from '$lib/components/TheFooter.svelte';
	import { useRoutes } from './homeRoutes';

	const links = useRoutes('Home', 'About', 'Projects', 'Contact');
	const closeMenu = () => {
		drawerStore.close();
	};
</script>

<svelte:head>
	<title>Full Stack Mike IO</title>
	<meta name="author" content="Michael Spinks" />
</svelte:head>

<!-- Drawer -->
<Drawer>
	<AppBar>
		<svelte:fragment slot="lead">
			<div class="flex justify-end"><p>FULLSTACKMIKE</p></div>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<div class="flex justify-end"><LightSwitch /></div>
		</svelte:fragment>
	</AppBar>
	<ul class="flex flex-col">
		{#each links as link}
			<li class="w-full">
				<a on:click={closeMenu} class="w-full" href={link.to}>{link.name}</a>
			</li>
		{/each}
	</ul>
</Drawer>
<!--Drawer end-->
<Modal duration={0} buttonPositive="variant-filled-success" />
<!-- App Shell -->
<AppShell class="min-h-screen flex flex-col">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<TheHeader />
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<TheFooter />
	</svelte:fragment>
</AppShell>
