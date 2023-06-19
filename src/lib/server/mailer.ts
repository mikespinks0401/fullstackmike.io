import { env } from "$env/dynamic/private"
import { dev } from "$app/environment"
import { sendMailUrl } from "./services/zoho-api"

const AccountId = env.MAIL_API_CLIENT_ID
const refreshToken = env.MAIL_API_REFRESH_TOKEN
const restMailEndpoint = env.MAIL_API_REST_URL


export interface mailer {
    sendMail: (info:SendMailInfo, options?: object ) => Promise<{ success: boolean}>
}
export interface SendMailInfo {
    fromAddress: string
    toAddress: string
    subject: string
    content: string
}



export async function sendMail(accessToken: string, info:SendMailInfo){
    console.log("Sending to address " + sendMailUrl + " With " + JSON.stringify(info))

    const res = await fetch(sendMailUrl, {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info) 
    })
    console.log(await res.json())
    if(res.status == 200){
        return {success: true}
    }

    return {success: false}

}

