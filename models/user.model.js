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
      html: `<h2>Thanks for purchasing</h2> <p>We Will contact you shortly for your order</p> <p>Author: ${doc.author}</p><p>Book Title: ${doc.title}</p><p>Shipping address:${doc.address}</p>`,
    });
  } catch (err) {
    console.log(err);
  }
});

const userModel = new mongoose.model("User", userSchema);

module.exports = {
  userModel,
};
