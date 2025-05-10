const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const sendEmail = async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array() 
        });
    }

    const { name, email, subject, message } = req.body;

    try {
        // Create transporter with connection pooling
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            pool: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: process.env.NODE_ENV === 'production'
            }
        });

        // Send email
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL}>`,
            replyTo: email,
            to: process.env.EMAIL,
            subject: `[Contact Form] ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4A90E2;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
            `
        });

        res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully' 
        });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to send email',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { sendEmail };