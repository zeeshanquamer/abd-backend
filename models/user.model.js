const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: { type: String },
  phone: { type: Number },
  message: { type: String },
  title: { type: String },
  author: { type: String },
  address: { type: String },
});

userSchema.post("save", async function (doc) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "zeeshan.report@gmail.com",
        pass: "borzwudwbhvsjztm",
      },
    });

    const info = await transporter.sendMail({
      from: "ABDONLINE",
      to: doc.email,
      subject: "Purchased Successfully",
      html: `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Course Registration Confirmation</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #FFD60A;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
             
              <div class="message">Thanks for Purchasing</div>
              <div class="body">
                  <p>Dear ${doc.name},</p>
                  <p>You have successfully Purchased <span class="highlight">${doc.title}</span> of Author <span class="highlight"> ${doc.author} </span>. We
                      are excited to have you as our Valuable Customer!</p>
                  <p>Shipping Address : ${doc.address}
                  </p>
                  <p>Please Confirm Your Address We Will contact you shortly on Your Contact Number:  ${doc.phone}</p>
                  <a class="cta" href="https://abd-online.vercel.app/">Go to Store</a>
              </div>
              <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                      href="mailto:info@abd-online.vercel.app">info@abd-online.vercel.app</a>. We are here to help!</div>
          </div>
      </body>
      
      </html>`,
    });
  } catch (err) {
    console.log(err);
  }
});

const userModel = new mongoose.model("User", userSchema);

module.exports = {
  userModel,
};
