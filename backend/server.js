require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const chatbotRoutes = require("./routes/chatbotRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/chatbot", chatbotRoutes);

// mongodb connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// start server
app.listen(5000, () => console.log("Server running on port 5000"));
