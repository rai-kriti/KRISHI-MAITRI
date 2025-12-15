import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("http://localhost:5000/api/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        },
      });

      const data = await res.json();
      setProfile(data.profile);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="p-6">Loading profile...</p>;

  if (!profile) return <p className="p-6">No profile found</p>;

  return (
    <div className="min-h-screen bg-[#F5F1EB] p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        <ProfileItem label="Name" value={profile.name} />
        <ProfileItem label="Phone" value={profile.phoneNumber} />
        <ProfileItem label="Pincode" value={profile.pincode} />
        <ProfileItem label="State" value={profile.state} />
        <ProfileItem label="District" value={profile.district} />
        <ProfileItem label="City / Village" value={profile.cityVillage} />
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-medium">{value || "-"}</p>
    </div>
  );
}
