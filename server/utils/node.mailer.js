const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your email service provider
    auth: {
      user: 'booklot12@gmail.com',
      pass: 'john1026',
    },
  });

  module.exports = transporter;