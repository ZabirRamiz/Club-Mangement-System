const nodemailer = require("nodemailer");

const express = require("express");

async function sendMail({ to, name, subject, body }) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });

    console.log(sendResult);

    return sendResult;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const send = async (req, res) => {
  console.log(req.body);
  const { send_to, subject, message } = req.body;
  await sendMail({
    to: send_to,
    name: "something",
    subject: subject,
    body: message,
  });
  console.log("email sent successfully");
  res.status(200).json({ message: "email sent successfully" });
};

module.exports = {
  send,
};
