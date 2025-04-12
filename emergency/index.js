const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // secure CORS
app.use(express.json());

// POST /send-email
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'siyaram1821@gmail.com',
      pass: 'nhjk hehh muxf xsch', // app password
    },
  });

  const mailOptions = {
    from: 'siyaram1821@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending email', error: err });
  }
});

app.listen(8080, () => console.log('✅ Server started on port 8080'));
