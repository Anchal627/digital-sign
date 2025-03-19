import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useState } from "react";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(formData);

    if (response.token) {
      localStorage.setItem("token", response.token); // Store token in localStorage
      navigate("/"); // Redirect after successful login
    } else {
      alert(response.message || "Invalid credentials");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 underline ml-1"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
