import React from 'react';
import { FaGraduationCap, FaBell, FaUserPlus, FaUserGraduate, FaQuestionCircle, FaHeadphones } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation to get the current route

  const menuItems = [
    { icon: <FaGraduationCap />, text: 'EduTeach', isHeader: true },
    { icon: <FaBell />, text: 'Announcements', path: '/adminannouncement' }, // Added path for Announcements
    { icon: <FaUserPlus />, text: 'Register', path: '/registering' }, // Added path for Register
    { icon: <FaUserGraduate />, text: 'Student Profile', path: '/studentprofile' }, // Added path for Student Profile
    { icon: <FaQuestionCircle />, text: 'Q&A', path: '/qa' }, // Added path for Q&A
    { icon: <FaHeadphones />, text: 'Help & Support', path: '/support' }, // Added path for Help & Support
  ];

  // Function to handle menu item clicks
  const handleMenuItemClick = (path) => {
    if (path) {
      navigate(path); // Navigate to the specified path
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <FaUserGraduate className="text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold">Admin User</h3>
            <p className="text-sm text-gray-500">System Administrator</p>
          </div>
        </div>
        <nav>
          {menuItems.map((item, index) => {
            // Check if the current route matches the item's path
            const isActive = location.pathname === item.path;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer ${
                  item.isHeader
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