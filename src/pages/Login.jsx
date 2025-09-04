import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role:"User"
  });
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form)
      const response = await axios.post("http://localhost:9898/api/auth/login", form);
      localStorage.setItem("jwt", response.data.token);
      toast.success(response.data?.message || "Login successful!");
      navigate('/')

    } catch (error) {
      toast.error(error.response?.data|| "Login Unsuccessful");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen ">
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Login</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-3 border rounded-md"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-md"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    className="w-full p-3 border rounded-md"
                    value={form.role}
                    onChange={handleChange}
                    >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Login</button>
            </form>
        </div>
    </div>
  );
}
