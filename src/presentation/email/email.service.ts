import nodemailer from 'nodemailer'
import { envs } from '../../config/envs'; 
// import { LogRepository } from '../../domain/repository/log.repository';
// import { LogSeverityLevel, logEntity } from '../../domain/entities/log.entity';




interface sendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    // attachements?: Attachement[]
}

// interface Attachement {

//     filename: string,
//     path: string
// };

export class EmailService {

    constructor() {
    }

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: sendMailOptions): Promise<boolean> {

        console.log("Service: " + envs.MAILER_SERVICE);
        console.log("Service: " + envs.MAILER_EMAIL);
        console.log("Service: " + envs.MAILER_SECRET_KEY);
        const { to, subject, htmlBody } = options;

        console.log("Por aui");
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
            });


            return true;
        } catch (error) {

            return false;
        }
    }

    // async sendEmailWithFileSystenLogs(to: string | string[]) {

    //     console.log("Eyyyyyy");

    //     const subject = 'Logs del servidor';

    //     const htmlBody = `
    //          <h3>Logs del sistema - NOC </h3>
    //          <p>Loremfdsfdfdfdsfds fdsfd sf dfdfsfdsfswee2q</p>
    //          <p>ver adjuntos</p>
    //     `;


    //     const attachements: Attachement[] = [
    //         { filename: 'logs-high.log', path: './logs/logs-low.log' },
    //         { filename: 'logs-high.high', path: './logs/logs-high.log' },
    //         { filename: 'logs-high.medium', path: './logs/logs-high.log' }
    //     ];

    //     return this.sendEmail({
    //         to, subject, attachements, htmlBody
    //     });

    // }
}