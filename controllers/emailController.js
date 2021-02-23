const nodemailer = require("nodemailer");
require("dotenv").config({ path: "variables.env" });
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("err", err);
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    return transporter;
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.MYEMAIL,
      subject: `Portfolio Message from: ${req.body.visitorEmail}`,
      text: `${req.body.visitorEmail} says: ${req.body.message}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send(500, error.message);
      } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  }
};
