import React from 'react';
import { useAuth } from "../context/AuthContext";
import { FaGraduationCap, FaTachometerAlt, FaBell, FaSchool, FaUserCog, FaUserGraduate, FaQuestionCircle, FaHeadphones, FaBook } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation to get the current route

  const menuItems = [
    //{ icon: <FaGraduationCap />, text: 'EduAdmin', isHeader: true },
    { icon: <FaBell />, text: 'Announcements', path: '/superadminannouncement' }, // Added path for Announcements
    { icon: <FaSchool />, text: 'Add School', path: '/addSchool' }, // Added path for Add School
    { icon: <FaUserCog />, text: 'Add Admin', path: '/addadmin' }, // Added path for Add Admin
    { icon: <FaBook />, text: 'Add Lessons', path: '/addlesson' },
    { icon: <FaQuestionCircle />, text: 'Q&A Management', path: '/SuperAdminq&a' },
    { icon: <FaHeadphones />, text: 'Learing', path: '/addLearningPage' } // Added path for Q&A Management
  ];

  // Function to handle menu item clicks
  const handleMenuItemClick = (path) => {
    if (path) {
      navigate(path); // Navigate to the specified path
    }
  };

  return (
    <div className="fixed w-64 h-screen bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer text-blue-600 font-bold text-lg">
          <FaGraduationCap />
          <span>Kinderzone</span>
        </div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
          </div>
          <div>
            {user ? ( // Check if user exists
              <>
                <h3 className="font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
                <p className="text-sm text-gray-500">{user.role}</p>
              </>
            ) : (
              <h1>User not logged in</h1>
            )}
          </div>
        </div>
        <nav>
          {menuItems.map((item, index) => {
            // Check if the current route matches the item's path
            const isActive = location.pathname === item.path;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer ${item.isHeader
                    ? 'text-blue-600 font-bold text-lg' // Header styles
                    : isActive
                      ? 'bg-blue-600 text-white' // Active styles
                      : 'text-gray-700 hover:bg-gray-100' // Default styles
                  }`}
                onClick={() => handleMenuItemClick(item.path)} // Add onClick handler
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;