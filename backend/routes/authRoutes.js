const express = require("express");
const router = express.Router();
const admin = require("../firebase/firebase");
const jwt = require("jsonwebtoken");

router.post("/verify", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    const sessionToken = jwt.sign(
      { firebaseUID: decodedToken.uid },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    return res.json({
      success: true,
      uid: decodedToken.uid,
      phone: decodedToken.phone_number,
      sessionToken,
    });
  } catch (err) {
     // ❌ no internal error leaks
    return res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
