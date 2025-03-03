<script>
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div>
	<div class="container mx-auto">
		<section class="flex flex-col justify-center">
			<h1 data-test="about-title" class="text-4xl text-center pt-4">About</h1>
			<div class="mb-12 px-4 lg:px-0">
				<div class="flex justify-center py-2 pt-12">
					<div class="h-72 w-56 med:h-72 med:w-56 overflow-hidden relative">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							src="/about-me-michael-spinks.jpg"
							class="w-full absolute"
							alt="Michael Spinks Photo"
						/>
					</div>
				</div>
				<div class="py-12 text-xs leading-5">
					<p>
						Hello. My name is Michael Spinks.👋 I have been building web applications since 2019.
					</p>
					<p>I'm a chill guy that looks forward to the next project. Reach out for more info.</p>
				</div>
			</div>
		</section>
	</div>
</div>

<style lang="postcss">
	p {
		@apply py-1 indent-4;
	}
</style>
