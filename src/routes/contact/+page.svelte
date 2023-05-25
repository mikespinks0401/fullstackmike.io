<script>
	import { browser } from '$app/environment';
	let name = {
		fName: '',
		lName: ''
	};
	let email = '';
	let msg = '';
	let useToken = '';

	if (browser) {
		let isDark = document.querySelector("html")?.classList.contains("dark")
		// @ts-ignore
		// window.onloadTurnstileCallback = function () {
		window.onloadTurnstileCallback =  () => {
			// @ts-ignore
			turnstile.render('#turnstile', {
				sitekey: "1x00000000000000000000AA",
				// ('TURNSTILE_SITE_KEY')
				callback: function (/** @type {any} */ token) {
					useToken = token
				},
				theme: isDark == true ? "dark": "light"
			});
		};
	}

	const info = {
		name: 'Michael Spinks',
		location: 'Houston, Tx',
		number: '713 766 8719'
	};

	const handleSubmit = () => {
		console.log(`name: ${name}, email: ${email}, msg: ${msg}`);
	};
</script>

<svelte:head>
	<title>Contact</title>
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
		defer
	></script>
</svelte:head>

<div>
	<div class="container mx-auto">
		<div class="flex flex-col justify-center">
			<h1 class="text-4xl text-center">Contact</h1>
		</div>
		<div class="px-4 grid grid-cols-12">
			<div class="col-span-12 max-w-xl mx-auto my-12">
				<p class="font-semibold">
					Thank you for reaching out. Please fill out the form below and I will get back to you as
					soon as possible.
				</p>
			</div>
			<div class="col-span-12 md:col-span-8 pb-8">
				<form
					on:submit|preventDefault={handleSubmit}
					action="#"
					class="flex flex-col max-w-2xl mx-auto gap-2"
				>
					<div class="flex-1">
						<label for="name" class="required label">Name</label>
						<div class="flex flex-col md:flex-row gap-2">
							<input
								type="text"
								name="form-fName"
								class="flex-1"
								placeholder="First Name"
								bind:value={name.fName}
							/>
							<input
								type="text"
								name="form-lName"
								class="flex-1"
								placeholder="Last Name"
								bind:value={name.lName}
							/>
						</div>
					</div>
					<div class="">
						<label for="email" class="label required">Email</label>
						<input type="email" name="form-email" placeholder="Email" bind:value={email} />
					</div>
					<div class="w-full">
						<label for="message" class="label required">Enter Your Message</label>
						<textarea name="form-message" rows="5" class="" bind:value={msg} />
					</div>
					<!--Turnstile-->
					<div id="turnstile" />
					<!--End Turnstile-->
					<button type="submit" class="btn variant-filled-primary font-black !text-white" 
						disabled={useToken == "" || useToken == undefined}
						>Send Message</button
					>
				</form>
			</div>
			<div class="col-span-12 mt-8 md:mt-0 md:col-span-4">
				<div class="text-center">Contact Information</div>
				<div class="flex flex-col font-semibold">
					<p>{info.name}</p>
					<p>{info.number}</p>
					<p>{info.location}</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.required::after {
		content: '*';
		@apply text-error-500;
	}


	input{
		@apply form-input bg-white 
	}

	textarea{
		@apply form-textarea bg-white
	}
	input,
	textarea {
		@apply w-full text-black;
	}
</style>
