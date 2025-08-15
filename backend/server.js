const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser=require('cookie-parser')
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the backend server");
});


app.listen(PORT, () => {
  console.log("Server is running on Port", PORT);
});
