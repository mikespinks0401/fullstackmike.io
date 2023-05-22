<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';

	const links = [
		{ name: 'About', to: '/about' },
		{ name: 'Projects', to: '/projects' },
		{ name: 'Contact', to: '/contact' }
	];

	const year = new Date().getFullYear();
</script>

<div class="py-4 bg-surface-100-800-token">
	<div class="container mx-auto flex">
		<div class="flex-1 flex gap-2">
			<LightSwitch />
			<a
				href="/"
				class="font-bold bg-clip-text text-transparent bg-gradient-to-br from-secondary-900 to-primary-900 dark:from-secondary-500 dark:to-tertiary-500 brightness-200"
				>FullStackMike.io</a
			>
		</div>
		<div class="flex-1 flex justify-center text-sm items-end">
			Copyright <i class="px-1">©</i>
			{year} fullstackmike.io All Rights Reserved
		</div>
		<ul class="flex-1 flex justify-end divide-x">
			{#each links as link}
				<li class="px-2">
					<a href={link.to}>{link.name} </a>
				</li>
			{/each}
		</ul>
	</div>
</div>
