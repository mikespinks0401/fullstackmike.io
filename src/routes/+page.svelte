<script lang="ts">
	const services = [
		{
			icon: '',
			name: 'Front End Development',
			description:
				'Stand out from the competition with captivating and memorable designs for sections, pages, or static websites.'
		},
		{
			icon: '',
			name: 'Back End Development',
			description:
				'Customize the backend with tailored business logic to fulfill your unique demands and requirements'
		},
		{
			icon: '',
			name: 'Responsive Web Design',
			description:
				'Stunning and user-friendly websites that seamlessly adapt to various screen sizes and devices'
		},
		{
			icon: '',
			name: 'Custom Web Application Development',
			description:
				'Address your specific business needs and processes through the creation of bespoke web applications'
		},
		{
			icon: '',
			name: 'Website Maintenance and Support',
			description:
				'Ensure a secure web environment by staying up to date with software upgrades, protecting against vulnerabilities and exploits'
		},
		{
			icon: '',
			name: 'SEO Optimization',
			description:
				"Drive organic traffic and enhance the overall customer experience by optimizing your website's search engine visibility"
		},
		{
			icon: '',
			name: 'Speed Optimzations',
			description:
				"Transform your web app's performance with diagnostic optimizations aimed at bringing it to life with lightning-fast speed"
		}
	];
</script>

<svelte:head>
	<title>Full Stack Mike</title>
	<meta
		name="description"
		content="Take your web apps to the next level with FullStackMike.io's tips and tricks"
	/>
	<meta
		name="keywords"
		content="Professional Web Development, Custom Website Solutions, SEO Strategies For Success, Speed Optimization Solutions"
	/>
</svelte:head>
<div class="h-full mx-auto flex flex-col items-center">
	<!--Begin Hero Section-->
	<section
		class="container max-w-7xl p-4 grid grid-cols-1 sm:px-8 md:px-16 md:grid-cols-2 md:mt-14"
	>
		<div
			class="grid-cols-1 flex flex-col gap-2 min-h-full relative justify-center md:bottom-6 max-w-lg"
		>
			<h1 class="!text-3xl md:text-6xl font-black" data-test="hero-title">
				Ignite Your Web Presence 🔥
			</h1>
			<h4 class="md:text-xl !opacity-70 font-semibold tracking-tighter" data-test="hero-subtitle">
				Michael Spinks - Your Full Stack Developer
			</h4>
			<p data-test="hero-description" class="opacity-50">
				Seeking a standout website that propels your business to digital success? Your search ends
				here! With expertise as a skilled website developer, I provide an array of services to
				elevate your online presence.
			</p>
			<div class="flex flex-col gap-2 pt-4 md:flex-row">
				<a class="btn btn-lg variant-filled-primary !text-white font-black" href="/contact"
					>Contact Now</a
				>
				<a
					class="btn text-secondary-400-500-token font-black hover:variant-ringed-secondary"
					href="/michael-spinks-resume.pdf"
					target="_blank"
					download>Download Resume</a
				>
			</div>
		</div>
		<div class="grid-cols-1 space-y-10 py-5 text-center flex flex-col items-center">
			<!-- Hero Img -->
			<div class="flex flex-col justify-center space-x-2 items-center">
				<figure class="">
					<section class="img-bg relative overflow-hidden" />
					<div class="w-72 h-72 lg:w-96 lg:h-96 pt-16 overflow relative">
						<img
							src="/michael-spinks-developer.png"
							alt="Michael Spinks Full Stack Develoepr"
							class="scale:100 md:scale-110 -bottom-10 md:-bottom-14 lg:-bottom-10 right-4 absolute origin-center"
						/>
					</div>
				</figure>
				<!-- / -->
			</div>
		</div>
	</section>
	<!--End Hero Section-->
	<section class="bg-surface-300-600-token brightness-110 w-full z-10 py-4 min-h-[320px]">
		<div class="container mx-auto flex flex-col">
			<h2 class="text-center text-2xl font-semibold pb-4">Services</h2>
			<!--Services Section-->
			<div class="grid grid-cols-1 md:grid-cols-3 place-items-center gap-4">
				{#each services as { name, description }, i}
					{#if i == 3}
						<div class="grid grid-cols-1 md:grid-cols-3 md:col-span-3">
							<div class="col-span-1 col-start-2 flex flex-col px-4">
								<h5 class="font-bold">{name}</h5>
								<p class="text-sm">{description}</p>
							</div>
						</div>
					{:else}
						<div class="col-span-1 flex flex-col px-4">
							<h5 class="font-bold">{name}</h5>
							<p class="text-sm">{description}</p>
						</div>
					{/if}
				{/each}
			</div>
		</div>
		<!--End Services section-->
	</section>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] left-10 top-10 rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
