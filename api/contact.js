const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { name, phone, email, message } = req.body;

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: process.env.MAIL, // Change if using another provider
        auth: {
            user: process.env.ADDRESS, // Your email
            pass: process.env.PASSWORD // App password
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.ADDRESS,
            to: "marykeena@hotmail.com", // Replace with your email
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage:\n${message}`,
        });

        res.status(200).send("Email sent successfully!");

    } catch (error) {
        res.status(500).send("Failed to send email.");
    }
}
