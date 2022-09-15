const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);

  console.log("body:",body);

  const message = `
    Name: ${body.enteredName}\r\n
    Email: ${body.enteredEmail}\r\n
    Phone Number: ${body.enteredPhone}\r\n
    Company Name: ${body.enteredCompanyname}\r\n
    Company website: ${body.enteredCompanywebsite}\r\n
    Message: ${body.enteredMessage}
  `;

  await mail.send({
    to: 'hello@viol.tech',
    from: 'yutidesai@viol.tech',
    subject: 'New Message!',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  });

  res.status(200).json({ status: 'Ok' });
}
