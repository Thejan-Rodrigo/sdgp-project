import React from 'react';
import { FaGraduationCap, FaBullhorn, FaCalendar, FaUserCheck, FaBook, FaChartBar, FaQuestionCircle, FaHeadphones } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { icon: <FaBullhorn />, text: 'Announcement' },
    { icon: <FaCalendar />, text: 'Meeting', isActive: true },
    { icon: <FaUserCheck />, text: 'Attendance' },
    { icon: <FaBook />, text: 'Lessons' },
    { icon: <FaChartBar />, text: 'Progress' },
    { icon: <FaQuestionCircle />, text: 'Q&A' },
    { icon: <FaHeadphones />, text: 'Help & Support' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <div className="items-center gap-3 mb-8">
          <div class="flex items-center gap-3 p-3 rounded-lg mb-2 text-blue-600 font-bold text-lg">
          <FaGraduationCap />
          <span>EduTeach</span>
          </div>

          <h3 className="font-semibold ml-2">Sarah Wilson</h3>
          <p className="text-sm text-gray-500 ml-2">Teacher</p>

        </div>
        <nav>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg mb-2 ${item.isHeader ? 'text-blue-600 font-bold text-lg' :
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