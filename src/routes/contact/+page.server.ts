import type { Actions } from "./$types"
import { env } from "$env/dynamic/private";
import { dev } from "$app/environment";
import { sendMail } from "$lib/server/mailer";
import type { SendMailInfo } from "$lib/server/services/zoho-api";
//       import type { SendMailInfo } from "$lib/server/mailer";
import { fail } from "@sveltejs/kit";

const Secret = dev == true ? "1x0000000000000000000000000000000AA" : env.TURNSTILE_SECRET_KEY
export const actions = {
    default: async( event ) => {
        const data = await event.request.formData();
        const name = data.get('form-name')
        const email = data.get('form-email') 
        const phoneNumber = data.get('form-phoneNumber')
        const subject = data.get('form-subject')
        const msg = data.get('form-msg') 
        const ZOHO_CLIENT_ID = env.ZOHO_API_CONTACT_FORM_CLIENT_ID_CLIENT
        const ZOHO_CLIENT_SECRET = env.ZOHO_API_CONTACT_FOM_CLIENT_SECRET
        
        const emailText = `${name} 
        ${email}
        ${phoneNumber ? phoneNumber : ''}
        
        
        ${msg}`
        const mailInfo:SendMailInfo = {
            from: env.EMAIL_EMAIL,
            to: env.EMAIL_EMAIL,
            subject: `Form Submission - ${subject}`,
            content: emailText

        }
        console.log(`Mail:INFO - ${mailInfo}`)
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
            sendMail(mailInfo)
            // await SendMail(mailInfo)

        }else {
            return {success: true}
        }
        return { success: true}
    }
} satisfies Actions;