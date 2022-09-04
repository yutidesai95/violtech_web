const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Phone Number: ${body.phone}}\r\n
    Company Name: ${body.companyname}}\r\n
    Company website: ${body.companywebsite}}\r\n
    Message: ${body.message}
  `;

  await mail.send({
    to: 'hello@viol.tech',
    from: 'hello@viol.tech',
    subject: 'New Message!',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  });

  res.status(200).json({ status: 'Ok' });
}
