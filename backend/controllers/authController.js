const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const User = require("../models/Farmer");

exports.verifyOTPLogin = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const firebaseToken = authHeader.split(" ")[1];

    // verify firebase token
    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    const firebaseUID = decoded.uid;
    const phoneNumber = decoded.phone_number;

    // check farmer
    let user = await Farmer.findOne({ firebaseUID });

    // first time login = signup
    if (!user) {
      user = await Farmer.create({
        firebaseUID,
        phoneNumber
      });
    }

    // create 1 hour session
    const sessionToken = jwt.sign(
      { firebaseUID },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      success: true,
      sessionToken
    });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
