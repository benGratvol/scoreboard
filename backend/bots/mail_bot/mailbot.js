const mail_config = require("../../configs/mail_config");
const nodemailer = require("nodemailer");

const sendMail = {
  init: () => {
    this.transporter = nodemailer.createTransport({
      host: mail_config.hostname,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: mail_config.user, // generated ethereal user
        pass: mail_config.pass // generated ethereal password
      }
    });
  },
  byPlainTextMail: async mailObj => {
    const { from, to, subject, text } = mailObj;
    const info = await this.transporter.sendMail({
      from: from, // '"Fred Foo 👻" <foo@example.com>'
      to: to, //  "bar@example.com, baz@example.com"
      subject: subject,
      text: text
    });
    return info;
  },
  Errormail: async err => {
    const errMessage = err;
    const mailcontent = `
    [-!-] THERE AWS A ERROR IN [-!-]
    error log ----> \n
    ${errMessage} 
    `;
    try {
      const info = await this.transporter.sendMail({
        from: mail_config.user,
        to: mail_config.user,
        subject: "THERE AWS A ERROR IN ",
        text: mailcontent
      });
      //   console.log(info.messageId);
      return info;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  byHTMLMail: async mailObj => {
    const { from, to, subject, html } = mailObj;
    const info = await this.transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: html
    });
    return info;
  },
  sendTestMail: async () => {
    //c2210661@urhen.com
    const info = await this.transporter.sendMail({
      from: mail_config.user,
      to: "c2210661@urhen.com",
      subject: "test mail",
      text: "this is a test mail second "
    });
    console.log(info);
    return info;
  }
};

/*
      console.log("Message sent: %s", byPlainTextMail.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  */

/// -------------------------sucsses respons ---------------------
// { accepted: [ 'benGratvol@outlook.com' ],
//   rejected: [],
//   envelopeTime: 351,
//   messageTime: 316,
//   messageSize: 283,
//   response: '250 2.0.0 Ok: queued as 2CD51384FDB8C',
//   envelope: { from: 'RoyKiahi@cock.li', to: [ 'benGratvol@outlook.com' ] },
//   messageId: '<9ecdf998-7586-4364-9502-5e3cd645c6b8@cock.li>' }
// ------------------------------------------------

const message = Object.create(sendMail);
message.init();
// message.Errormail();
// module.exports = Object.create(sendMail);
module.exports = message;
