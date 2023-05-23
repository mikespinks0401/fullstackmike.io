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
	<div class="container max-w-7xl p-4 grid grid-cols-1 sm:px-8 md:px-16 md:grid-cols-2 md:mt-14">
		<div class="grid-cols-1 flex flex-col gap-2 min-h-full justify-center max-w-lg">
			<h1 class="!text-3xl md:text-6xl font-black" data-test="hero-title">
				Ignite Your Web Presence
			</h1>
			<h4 class="md:text-xl !opacity-70 font-semibold tracking-tighter" data-test="hero-subtitle">
				Michael Spinks - You Full Stack Developer
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
					href="/michael-spinks-resume.pdf">Download Resume</a
				>
			</div>
		</div>
		<div class="grid-cols-1 space-y-10 text-center flex flex-col items-center">
			<!-- Hero Img -->
			<div class="flex flex-col justify-center space-x-2 items-center">
				<figure class="">
					<section class="img-bg relative overflow-hidden" />
					<div
						class="w-96 h-96 bg-contain bg-no-repeat"
						style="background-image: url('/Michael-Spinks-Hero.png')"
					/>
				</figure>
				<!-- / -->
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
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
