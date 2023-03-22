const nodemailer = require('nodemailer');

const sendEmail = async ({
  to, subject, text, html,
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_hOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"mbkProgrammer 👻" mbk2019.co@gmail.com', // sender address
    to,
    subject,
    text,
    html,
  });

  console.log('Message sent: %s', info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = sendEmail;
