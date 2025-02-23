import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth hook
import Logo from "./Logo";

export default function HomeNavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user & logout function from context

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => navigate("/")}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              Home
            </button>
            <button className="text-gray-700 hover:text-primary focus:outline-none">
              Teachers
            </button>
            <button className="text-gray-700 hover:text-primary focus:outline-none">
              Parent
            </button>
            <button
              onClick={() => navigate("/aboutus")}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              About
            </button>
          </div>


          {/* Conditional rendering for Login/Logout button */}
          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/login"); // Redirect to login after logout
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
