import type { Actions } from "./$types"
import { fail } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { sendMail } from "$lib/server/mailer";
import { z } from "zod"
import { validateCFToken } from "$lib/server/services/turnstile";
import { getAccessToken, type SendMailInfo } from "$lib/server/services/zoho-api";

const contactFormSchema = z.object({
    name: z.string().min(1, {message: "name is required"} ),
    email: z.string().min(1, {message: "email is required"}).email('Please provide a valid email address'),
    subject: z.string().min(1, {message: "subject is required"}),
    phoneNumber: z.string().nullable(),
    msg: z.string().min(1,{message: 'message is required'})
});

export const actions = {
    default: async( event ) => {

        let missingData:string[] = [] 
        let maxLengthErrors:string[] 
        const data = await event.request.formData();
        const name = data.get('form-name')?.toString().trim()
        const email = data.get('form-email')?.toString().trim() 
        const phoneNumber = data.get('form-phoneNumber')?.toString().trim()
        const subject = data.get('form-subject')?.toString().trim()
        const msg = data.get('form-msg') ?.toString().trim()
        let requiredFields = [name, email, subject, msg]
        const requiredFieldsNames = ["name", "email", "subject", "msg" ]

        missingData = getIsMissingvalues(requiredFields, requiredFieldsNames)

        if(missingData.length > 0){
            return fail(404, {error: true, missingData: (missingData.length == 0 ? [] : missingData)})
        }

        if(phoneNumber != undefined && phoneNumber?.toString().length > 0){
            requiredFields = [...requiredFields.slice(0,2), phoneNumber, ...requiredFields.slice(2, 4)]
        }

        const maxLengths = requiredFields.length === 4 ? [100, 100, 50, 1000] : [100, 100, 15, 50, 1000]
        maxLengthErrors = getIsRequiredLengths(requiredFields, maxLengths)
        if(maxLengthErrors.length > 0){
            console.log("We Have Errors")
            return fail(400, {formatError: true, maxLengthErrors})
        }
        const emailText = `<p>${name}</p><p>${email}</p><p>${phoneNumber ? phoneNumber : ''}</p><p></p><p></p> <pre>${msg}</pre>`
        const mailInfo:SendMailInfo = {
            fromAddress: env.EMAIL_EMAIL,
            toAddress: env.EMAIL_EMAIL,
            subject: `Form Submission - ${subject}`,
            content: emailText

        }
        const token = data.get('cf-turnstile-response')
        if(token == null){
            return fail(400, {error: "captcha token-required"})
        }
        const ip = event.getClientAddress()

        // validate CF Captcha Token
        const outcome = await validateCFToken(token.toString(),ip)
        if(outcome?.success){
           let {accessToken} = await getAccessToken()
           let {success} = await sendMail(accessToken,mailInfo)
           if(success == false){

            console.log("Error Sending Email - " + mailInfo)
           }
        }else {
            return {success: false, message: "there was an error, please try again"}
        }
        return { success: true}
    }
} satisfies Actions;

function hasValue(formKey: string | undefined){
    return   (formKey == null || formKey?.toString().trim().length === 0) ? false : true
}

const getIsMissingvalues = (requiredValues: (string | undefined)[], requiredFieldsNames: string[]) => {
    let missingValues:string[] = [] 
    if(requiredValues === null){
        return []
    }
    requiredValues.forEach((field, index) => {
            if(index == 1 && z.string().email().safeParse(requiredValues[index]).success == false || !hasValue(field)){
                let value
                switch(index){
                    //name
                    case 0:
                        value = requiredFieldsNames[0]
                        break
                    //email
                    case 1:
                        value = requiredFieldsNames[1]
                        break
                    //subject
                    case 2:
                        value = requiredFieldsNames[2]
                        break
                    //msg
                    case 3:
                        value = requiredFieldsNames[3]
                        break
                }
                if(value == null){
                    return
                }
                missingValues.push(value)
            }
        })
        return missingValues
}

const getIsRequiredLengths = (requiredValues: (string | undefined)[], requiredLengths: number[]):string[]=> {
   let lengthErrors:string[] = []
    requiredValues.forEach((val, index) => {
        if(val === undefined){
            return 
        }
        console.log(`comparing ${val} - to ${requiredLengths[index]}`)
       if(!isRequiredLength(val, requiredLengths[index])){
         let valueName
         switch(index){
            case 0:
                valueName =  "name"              
                break;
            case  1:
                valueName =  "email"              
                break;
            case  2:
                valueName = requiredValues.length == 4 ? "subject" : "phoneNumber"
                break;
            case  3:
                valueName = requiredValues.length == 4 ? "msg" : "subject"
                break;
            case  4:
                valueName = "msg"
                break;
        }
        if(valueName){
        lengthErrors.push(valueName)
        }
       }

    })
    return lengthErrors
}

const isRequiredLength = (item: string, maxLength: number):boolean => item.length < maxLength