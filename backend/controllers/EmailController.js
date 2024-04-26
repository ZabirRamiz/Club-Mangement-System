const nodemailer = require("nodemailer");

const express = require("express");
const UserModel = require("../models/UserModel")
const SponsorModel = require("../models/SponsorModel")

async function sendMail({ to, name = 'None', subject, body, cc = [], bcc = []}) {
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
      cc,
      bcc
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

// // const sendAll = async(req, res) =>{
//   try {
//     let users;
//     let {department,subject,message} = req.body
//     if (department === "All") {
//         // Retrieve all users' email ids
//         users = await UserModel.find({}, 'email');
//     } else if (department === "Sponsor"){
//       users = await SponsorModel.find({}, 'email')
//     } 
//     else {
//         // Retrieve users' email ids based on department
//         users = await UserModel.find({ department: department }, 'email');
//     }
//     console.log(users)

//     // Extract email ids from users
//     const emailIds = users.map(user => user.email);
//     console.log(emailIds)
//     // Send email to the extracted email ids
//     await sendMail({
//         to: emailIds,
//         name: "something",
//         subject: subject,
//         body: message,
//     });

//     console.log('Emails sent successfully.');
//     res.status(200).json({ message: "email sent successfully" });
// } catch (error) {
//     // Handle error
//     console.error('Error sending emails:', error);
//     res.status(400).json({ message: "email sending failed" });
// }
// }


// const sendAll = async (req, res) => {
//   try {
//     let users;
//     let {department,subject,message} = req.body
//     if (department === "All") {
//         // Retrieve all users' email ids
//         users = await UserModel.find({}, 'email');
//     } else if (department === "Sponsor"){
//       users = await SponsorModel.find({}, 'email')
//     } 
//     else {
//         // Retrieve users' email ids based on department
//         users = await UserModel.find({ department: department }, 'email');
//     }
//     console.log(users)

//     // Extract email ids from users
//     const emailIds = users.map(user => user.email);
//     console.log(emailIds)
//     // Send email to the extracted email ids
//     await sendMail({
//         to: emailIds,
//         name: "something",
//         subject: subject,
//         body: message,
//     });

//     console.log('Emails sent successfully.');
//     res.status(200).json({ message: "email sent successfully" });
// } catch (error) {
//     // Handle error
//     console.error('Error sending emails:', error);
//     res.status(400).json({ message: "email sending failed" });
// }
// }


const sendAll = async (req, res) => {
  try {
    let users;
    let {  department,  subject,  message  } = req.body;
;

    if (department === "All") {
      // Retrieve all users' email ids
      users = await UserModel.find({}, 'email designation');
    } else if (department === "Sponsor") {
      users = await SponsorModel.find({}, 'email');
    } else {
      // Retrieve users' email ids based on department
      users = await UserModel.find({ department: department }, 'email designation');
      // Retrieve all users' email ids
      users = await UserModel.find({}, 'email designation');
    } 
    console.log(users);
    console.log(users);

    // Extract email ids from users
    const emailIds = users.map(user => user.email);
    console.log(emailIds);

    // Extract email ids for CC and BCC
    const ccEmailIds = [];
    const bccEmailIds = [];
    users.forEach(user => {
      if (user.designation === "Executive Body" || user.designation === "Governing Body") {
        ccEmailIds.push(user.email);
      } else {
        if (user.designation !== "Pending" )
        bccEmailIds.push(user.email);
      }

      console.log(ccEmailIds)
      console.log(bccEmailIds)
    });

    // Send email to the extracted email ids with CC and BCC
    await sendMail({
      to: "", // Leave empty for now
      name: "something",
      subject: subject,
      body: message,
      cc: ccEmailIds.join(','), // Join CC email ids with commas
      bcc: bccEmailIds.join(','), // Join BCC email ids with commas
    });

    console.log('Emails sent successfully.');
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    // Handle error
    console.error('Error sending emails:', error);
    res.status(400).json({ message: "Email sending failed" });
  }
};



module.exports = {
  send,
  sendAll
}


