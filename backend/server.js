require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const mspRoutes = require("./routes/msp.routes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// middleware
app.use(cors());
app.use(express.json());



// mongodb connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// routes
app.use("/api/user", userRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/msp", mspRoutes);
app.use("/api/auth", authRoutes);

// start server
app.listen(5000, () => console.log("Server running on port 5000"));
