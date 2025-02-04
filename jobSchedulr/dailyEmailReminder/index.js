const cron = require('node-cron')
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
});

//every 1: 00 PM excute this task 

cron.schedule('10 20 13 * * *', () => {
    console.log('Sending second reminder email...');
  
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: 'ankitanjana23@gmail.com',
      subject: 'Daily Reminder for lunch',
      text: 'Can we all go for lunch',
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    // console.log('Stopping PM2 process...');
    // process.exit(); // Exit the script after execution
  });
  
  console.log('Scheduled daily reminder email.');

  