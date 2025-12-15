import { useState } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async () => {
    try {
      if (phone.length !== 10) {
        setError("Enter a valid 10 digit mobile number");
        return;
      }

      setLoading(true);
      setError("");

      const fullPhone = `+91${phone}`;

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhone,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;
      setOtpSent(true);
    } catch (err) {
      setError("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

 const verifyOtp = async () => {
  try {
    if (otp.length !== 6) {
      setError("Enter 6 digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    // 🔐 Firebase OTP verify
    const result = await window.confirmationResult.confirm(otp);
    const user = result.user;

    const firebaseIdToken = await user.getIdToken();

    // 🔁 Backend auth
    const response = await fetch("http://localhost:5000/api/auth/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firebaseIdToken}`,
      },
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error("Auth failed");
    }

    // 💾 save session token
    localStorage.setItem("sessionToken", data.sessionToken);

    // 🔥 FETCH PROFILE
    const meRes = await fetch("http://localhost:5000/api/user/me", {
      headers: {
        Authorization: `Bearer ${data.sessionToken}`,
      },
    });

    const meData = await meRes.json();

    // 🧭 ROUTING LOGIC
    if (meData.profile === null) {
      navigate("/onboarding"); // 🆕 new user
    } else {
      localStorage.setItem("userName", meData.profile.name || "");
      navigate("/dashboard"); // 👤 existing user
    }
  } catch (err) {
    console.error(err);
    setError("Invalid OTP. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          Sign in to Krishi Maitri
        </h2>

        <p className="text-sm text-center opacity-80 mb-6">
          Secure login using your mobile number
        </p>

        {!otpSent && (
          <>
            <div className="flex items-center border border-white/20 rounded-xl overflow-hidden mb-4">
              <span className="px-3 text-sm opacity-80">+91</span>
              <input
                className="bg-transparent p-3 w-full outline-none text-white placeholder-white/60"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
              />
            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-400 text-green-900 font-medium active:scale-95 transition disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {otpSent && (
          <>
            <input
              className="bg-transparent border border-white/20 rounded-xl p-3 w-full mb-4 outline-none text-white placeholder-white/60"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-400 text-green-900 font-medium active:scale-95 transition disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {error && (
          <p className="text-sm text-red-300 text-center mt-4">{error}</p>
        )}

        <div id="recaptcha-container"></div>
      </motion.div>
    </div>
  );
}
