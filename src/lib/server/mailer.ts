import { env } from "$env/dynamic/private"
import { dev } from "$app/environment"
import { sendMailUrl } from "./services/zoho-api"

const AccountId = env.MAIL_API_CLIENT_ID
const refreshToken = env.MAIL_API_REFRESH_TOKEN
let accessToken = env.MAIL_API_ACCESS_TOKEN
const restMailEndpoint = env.MAIL_API_REST_URL


export interface mailer {
    sendMail: Function
    refreshAccessToken: Function

}
export interface SendMailInfo {
    from: string
    to: string
    subject: string
    content: string
}



export async function sendMail(info:SendMailInfo){


    const res = await fetch(sendMailUrl, {
        method: "POST",
        headers:{
            "Authorization": `Bearer: ${accessToken}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(info) 
    })
    if(res.status == 200){
        return {success: true}
    }

}

