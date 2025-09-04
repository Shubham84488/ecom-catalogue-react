import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "User",
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // use the appropriate signup endpoint, change that as needed
      const response = await axios.post("http://localhost:9898/api/auth/signup", user);
      toast.success(response.data.message || "Signup successful!");
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data || "Signup Unsuccessful");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen ">
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6  text-primary">Sign Up</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-3 border rounded-md"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-md"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-md"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    className="w-full p-3 border rounded-md"
                    value={user.role}
                    onChange={handleChange}
                    >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Sign Up</button>
            </form>
        </div>
    </div>
  );
}
