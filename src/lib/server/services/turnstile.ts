import { env } from "$env/dynamic/private"
import { dev } from "$app/environment"


const Secret = dev == true ? "1x0000000000000000000000000000000AA" : env.TURNSTILE_SECRET_KEY


const validateCFToken = async(token:string, ip: string) => {
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
        return outcome
}

export { validateCFToken }