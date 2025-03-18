import React from 'react';
import { FaGraduationCap, FaBullhorn, FaCalendar, FaUserCheck, FaBook, FaChartBar, FaQuestionCircle, FaHeadphones } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation to get the current route

  const menuItems = [
    { icon: <FaBullhorn />, text: 'Announcement', path: '/teacherannouncement' }, // Added path for Announcement
    { icon: <FaCalendar />, text: 'Meeting', path: '/teachermeeting' }, // Added path for Meeting
    { icon: <FaUserCheck />, text: 'Attendance', path: '/attendance' }, // Added path for Attendance
    { icon: <FaUserCheck />, text: 'Student Profile', path: '/teacherSProfile' }, // Added path for Attendance
    { icon: <FaBook />, text: 'Lessons', path: '/lessons' }, // Added path for Lessons
    { icon: <FaChartBar />, text: 'Progress', path: '/progress' }, // Added path for Progress
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
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <div className="items-center gap-3 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-lg mb-2 text-blue-600 font-bold text-lg">
            <FaGraduationCap />
            <span>EduTeach</span>
          </div>

          <h3 className="font-semibold ml-2">Sarah Wilson</h3>
          <p className="text-sm text-gray-500 ml-2">Teacher</p>
        </div>
        <nav>
          {menuItems.map((item, index) => {
            // Check if the current route matches the item's path
            const isActive = location.pathname === item.path;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white' // Apply active styles
                    : 'text-gray-700 hover:bg-gray-100' // Apply default styles
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