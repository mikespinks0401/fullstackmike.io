<script lang="ts">
    import {AppBar} from "@skeletonlabs/skeleton"
	const links = [
		{ name: 'Home', to: '/' },
		{ name: 'About', to: '/about' },
		{ name: 'Contact', to: '/contact' }
	];
</script>


		<div class="bg-surface-100-800-token">
			<div class="container mx-auto">
				<AppBar>
					<svelte:fragment slot="lead">
						<strong class="text-xl uppercase"><a href="/">FullStackMike</a></strong>
					</svelte:fragment>
					<svelte:fragment slot="default">
						<ul class="flex justify-center gap-4 uppercase font-medium">
							{#each links as link}
							<li><a href={link.to}>{link.name}</a></li>	
							{/each}
						</ul>
					</svelte:fragment>
					<svelte:fragment slot="trail">
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
					</svelte:fragment>
				</AppBar>
			</div>
		</div>
