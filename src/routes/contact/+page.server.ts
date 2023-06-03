import type { Actions } from "./$types"
import { env } from "$env/dynamic/private";
import { dev } from "$app/environment";
import { sendMail } from "$lib/server/mailer";
import { z } from "zod"
import type { SendMailInfo } from "$lib/server/services/zoho-api";

const contactFormSchema = z.object({
    name: z.string().min(1, {message: "name is required"} ),
    email: z.string().min(1, {message: "email is required"}).email('Please provide a valid email address'),
    subject: z.string().min(1, {message: "subject is required"}),
    phoneNumber: z.string().nullable(),
    msg: z.string().min(1,{message: 'message is required'})
});

const Secret = dev == true ? "1x0000000000000000000000000000000AA" : env.TURNSTILE_SECRET_KEY
const EMAIL_API_KEY = env.CF_MAIL_WORKER_API_KEY
const WORKERS_URL = env.CF_WORKERS_URL
export const actions = {
    default: async( event ) => {
        const data = await event.request.formData();
        const name = data.get('form-name')
        const email = data.get('form-email') 
        const phoneNumber = data.get('form-phoneNumber')
        const subject = data.get('form-subject')
        const msg = data.get('form-msg') 
      
        const emailText = `<p>${name}</p><p>${email}</p><p>${phoneNumber ? phoneNumber : ''}</p><p></p><p></p> <pre>${msg}</pre>`
        const mailInfo:SendMailInfo = {
            fromAddress: env.EMAIL_EMAIL,
            toAddress: env.EMAIL_EMAIL,
            subject: `Form Submission - ${subject}`,
            content: emailText

        }
        const token = data.get('cf-turnstile-response')
        const ip = event.getClientAddress()


        //turnstile server response validation form
        let formData = new FormData()

        formData.append('secret', Secret)
        formData.append('response', token!)
        formData.append('remoteip', ip!)
        const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const result = await fetch(url, {
            body: formData,
            method: 'POST'
        })
        const outcome = await result.json()

        //show success even if email is not sent??
        //send email if outcome is successful
        if(outcome.success){
           let res = await fetch(WORKERS_URL,{
                headers:{
                    "Authorization": `Bearer ${EMAIL_API_KEY}`
                }
           })
           let {accessToken} = await res.json()
           let {success} = await sendMail(accessToken,mailInfo)
           if(!success == false){

            console.log("Error Sending Email - " + mailInfo)

           }
        }else {
            return {success: true}
        }
        return { success: true}
    }
} satisfies Actions;