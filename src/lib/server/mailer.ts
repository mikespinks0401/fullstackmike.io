import nodemailer from "nodemailer"
import { env } from "$env/dynamic/private"
import { dev } from "$app/environment"

const isDev = env.NODE_ENV !== 'production'

type MailConfig = {
    host: string
    port: number
    secure: boolean
    auth: {
        user: string
        pass: string
    }
}


export type SendMailInfo = {
    from: string
    to: string
    subject: string,
    text: string
    html?: string
}

const email_host = isDev === true ? env.EMAIL_TEST_HOST : env.EMAIL_HOST
const email_port = isDev === true ? parseInt(env.EMAIL_TEST_PORT) :  parseInt(env.EMAIL_PORT)
const email_password = isDev === true ? env.EMAIL_TEST_PASS : env.EMAIL_PASS
const email_username = isDev === true ? env.EMAIL_TEST_USER : env.EMAIL_USERNAME
const isSecure = isDev === true ? false : true;
const mailConfig: MailConfig = {
    host: email_host,
    port: email_port,
    secure: isSecure,
    auth: {
        user: email_username,
        pass: email_password
    }
}

const transporter = nodemailer.createTransport({
    ...mailConfig
})

export function TestSMTPVerify(){
    transporter.verify((error, success) => {
        if(error){
            console.log(error)
            return
        } 
    })
}

export async function SendMail(info:SendMailInfo){
   let messageInfo = await transporter.sendMail(info)
   console.log("Message sent: %s", messageInfo.messageId)

   if(dev){
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(messageInfo))
   }

}

