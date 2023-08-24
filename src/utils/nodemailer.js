import nodemailer from 'nodemailer';
export const sendMail = (to, text, contact) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abduvohidovabdulvoris@gmail.com',
            pass: 'isloucywhhgwhzzp'
        }
    })
    let mailOptions = {
        from: 'abduvohidovabdulvoris@gmail.com',
        to,
        subject: text,
        html: `
        <h3>${contact}</h3>
        <strong>Do not tell or show anyone your password. </strong>
        `
    }
    return transporter.sendMail(mailOptions);
}