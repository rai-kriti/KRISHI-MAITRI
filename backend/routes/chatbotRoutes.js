const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { askChatbot, getHistory } = require("../controllers/chatbotController");

// 🔐 protect chatbot routes
router.post("/ask", authMiddleware, askChatbot);
router.get("/history/:sessionId", authMiddleware, getHistory);

module.exports = router;
