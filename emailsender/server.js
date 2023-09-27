require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); // to parse the request body
const cors = require('cors')
const app = express();


app.use(bodyParser.json()); // to use JSON payloads

app.use(cors());  

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/api/contact', (req, res) => {
  const { email, name, message } = req.body;

  // Construct the email message
  const msg = {
    to: process.env.EMAIL_TO, // your email
    from: email, // sender's email
    subject: `New message from ${name}`,
    text: message,
  };

  // Send the email
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      // Send a response back to the frontend
      res.json({ message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error(error);
      // Send a response back to the frontend
      res.status(400).json({ error: 'Error sending email' });
    });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
