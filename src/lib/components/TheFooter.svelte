<script lang="ts">
	import { onMount } from 'svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	const links = [
		{ name: 'About', to: '/about' },
		{ name: 'Projects', to: '/projects' },
		{ name: 'Contact', to: '/contact' }
	];

	const socialLinks = [
		{
			name: 'linkedin',
			svgPath: '',
			href: 'https://www.linkedin.com/in/michael-spinks-254879201/'
		},
		{
			name: 'linkedin',
			svgPath: '',
			href: 'http://github.com/mikespinks0401'
		}
	];

	const year = new Date().getFullYear();
</script>

<div class="py-4 bg-surface-200-700-token">
	<div class="container mx-auto px-4 lg:px-0 flex flex-col items-center md:flex-row gap-1">
		<div class="flex-1 flex flex-col items-center lg:items-center sm:flex-row gap-1 lg:gap-2">
			<LightSwitch />
			<div class="flex-1 flex  text-sm">
				<i class="px-1">©</i>
				{year} fullstackmike.io
			</div>
		</div>
		<div>
				<ul class="flex-1 flex justify-end">
					{#each links as link}
						<li class="px-2">
							<a href={link.to}>{link.name} </a>
						</li>
					{/each}
				</ul>
		</div>
		<div class="flex flex-col items-end flex-1">
			<div class="flex flex-col items-center">
				<div>
					<a
						class="btn-icon btn-icon-sm hover:variant-soft-primary"
						target="_blank"
						href="https://www.linkedin.com/in/michael-spinks"
					>
						<i class="fab fa-linkedin" />
					</a>
					<a
						class="btn-icon btn-icon-sm hover:variant-soft-primary"
						target="_blank"
						href="https://github.com/mikespinks0401"
					>
						<i class="fab fa-github" />
					</a>
				</div>
			</div>
		</div>
	</div>
</div>


<style lang="postcss">
	li a {
		@apply hover:underline
	}
</style>