import * as nodemailer from "nodemailer";
export class NodeMailerSendEmail {
    public async sendEmail(email: string, subject: string, username: string, link: string){
        try{
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: "587",
                service: "gmail",
                auth: {
                    user: "email@gmail.com",
                    pass: "sjhdsjndhsquhkhsj",
                },
                secure: "false",
                tls: {
                    ciphers: "SSLv3",
                    rejectUnauthorized: false,
                },
            });

            const options = () => {
                return {
                    from: "email@gmail.com",
                    to: email,
                    subject: subject,
                    html: "<html>\n" +
                        "    <head>\n" +
                        "        <style>\n" +
                        "        </style>\n" +
                        "    </head>\n" +
                        "    <body>\n" +
                        "        <p>Bonjour " + username + ",</p>\n" +
                        "        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>\n" +
                        "        <p>Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe</p>\n" +
                        "        <a href="+ link +">Réinitialiser le mot de passe</a>\n" +
                        "    </body>\n" +
                        "</html>",
                };
            };

            // Send email
            transporter.sendMail(options(), (error, info) => {
                if (error) {
                    return {error: error.message};
                } else {
                    return { success: "Mail sent" };
                }
            });

        } catch (error) {
            return {error: error.message};
        }
    }
}
