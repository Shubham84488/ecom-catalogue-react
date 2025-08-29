import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "User",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Send form to API or store it
    console.log("Signup form:", form);
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
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-md"
                    value={form.email}
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
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Sign Up</button>
            </form>
        </div>
    </div>
  );
}
