import React from 'react';
import { FaBullhorn, FaUserShield, FaSchool, FaUsers, FaChartBar, FaCog } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-white border-r">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <img src="/eduteach-logo.png" alt="EduTeach" className="h-8" />
          <span className="text-xl font-bold text-primary">EduTeach</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <img src="/profile.jpg" alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="font-semibold">Admin Name</h3>
              <p className="text-sm text-gray-500">Branch Administrator</p>
            </div>
          </div>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-primary bg-blue-50 rounded-lg">
                <FaBullhorn className="text-lg" />
                <span>Announcements</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaUserShield className="text-lg" />
                <span>Staff Management</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaSchool className="text-lg" />
                <span>Branch Details</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaUsers className="text-lg" />
                <span>Students</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaChartBar className="text-lg" />
                <span>Reports</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaCog className="text-lg" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;