import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:9898/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:9898/api/user/profile", profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
      });
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>

      {/* Non-editable fields */}
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          value={profile.username}
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={profile.email}
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>

      {/* Editable fields */}
      {["firstName", "lastName", "phoneNumber", "street", "city", "state", "postalCode", "country"].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block text-gray-700 capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={profile[field] || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save Profile
      </button>
    </div>
  );
}
