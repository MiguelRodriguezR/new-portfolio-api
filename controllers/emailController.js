const nodemailer = require('nodemailer');
require('dotenv').config({ path: 'variables.env'})

exports.sendEmail = async (req, res) =>{ 
    try {

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
         });

        const mailOptions = {
            from: process.env.EMAIL,
            to: 'miguel.a.rodriguez.r@gmail.com',
            subject: `Portfolio Message from: ${req.body.visitorEmail}`,
            text: `${req.body.visitorEmail} says: ${req.body.message}`
        };


        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });
         
    } catch (error) {
        console.log(error);
        res.status(500).send('internal error')
    }
}