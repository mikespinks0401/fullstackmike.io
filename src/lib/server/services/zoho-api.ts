import { env } from "$env/dynamic/private"
import { dev } from "$app/environment"

const clientId = env.MAIL_API_CLIENT_ID
const clientSecret = env.MAIL_API_CLIENT_SECRET
const refreshToken = env.MAIL_API_REFRESH_TOKEN
const WORKERS_URL = env.CF_WORKERS_URL
const EMAIL_API_KEY = env.CF_MAIL_WORKER_API_KEY
export const sendMailUrl = env.MAIL_API_REST_SEND_URL

let refreshTokenUrl = env.MAIL_API_REFRESH_TOKEN_URL



export type SendMailInfo = {
    fromAddress: string
    toAddress: string
    subject: string,
    content: string
}


export async function refreshAccessToken(){
    const res = await fetch(refreshTokenUrl)
}

export const getAccessToken = async()=>{
    let res = await fetch(WORKERS_URL,{
                headers:{
                    "Authorization": `Bearer ${EMAIL_API_KEY}`
                }
           })
    return await res.json()
}
