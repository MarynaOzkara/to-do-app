const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const cors = require("cors");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://ozkaramaryna:jFDxgio1j0V45mle@cluster0.1oezb.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log("Error to connection to MongoDb", err);
  });
app.listen(port, () => {
  console.log("Server is running on PORT 3000");
});

const generatesecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generatesecretKey();

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      console.log("User is already exist");
      res.status(409).json({ message: "User is already exist" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error registering user", error);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json("Invalid password or email");
    }
    if (user.password !== password) {
      res.status(401).json("Invalid password or email");
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error login user", error);
  }
});
