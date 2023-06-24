<script lang="ts">
	const services = [
		{
			icon: 'fa-solid fa-palette',
			name: 'Custom Web Design & Development',
			description:
				'Get a unique and tailor-made website that represent your small business. I prioritize a professional online presence to engage your target audience effectively.'
		},
		{
			icon: 'fa-brands fa-wordpress',
			name: 'WordPress Development',
			description:
				'Empower your small business with a customized WordPress website that reflects your brand identity and allows easy content updates.'
		},
		{
			icon: 'fa-solid fa-square-poll-vertical',
			name: 'SEO & Speed Optimizations',
			description:
				"Improve your website's visibility in search engine results through keyword research, speed optimizations, and proven strategies."
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

	<section class="w-full">
		<div
			class=" container mx-auto max-w-7xl p-4 grid grid-cols-1 sm:px-0  md:grid-cols-2 md:mt-16 md:mb-12"
		>
			<div
				class="py-8  md:py-4 grid-cols-1 flex flex-col gap-2 min-h-full relative justify-center md:bottom-6 max-w-2xl px-4"
			>
				<h1 class=" !text-4xl lg:!text-6xl tracking font-black " data-test="hero-title">
					<span
						class="bg-clip-text bg-gradient-to-tr text-transparent from-yellow-500 dark:from-yellow-300 to-orange-700 dark:to-orange-500"
						>Ignite</span
					> Your Web Presence 🔥
				</h1>
				<h2
					class="md:block md:text-xl !opacity-70 font-semibold tracking-tighter"
					data-test="hero-subtitle"
				>
					Michael Spinks - Your Full Stack Developer
				</h2>
				<p data-test="hero-description" class="opacity-50">
					Elevate your online presence with a fast, modern, and user-friendly application that will
					surpass client demands
				</p>
				<div class=" flex flex-col gap-4 pt-8 md:pt-6 md:flex-row">
					<a class="btn btn-lg variant-filled-primary !text-white font-black" href="/contact"
						>Contact Now</a
					>
					<a
						class="btn text-secondary-500 font-black hover:variant-soft-secondary"
						href="/michael-spinks-resume.pdf"
						target="_blank"
						download
						><span> <i class="fa-solid fa-file-lines" /></span><span>Download Resume</span></a
					>
				</div>
			</div>
			<div class="grid-cols-1 space-y-10 py-5 text-center flex flex-col items-center">
				<!-- Hero Img -->
				<div class="flex flex-col justify-center space-x-2 items-center">
					<figure class="">
						<div
							class="w-72 h-72 lg:w-96 lg:h-96 pt-16 overflow-hidden relative border rounded-full md:border-none md:overflow-visible"
						>
							<section class="img-bg relative overflow-hidden" />
							<img
								src="/michael-spinks-developer.png"
								alt="Michael Spinks Full Stack Develoepr"
								class="scale-150 md:scale-110 -bottom-40 md:-bottom-20 lg:-bottom-16 right-4 absolute origin-center"
							/>
						</div>
					</figure>
				</div>
			</div>
		</div>
	</section>
	<!--End Hero Section-->
	<section class="bg-surface-300-600-token brightness-110 w-full min-h-[320px] py-8">
		<div class="container mx-auto flex flex-col px-4 max-w-7xl lg:px-0">
			<h2 class="text-center text-2xl font-semibold md:py-12">Services</h2>
			<!--Services Section-->
			<div class="flex flex-col md:flex-row justify-around gap-2">
				{#each services as { name, description, icon }, i}
					<div class="flex flex-col gap-1 md:gap-4 max-w-2xl py-4">
						<div class="flex flex-col gap-1 md:gap-2">
							<h2 class="font-black text-4xl md:text-6xl text-primary-500"><i class={icon} /></h2>
							<h4 class="font-bold text-md md:text-xl">{name}</h4>
						</div>
						<p class="opacity-80 max-w-md">{description}</p>
					</div>
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
