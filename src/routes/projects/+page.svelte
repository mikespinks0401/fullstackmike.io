<script lang="ts">
	type Project = {
		name: string;
		description: string;
		href: string;
		img: string;
		hovered: boolean;
	};


	const projects: Project[] = [
		{
			name: 'Dedicated To Your Freight',
			description:
				'Wordpress Site Redesign with performance boosts. Improved load time by over 75%.',
			href: 'https://www.dedicatedtoyourfreight.com',
			img: 'project-D2F.png',
			hovered: false

		},
		{
			name: 'Rest Api Country Picker',
			description: 'Built with Nuxt 3 and deployed on github pages',
			href: 'https://mikespinks0401.github.io/project-restApi-countries/',
			img: 'project-countries.png',
			hovered: false
		},
		{
			name: 'News Home Page Responsive Design',
			description:
				'A responsive homepage design built with tailwindCSS and Nuxt 3, deployed with github pages',
			href: 'https://mikespinks0401.github.io/project-news-homepage-layout/',
			img: 'project-newsHomePage.png',
			hovered: false
		},
		{
			name: 'The Alchemy Of Intimacy Landing Page',
			description:
				'A responsive course landing page built with sveltekit and hosted on github pages.',
			href: 'https://awakeinthedreamschool.com/p/alchemy-of-intimacy',
			img: 'landing-page.png',
			hovered: false
		},

	];
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>
<div>
	<div class="container mx-auto">
		<div class="flex flex-col justify-center text-center py-12">
			<h1 class="text-4xl">Projects</h1>
			<p >(Click On A Project To View)</p>
		</div>
		<div class="w-full grid md:grid-cols-3 gap-20 p-3">
			{#each projects as project, index}
				<a on:mouseover={()=> project.hovered = true} on:focus={() =>project.hovered = true} on:blur={()=>project.hovered = false} on:mouseleave={()=> project.hovered = false} href={project.href} target="_blank" class="hover:shadow-md h-auto  md:max-w-sm">
					<div class=" border h-full {project.hovered === true ? 'bg-surface-hover-token': 'bg-surface-300-600-token'}">
						<div class="overflow-hidden">
							<img class=" object-contain transition duration-200 {project.hovered === true ? 'scale-125' : ''}"  src="/{project.img}" alt={project.name} />
						</div>
						<div class="p-4">
							<p class="font-bold text-center">{project.name}</p>
							<p class="py-4 text-opacity-50">{project.description}</p>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
