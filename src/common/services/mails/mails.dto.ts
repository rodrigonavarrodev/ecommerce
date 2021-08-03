namespace MailsModel {
    export interface sendMail {
        from: string,
        to: string
        subject: string,
        html: string
    }
}