import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginForm = () => {
  const { login } = useAuth(); // Destructure login from useAuth
  const navigate = useNavigate(); // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage(""); // Reset error message before new login attempt

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const responseData = await response.json(); // Renamed to responseData for clarity
    console.log("Login response:", responseData);

    if (!response.ok) {
      throw new Error(responseData.message || "Invalid email or password");
    }

    if (responseData.success) {
      // Check if responseData.data exists
      if (!responseData.data) {
        throw new Error("Invalid response from server: data is missing");
      }

      // Check if responseData.data.user exists
      if (!responseData.data.user) {
        throw new Error("Invalid response from server: user data is missing");
      }

      // Check if responseData.data.token exists
      if (!responseData.data.token) {
        throw new Error("Invalid response from server: token is missing");
      }

      // Call the login function from AuthContext to store user and token
      login(responseData);

      // Save token to localStorage
      localStorage.setItem("token", responseData.data.token);

      console.log("Login successful:", responseData.data.user);

      // Redirect based on user role
      switch (responseData.data.user.role) {
        case "teacher":
          navigate("/teachermeeting"); // Redirect to teacher meeting page
          break;
        case "parent":
          navigate("/parentmeeting"); // Redirect to parent meeting page
          break;
        case "admin":
          navigate("/registering"); // Redirect to registering page
          break;
        case "superadmin":
          navigate("/addadmin"); // Redirect to add admin page
          break;
        default:
          navigate("/"); // Default redirect to home page
      }
    } else {
      console.error("Login failed:", responseData.message);
      setErrorMessage(responseData.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    setErrorMessage(error.message); // Set error message in state
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Show error message if any */}
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      <h2 className="text-xl font-bold">Login</h2>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          User Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 text-gray-400" />
            ) : (
              <FaEye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;