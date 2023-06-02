import { env } from "$env/dynamic/private"
import { dev } from "$app/environment"

const clientId = env.MAIL_API_CLIENT_ID
const clientSecret = env.MAIL_API_CLIENT_SECRET
const refreshToken = env.MAIL_API_REFRESH_TOKEN
const sendMailUrl = env.MAIL_API_REST_SEND_URL
let refreshTokenUrl = env.MAIL_API_REFRESH_TOKEN_URL



export type SendMailInfo = {
    fromAddress: string
    toAddress: string
    subject: string,
    content: string
}

export function getAccessToken(){
    return //access token
}

export async function refreshAccessToken(){
    const res = await fetch(refreshTokenUrl)
}

export { sendMailUrl }