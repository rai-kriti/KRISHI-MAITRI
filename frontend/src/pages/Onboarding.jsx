import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    pincode: "",
    state: "",
    district: "",
    cityVillage: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.name || !form.pincode) {
      alert("Name and Pincode are required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/user/onboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("userName", data.profile.name);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Tell us about you</h1>

      {["name", "pincode", "state", "district", "cityVillage"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.replace(/([A-Z])/g, " $1")}
          className="w-full p-3 border rounded mb-4"
          value={form[field]}
          onChange={handleChange}
        />
      ))}

      <button
        onClick={submit}
        className="w-full bg-green-600 text-white py-3 rounded"
      >
        Continue
      </button>
    </div>
  );
}
