const express = require("express");
const router = express.Router();
const { askChatbot, getHistory } = require("../controllers/chatbotController");

router.post("/ask", askChatbot);
router.get("/history/:sessionId", getHistory);

module.exports = router;
