const nodemailer = require("nodemailer");

const express = require("express");
const UserModel = require("../models/UserModel")
const SponsorModel = require("../models/SponsorModel")

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

const sendAll = async(req, res) =>{
  try {
    let users;
    let {department,subject,message} = req.body
    if (department === "All") {
        // Retrieve all users' email ids
        users = await UserModel.find({}, 'email');
    } else if (department === "Sponsor"){
      users = await SponsorModel.find({}, 'email')
    } 
    else {
        // Retrieve users' email ids based on department
        users = await UserModel.find({ department: department }, 'email');
    }
    console.log(users)

    // Extract email ids from users
    const emailIds = users.map(user => user.email);
    console.log(emailIds)
    // Send email to the extracted email ids
    await sendMail({
        to: emailIds,
        name: "something",
        subject: subject,
        body: message,
    });

    console.log('Emails sent successfully.');
    res.status(200).json({ message: "email sent successfully" });
} catch (error) {
    // Handle error
    console.error('Error sending emails:', error);
    res.status(400).json({ message: "email sending failed" });
}
}

module.exports = {
  send,
  sendAll
};
