import React from 'react';
import { FaBullhorn, FaCalendar, FaClipboardList, FaBook, FaChartBar, FaChalkboardTeacher, FaQuestionCircle, FaLifeRing } from 'react-icons/fa';
import TeacherProfile from './TeacherProfile';

const TeacherNav = () => {
  const menuItems = [
    { icon: <FaBullhorn />, text: 'Announcement' },
    { icon: <FaCalendar />, text: 'Meeting' },
    { icon: <FaClipboardList />, text: 'Attendance' },
    { icon: <FaBook />, text: 'Lessons' },
    { icon: <FaChartBar />, text: 'Progress' },
    { icon: <FaChalkboardTeacher />, text: 'Teaching' },
    { icon: <FaQuestionCircle />, text: 'Q&A' },
    { icon: <FaLifeRing />, text: 'Help & Support' }
  ];

  return (
    <div className="w-64 h-screen bg-gray-50 border-r p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600">EduTeach</h1>
      </div>
      <TeacherProfile />
      <nav>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer mb-2 ${
              item.text === 'Teaching' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default TeacherNav;