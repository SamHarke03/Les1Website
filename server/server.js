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

app.get('/', (req, res) => {
    res.send("Hallo wereld!");
});

app.post('/form', (req, res) => {
    console.log(req.body);

    let email = req.body.email;
    let phone  = req.body.phone;
    let name = req.body.name;
    let message = req.body.message;

    transport.sendMail({
        from: 'info@samharke.nl',
        to: email,
        subject: 'Contactformulier',
        text: "Bedankt voor je bericht, " + name + "! Dit was je bericht: " + message + ". We komen hier zo snel mogelijk bij je op terug!"
    }, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Failed to send email");
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send("Email sent successfully");
        }
    });

    res.json({email: email, phone: phone, name: name, message: message});
});

app.listen(port, () => console.log(`Data API listening on port ${port}!`));
