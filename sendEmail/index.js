const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const Joi = require("joi");
const {SMTP_PASS,SMTP_EMAIL,PORT} = require('./env')
// require("dotenv").config();
// const PORT = PORT || 3000;

const app = express();
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASS,
  },
});

const schema = Joi.object({
  email: Joi.string().email().required(),
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(5).required(),
});

app.post("/mailSend", async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, title, content } = req.body;

    let mailOptions = {
      from: SMTP_EMAIL,
      to: email,
      subject: title,
      text: content,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return res.status(201).json({message:"Email Send Successfully"})

  } catch (err) {
    console.error("error sending email", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Sendin mail using nodejs nodemailer package");
});

app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});
