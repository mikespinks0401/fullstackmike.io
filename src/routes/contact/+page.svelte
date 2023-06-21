<script lang="ts">
	import type { ActionData } from './$types';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { z } from 'zod';
	import { dev } from '$app/environment';
	import { onMount, tick } from 'svelte';
	import { enhance } from '$app/forms';
	import { modalStore, ProgressRadial } from '@skeletonlabs/skeleton';
	import { env } from '$env/dynamic/public';

	type inputTypeAndVal = {
		name: string;
		val: string;
	};

	const modalError: ModalSettings = {
		type: 'alert',
		title: 'Error',
		body: 'There was an error submitting your form',
		buttonTextCancel: 'OK',
		backdropClasses: 'error-500'
	};

	const modalSuccess: ModalSettings = {
		type: 'alert',
		title: 'Success',
		body: `Thank you for reaching out. Look for a reply within the next 24-48 hours.`,
		modalClasses: 'dark:bg-surface-700',
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
	let widgetId = '';
	export let form: ActionData;

	$: if (form?.success) {
		modalStore.trigger(modalSuccess);
		form.success = false;
	}

	$: if (form?.formatError) {
		console.log(form.formatError);
	}
	onMount(() => {
		//@ts-ignore
		// turnstile.reset(widgetId: string)
		let isDark = document.querySelector('html')?.classList.contains('dark');
		let useTheme = isDark == true ? 'dark' : 'light';
		let sitekey = dev == true ? '1x00000000000000000000AA' : env.PUBLIC_TURNSTILE_SITE_KEY;
		// @ts-ignore
		window.onloadTurnstileCallback = function () {
			// @ts-ignore
			widgetId = turnstile.render('#captcha-div', {
				sitekey: sitekey,
				// @ts-ignore
				callback: function (token) {
					useToken = token;
				},
				theme: useTheme
			});
			// console.log(widgetId)
		};
	});

	const infoElements = [
		{ key: 'name', value: 'Michael Spinks', faIcon: 'fa-solid fa-user' },
		{ key: 'location', value: 'San Diego, Ca', faIcon: 'fa-solid fa-location-pin' },
		{ key: 'number', value: '(281) 556-3287', faIcon: 'fa-solid fa-mobile' }
	];

	let formData = {
		name: '',
		email: '',
		phoneNumber: '',
		subject: '',
		msg: ''
	};
	let isValid = true;
	let isSubmitted = false;

	const validateForm = () => {
		return false;
	};

	const isNotMinimumLength = (name: string, len: number) => {
		return form?.missingData && form?.missingData.includes(name) && formData.name.length < len;
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
			<h1 class="text-4xl py-12 text-center">Contact</h1>
		</div>
		<!-- <ProgressRadial /> -->
		<div class="px-4 grid grid-cols-12">
			<div class="col-span-12 max-w-xl mx-auto my-12">
				<p class="font-medium">
					Please fill out the form below and I will get back to you as soon as possible.
				</p>
			</div>
			<div class="col-span-12 md:col-span-8 pb-8">
				<!-- on:submit={handleSubmit} -->
				<form method="POST" class="flex flex-col max-w-2xl mx-auto gap-2" use:enhance>
					<div class="flex-1">
						<label for="form-name" class="required label inline">Name</label>
						<div class="flex flex-col">
							<input
								type="text"
								name="form-name"
								class="flex {form?.error && formData.name.length < 1 ? 'input-error' : ''}"
								placeholder="Name"
								bind:value={formData.name}
								maxlength="100"
							/>{#if form?.missingData && form?.missingData.includes('name') && formData.name.length < 1}<span
									class="error">NAME REQUIRED</span
								>{/if}
						</div>
					</div>
					<div class="">
						<label for="form-email" class="label required">Email</label>
						<input
							type="email"
							name="form-email"
							class={form?.error && formData.email.length < 1 ? 'input-error' : ''}
							placeholder="Email"
							maxlength="100"
							bind:value={formData.email}
						/>{#if (form?.missingData && form?.missingData.includes('email') && formData.email.length < 1) || (form?.error && z
									.string()
									.email()
									.safeParse(formData.email).success == false)}<span class="error"
								>VALID EMAIL REQUIRED</span
							>{/if}
					</div>
					<div class="">
						<label for="form-phoneNumber" class="label">Phone Number</label>
						<input
							type="string"
							name="form-phoneNumber"
							placeholder="###-###-####"
							maxlength="15"
							bind:value={formData.phoneNumber}
						/>
					</div>
					<div class="">
						<label for="form-subject" class="label required">Subject</label>
						<input
							type="text"
							name="form-subject"
							placeholder="Subject"
							class={form?.error && formData.subject.length < 1 ? 'input-error' : ''}
							maxlength="50"
							bind:value={formData.subject}
						/>{#if form?.missingData && form?.missingData.includes('subject') && formData.subject.length < 1}<span
								class="error">SUBJECT REQUIRED</span
							>{/if}
					</div>
					<div class="w-full">
						<label for="form-message" class="label required">Enter Your Message</label>
						<textarea
							name="form-msg"
							class={form?.error && formData.msg.length < 1 ? 'input-error' : ''}
							rows="5"
							maxlength="1000"
							bind:value={formData.msg}
						/>{#if form?.missingData && form?.missingData.includes('msg') && formData.msg.length < 5}<span
								class="block error -mt-2">MESSAGE REQUIRED</span
							>{/if}
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
				<div class="flex h-full flex-col gap-2 py-4">
					{#each infoElements as infoItem}
						<div class="flex gap-4">
							<div>
								<div class="w-5 h-5 bg-secondary-500 relative text-base">
									<icon class=" absolute -right-1 -bottom-2 text-base {infoItem.faIcon}" />
								</div>
							</div>
							<div class="text-2xl">{infoItem.value}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.error {
		@apply font-bold text-red-500;
	}
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
