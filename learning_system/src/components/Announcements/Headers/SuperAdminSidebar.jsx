import React from 'react';
import { FaGraduationCap, FaTachometerAlt, FaBell, FaSchool, FaUserCog, FaUserGraduate, FaQuestionCircle, FaHeadphones, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { icon: <FaGraduationCap />, text: 'KinderZone', isHeader: true },
    { icon: <FaBell />, text: 'Announcements' },
    { icon: <FaTachometerAlt />, text: 'Dashboard' },
    { icon: <FaSchool />, text: 'Add School' },
    { icon: <FaUserCog />, text: 'Add Admin', isActive: true },
    { icon: <FaUserGraduate />, text: 'Student Profiles' },
    { icon: <FaQuestionCircle />, text: 'Q&A ' },
    { icon: <FaHeadphones />, text: 'Help & Support' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
          </div>
          <div>
            <h3 className="font-semibold">Kalin Dissanayaka</h3>
            <p className="text-sm text-gray-500">Super Administrator</p>
          </div>
        </div>
        <nav>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg mb-2 ${
                item.isHeader ? 'text-blue-600 font-bold text-lg' :
                item.isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;