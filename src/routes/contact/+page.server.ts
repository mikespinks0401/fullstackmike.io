import type { Actions } from "./$types"
import { env } from "$env/dynamic/private";
import { dev } from "$app/environment";

const Secret = dev == true ? "1x0000000000000000000000000000000AA" : env.TURNSTILE_SECRET_KEY

export const actions = {
    default: async( event) => {
        const data = await event.request.formData();
        const fName = data.get('form-fName') 
        const lName = data.get('form-lName')
        let name 
        if(fName && lName){
           name = `${fName} ${lName}` 
        }        
        const email = data.get('form-email') 
        const msg = data.get('form-msg') 

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
        if(outcome.success){
            
        }else {
            return {success: true}
        }
        return { success: true}
    }
} satisfies Actions;