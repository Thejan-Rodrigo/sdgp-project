import React from 'react';
import { FaBullhorn, FaBuilding, FaUserTie, FaChartLine, FaCog, FaGlobe } from 'react-icons/fa';

const SuperAdminSidebar = () => {
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
              <h3 className="font-semibold">Super Admin</h3>
              <p className="text-sm text-gray-500">System Administrator</p>
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
                <FaBuilding className="text-lg" />
                <span>Branch Management</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaUserTie className="text-lg" />
                <span>Admin Management</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaChartLine className="text-lg" />
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaGlobe className="text-lg" />
                <span>Global Settings</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaCog className="text-lg" />
                <span>System Config</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;