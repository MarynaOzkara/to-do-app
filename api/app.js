const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json("Hello from backend TODO-APP");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
module.exports = app;
