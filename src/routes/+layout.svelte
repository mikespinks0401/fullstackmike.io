<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import TheHeader from '$lib/components/TheHeader.svelte';
	import TheFooter from '$lib/components/TheFooter.svelte';
</script>

<svelte:head>
	<title>Full Stack Mike IO</title>
		<meta name="author" content="Michael Spinks" />
</svelte:head>

<!-- App Shell -->
<AppShell class="min-h-screen flex flex-col">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<TheHeader />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">
		<TheFooter />
	</svelte:fragment>
</AppShell>
