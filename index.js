const express = require('express');
const bodyParser = require('body-parser');
const { fetch } = require('fetch-ponyfill')();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// POST endpoint to handle sending email
app.post('/sendEmail', async (req, res) => {
    try {
        const { to, subject, body } = req.body;

        // Constructing a beautiful email body with HTML
        let ebody = `
            <div style="font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px;">
                <h2 style="color: #008000;">Welcome to Cognito!</h2>
                <p>
                    Thank you for joining Cognito, your platform for submitting minor projects. We are excited to have you on board!
                </p>
                <p>
                    If you have any questions or need assistance, feel free to contact us at sarthak25ic0492satiengg.in.
                </p>
                <p>
                    Best regards,<br/>
                    The Cognito Team
                </p>
            </div>
        `;
        // Send email using fetch
        const response = await fetch('https://smtpjs.com/v3/smtpjs.aspx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                SecureToken: "0e1d89e2-11f5-4e3e-9d80-b6bc994f6135",
                To: to,
                From: "sarthak25ic049@satiengg.in",
                Subject: subject,
                Body: ebody,
                Action: "Send" // Add Action property
            })
        });
       
        if (response.ok) {
            const data = await response.text();
            console.log(data); 
            res.send('Email sent successfully');
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
