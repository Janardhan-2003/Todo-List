const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes=require('./routes/todo.routes')
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/todo', todoRoutes);


app.listen(PORT, () => {
  console.log("Server is running on Port", PORT);
});
