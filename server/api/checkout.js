'use strict';
const router = require('express').Router()
const nodemailer = require('nodemailer');
// const { Category, Product } = require('../db/models')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: process.env.GMAIL_USERNAME,
         pass: process.env.GMAIL_PASSWORD

     }
 });


router.post('/', (req, res, next) => {
  const mailOptions = {
    from: process.env.GMAIL_USERNAME, // sender address
    to: 'brainomite@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {res.send(err)}
    else {res.send(info);}
  });
})


module.exports = router
