import React from 'react';
import { FaBullhorn, FaCalendarAlt, FaUserGraduate, FaBook, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const TeacherSidebar = () => {
  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <img src="/eduteach-logo.png" alt="KinderZone" className="h-8" />
          <span className="text-xl font-bold text-primary">KinderZone</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <img src="/profile.jpg" alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="font-semibold">Kalin Kavishka</h3>
              <p className="text-sm text-gray-500">Primary Teacher</p>
            </div>
          </div>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-primary bg-blue-50 rounded-lg">
                <FaBullhorn className="text-lg" />
                <span>Announcement</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaCalendarAlt className="text-lg" />
                <span>Meeting</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaUserGraduate className="text-lg" />
                <span>Attendance</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaBook className="text-lg" />
                <span>Lessons</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaQuestionCircle className="text-lg" />
                <span>Q&A</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Logout Button */}
      <div className="p-4 border-t">
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default TeacherSidebar;
