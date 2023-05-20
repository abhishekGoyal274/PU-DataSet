const mongoose = require("mongoose");
const express = require("express");
const nodemailer = require("nodemailer");


const ReqAllDataSetController = async (req, res) => {
  const obj = req.body;
console.log(" --------in ");
  const output = `
        <h1>A new dataset request for ${obj.dataSetName} </h1>
          <p><b>Name</b>: ${obj.firstName} ${obj.lastName}</p>
          <p><b>Phone-No.</b>: ${obj.phone}</p>
          <p><b>Title</b>: ${obj.title}</p>
          <p><b>Course Enrolled</b>: ${obj.courseEnrolled}</p>
          <p><b>College</b>:${obj.collegeName}</p>
          <p><b>University</b>: ${obj.universityName}</p>
          <p><b>mentorName</b>: ${obj.mentorName}</p>
        `;
  try {
    let transporter = nodemailer.createTransport({
      service: "hotmail",
      port: 25,
      auth: {
        user: "newbot--aa--7895@outlook.com", // generated ethereal user
        pass: "DicDataSet@123", // generatDed ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log('transporter->',transporter);
    // setup email data with unicode symbols
    let mailOptions = {
      from: "newbot--aa--7895@outlook.com", // sender address
      to: "goyalhitanshu24@gmail.com", // list of receivers
      subject: "Node Request Form", // Subject line
      text: "A new dataset request", // plain text body
      html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        return;
      }
console.log('-------out');
      // console.log("Message sent: %s", info.messageId);
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      console.log("Message sent: %s", info.response);
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    res.send("sent ");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
  // create reusable transporter obj`ect using the default SMTP transport
};

module.exports = { ReqAllDataSetController };