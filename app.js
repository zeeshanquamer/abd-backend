const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userModel } = require("./models/user.model");
// const { userData } = require("./models/user.data");
const app = express();

app.use(cors());
app.use(express.json());
function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
}
function validPhone(phone) {
  var re = /^([+]\d{2})?\d{10}/;
  return re.test(phone);
}
app.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (name == "" || email == "" || message == "") {
    return res.json({ success: false, msg: "Please Fill All the Fields" });
  }
  let emailisValid = validateEmail(email);
  if (!emailisValid) {
    return res
      .status(400)
      .send({ success: false, msg: "Please enter valid email" });
  }
  try {
    const user = new userModel({
      name,
      email,
      message,
    });
    await user.save();
    res.status(200).send({
      success: true,
      msg: "your message sent successfully",
      messages: user,
    });
  } catch (error) {
    res.status(404).send({ success: false, msg: " something went wrong" });
  }
});

app.post("/books", async (req, res) => {
  const { name, title, author, address, phone, email } = req.body;
  if (
    (name == "" || title == "" || author == "" || address == "", email == "")
  ) {
    return res.json({ success: false, msg: "Please Fill all The Fields" });
  }

  let emailisValid = validateEmail(email);
  if (!emailisValid) {
    return res
      .status(400)
      .send({ success: false, msg: "Please enter valid email" });
  }
  let phonevalid = validPhone(phone);
  if (!phonevalid) {
    return res
      .status(400)
      .json({ success: false, msg: "Please enter valid Phone" });
  }
  try {
    const data = new userModel({ name, title, author, address, phone, email });
    await data.save();
    res
      .status(200)
      .send({ success: true, msg: "purchase Successful", purchases: data });
  } catch (error) {
    res.status(404).send({ success: false, msg: " something went wrong" });
  }
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected with db");
  } catch (error) {
    console.log(error);
  }
  console.log("server is running at PORT 8080");
});
