import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileWidget() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProfile(data.profile);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow">
        Loading profile...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div
      onClick={() =>
        navigate("/profile", { state: { fromDashboard: true } })
      }
      className="bg-white rounded-2xl p-6 shadow
                 cursor-pointer hover:shadow-md transition"
    >
      <h3 className="text-2xl font-semibold mb-6">
        Your Farm Profile
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Item label="Location" value={profile.state} />
        <Item label="Soil Type" value={profile.soilType} />
        <Item
          label="Land Size"
          value={
            profile.landSize
              ? `${profile.landSize} acres`
              : "-"
          }
        />
        <Item label="Pincode" value={profile.pincode} />
      </div>
    </div>
  );
}

function Item({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-1">
        {label}
      </p>
      <p className="text-lg font-semibold text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
}
