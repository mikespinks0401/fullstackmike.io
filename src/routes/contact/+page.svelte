<script lang="ts">
	import type { ActionData } from './$types';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { dev, browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { env } from '$env/dynamic/public';

	let name = '';
	let email = '';
	let subject = '';
	let phoneNumber = '';
	let msg = '';
	let useToken = '';

	export let form: ActionData;
	const modal: ModalSettings = {
		type: 'alert',
		title: 'Success',
		body: 'Form Successfully Submitted',
		buttonTextCancel: 'OK'
	};
	onMount(() => {
		if (form?.success) {
			modalStore.trigger(modal);
			form.success = false;
			return;
		}
		let isDark = document.querySelector('html')?.classList.contains('dark');
		let useTheme = isDark == true ? 'dark' : 'light';
		let sitekey = dev == true ? '1x00000000000000000000AA' : env.PUBLIC_TURNSTILE_SITE_KEY;
		// @ts-ignore
		window.onloadTurnstileCallback = function () {
			// @ts-ignore
			turnstile.render('#captcha-div', {
				sitekey: sitekey,
				// @ts-ignore
				callback: function (token) {
					useToken = token;
				},
				theme: useTheme
			});
		};
	});

	const info = {
		name: 'Michael Spinks',
		location: 'Houston, Tx',
		number: '713 766 8719'
	};

	const handleSubmit = async () => {
		let data = new FormData();
		data.append('form-name', name);
		data.append('form-email', email);
		data.append('form-phoneNumber', phoneNumber)
		data.append('form-subject', subject)
		data.append('form-msg', msg);
		data.append('cf-turnstile-response', useToken);
		try {
			const res = await fetch('/contact', {
				method: 'POST',
				body: data
			});
			modalStore.trigger(modal);
		} catch (error) {
			console.log(error);
		}
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
			<h1 class="text-4xl pt-4 text-center">Contact</h1>
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
					method="POST"
					class="flex flex-col max-w-2xl mx-auto gap-2"
				>
					<div class="flex-1">
						<label for="form-name" class="required label">Name</label>
						<div class="flex flex-col">
							<input
								type="text"
								name="form-name"
								class="flex-1"
								placeholder="Name"
								bind:value={name}
							/>
						</div>
					</div>
					<div class="">
						<label for="form-email" class="label required">Email</label>
						<input type="email" name="form-email" placeholder="Email" bind:value={email} />
					</div>
					<div class="">
						<label for="form-phoneNumber" class="label ">Phone Number</label>
						<input type="string" name="form-phoneNumber" placeholder="###-###-####" bind:value={phoneNumber} />
					</div>
					<div class="">
						<label for="form-subject" class="label required">Subject</label>
						<input type="text" name="form-subject" placeholder="Subject" bind:value={subject} />
					</div>
					<div class="w-full">
						<label for="form-message" class="label required">Enter Your Message</label>
						<textarea name="form-message" rows="5" class="" bind:value={msg} />
					</div>
					<!--Turnstile-->
					<div id="captcha-div" />
					<!--End Turnstile-->
					<button
						class="btn variant-filled-primary font-black !text-white"
						disabled={useToken == '' || useToken == undefined}>Send Message</button
					>
				</form>
			</div>
			<div class="col-span-12 my-8 md:mt-0 md:col-span-4 ">
				<div class="text-center pb-8">Contact Information</div>
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

	input {
		@apply form-input bg-white;
	}

	textarea {
		@apply form-textarea bg-white;
	}
	input,
	textarea {
		@apply w-full text-black;
	}
</style>
