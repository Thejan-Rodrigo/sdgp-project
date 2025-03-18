import React from 'react';
import { FaHome, FaCalendar, FaUser, FaChartBar, FaQuestionCircle } from 'react-icons/fa';
import ParentProfile from './ParentProfile';

const ParentNav = () => {
  const menuItems = [
    { icon: <FaHome />, text: 'Announcements' },
    { icon: <FaCalendar />, text: 'Meeting Schedule' },
    { icon: <FaUser />, text: 'Student Profile' },
    { icon: <FaChartBar />, text: 'Learning Progress' },
    { icon: <FaQuestionCircle />, text: 'Q&A' }
  ];

  return (
    <div className="w-64 h-screen bg-gray-50 border-r p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600">EduTeach</h1>
      </div>
      <ParentProfile />
      <nav>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer mb-2"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default ParentNav