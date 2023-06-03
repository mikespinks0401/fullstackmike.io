<script lang="ts">
	import type { ActionData } from './$types';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { z } from 'zod';
	import { dev } from '$app/environment';
	import { onMount, tick } from 'svelte';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { env } from '$env/dynamic/public';

	type inputTypeAndVal = {
		name: string;
		val: string;
	};

	const modalSuccess: ModalSettings = {
		type: 'alert',
		title: 'Success',
		body: 'Form Successfully Submitted',
		buttonTextCancel: 'OK'
	};
	
	const contactFormSchema = z.object({
		name: z.string().nonempty('Name is required'),
		email: z.string().email('Please provide a valid email address'),
		subject: z.string().nonempty('Subject is required'),
		phoneNumber: z.string().nullable(),
		msg: z.string().nonempty('Message is required')
	});
	let useToken = '';

	export let form: ActionData;

	onMount(() => {
		if (form?.success) {
			modalStore.trigger(modalSuccess);
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

	let formData = {
		name: '',
		email: '',
		phoneNumber: '',
		subject: '',
		msg: ''
	};
	let isValid = true;
	let isSubmitted = false;

	const handleSubmit = async () => {
		isSubmitted = true;
		// if (!validateForm()) {
		// 	return;
		// }
		let data = new FormData();

		data.append('form-name', formData.name);
		data.append('form-email', formData.email);
		if (formData.phoneNumber.length > 0) {
			data.append('form-phoneNumber', formData.phoneNumber);
		}
		data.append('form-subject', formData.subject);
		data.append('form-msg', formData.msg);
		data.append('cf-turnstile-response', useToken);

		try {
			await fetch('/contact', {
				method: 'POST',
				body: data
			});
			modalStore.trigger(modalSuccess);
		} catch (error) {
			console.log(error);
		}
	};

	const validateForm = () => {
		return false	
	};
	// const handleInput = (inputName: string) => {
	const handleInput = async (formInput: inputTypeAndVal) => {
		if (isSubmitted != true) {
			return;
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
								on:keydown={() => handleInput({ name: 'name', val: formData.name })}
								type="text"
								name="form-name"
								class="flex-1"
								placeholder="Name"
								bind:value={formData.name}
							/>
						</div>
					</div>
					<div class="">
						<label for="form-email" class="label required">Email</label>
						<input
							on:keydown={() => handleInput({ name: 'email', val: formData.email })}
							type="email"
							name="form-email"
							placeholder="Email"
							bind:value={formData.email}
						/>
					</div>
					<div class="">
						<label for="form-phoneNumber" class="label">Phone Number</label>
						<input
							type="string"
							name="form-phoneNumber"
							placeholder="###-###-####"
							bind:value={formData.phoneNumber}
						/>
					</div>
					<div class="">
						<label for="form-subject" class="label required">Subject</label>
						<input
							on:keydown={() => handleInput({ name: 'subject', val: formData.subject })}
							type="text"
							name="form-subject"
							placeholder="Subject"
							bind:value={formData.subject}
						/>
					</div>
					<div class="w-full">
						<label for="form-message" class="label required">Enter Your Message</label>
						<textarea
							on:keydown={() => handleInput({ name: 'msg', val: formData.msg })}
							name="form-message"
							rows="5"
							bind:value={formData.msg}
						/>
					</div>
					<!--Turnstile-->
					<div id="captcha-div" class="mb-1" />
					<!--End Turnstile-->
					<button
						class="btn variant-filled-primary font-black !text-white"
						disabled={useToken == '' || useToken == undefined || isValid == false}
						>Send Message</button
					>
				</form>
			</div>
			<div class="col-span-12 my-8 md:mt-0 md:col-span-4">
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
