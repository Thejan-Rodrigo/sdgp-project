import React from 'react';
import { FaGraduationCap, FaBell, FaUserPlus, FaUserGraduate, FaQuestionCircle, FaHeadphones } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { icon: <FaGraduationCap />, text: 'EduTeach', isHeader: true },
    { icon: <FaBell />, text: 'Announcements' },
    { icon: <FaUserPlus />, text: 'Register', isActive: true },
    { icon: <FaUserGraduate />, text: 'Student Profile' },
    { icon: <FaQuestionCircle />, text: 'Q&A' },
    { icon: <FaHeadphones />, text: 'Help & Support' },
  ];

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
    </div>
  );
};

export default Sidebar;