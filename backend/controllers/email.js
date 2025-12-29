const nodemailer = require('nodemailer');
const User = require('../models/User');

const getAllEmails = async () => {
    try {
        const users = await User.find({}, 'email');
        const emails = users.map(user => user.email);
        return emails;
    } catch (error) {
        console.error('Error fetching emails:', error);
        return [];
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_EMAIL_APP_PASSWORD,
    },
});

const sendEmail = async (email, subject, message, sendToAll) => {
    try {
        let emails = [];

        if (sendToAll) {
            emails = await getAllEmails() || [];
            console.log(`emails: ${emails}`)
        }

        const mailOptions = {
            from: process.env.SUPPORT_EMAIL,
            to: sendToAll ? emails.join(', ') : email,
            subject: subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

const email = {
    post: async (req, res) => {

        const { email, subject, message, sendToAll } = req.body;
        console.log(email, subject, message, sendToAll);

        if (sendToAll === true) {
            if (!subject || !message) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            sendEmail(email, subject, message, sendToAll);

            res.status(200).json({ message: 'Mass Email sent successfully!' });
        }
        else if (sendToAll === false) {
            if (!email || !subject || !message) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            sendEmail(email, subject, message, sendToAll);

            res.status(200).json({ message: 'Single Email sent successfully!' });
        }

    }
}

module.exports = email;