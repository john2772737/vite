const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your email service provider
    auth: {
      user: 'johnregulacion5555@gmail.com',
      pass: 'zmqt ujkz pdle amji',
    },
  });

  module.exports = transporter;