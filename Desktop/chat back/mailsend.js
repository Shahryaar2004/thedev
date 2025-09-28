

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "davidjohns105555@gmail.com",
        pass: "grzdownuhfvlixbu",
    },
});


async function sendEmail({ to, subject, text, html }) {
    try {
        const info = await transporter.sendMail({
            from: '"Zapzo" <davidjohns105555@gmail.com>',
            to,
            subject,
            text,
            html,
        });

        console.log("Message sent:", info.messageId,);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

module.exports = sendEmail;
