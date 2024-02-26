const express = require('express');
const nodemailer = require('nodemailer'); // Import nodemailer
require('dotenv').config();

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Nodemailer configuration
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// HTML markup for header and footer
const header = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contactformulier</title>
    <style>
        body {
            font-family: 'Kollektif', sans-serif;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
        }
        footer {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>
    <header>
        <h1>Contactformulier</h1>
    </header>
`;

const footer = `
    <footer>
        <p>&copy; Copyright ${new Date().getFullYear()} | Sam Harke</p>
    </footer>
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send("Hallo wereld!");
});

app.post('/form', (req, res) => {
    console.log(req.body);

    const { email, phone, firstName, lastName, subject, message } = req.body;

    if (!email || !phone || !firstName || !lastName || !subject || !message) {
        return res.status(422).send("Een vereist veld is niet ingevuld!");
    }

    if (email.length > 80 || phone.length > 20 || firstName.length > 60 || lastName.length > 60 || subject.length > 200 || message.length > 600) {
        return res.status(501).send("Je hebt meer karakters dan toegestaan ingevoerd.");
    }

    const emailContent = `
    <p>Je hebt een bericht ontvangen van: <strong>${firstName} ${lastName}</strong></p>
    <p><strong>Onderwerp:</strong> ${subject}</p>
    <p><strong>Bericht:</strong> ${message}</p>
    <p>Dit persoon is te contacteren via: ${email} of ${phone}</p>
    `;

    const htmlEmail = `${header}${emailContent}${footer}`;

    transport.sendMail({
        from: email,
        to: 'sam.harke@windesheim.nl',
        subject: 'Contactformulier',
        html: htmlEmail,
    }, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Failed to send email");
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send("Email sent successfully");
        }
    });

    res.json({
        email: email,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        subject: subject,
        message: message
    });
});

app.listen(port, () => console.log(`Data API listening on port ${port}!`));
