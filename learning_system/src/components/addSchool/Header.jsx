import React from 'react';
import { FaBell, FaCog } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Dashboard</span>
        <span className="text-gray-500">/</span>
        <span className="font-medium">Add School</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FaBell className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <img src="https://via.placeholder.com/32" alt="Profile" className="rounded-full w-8 h-8" />
          <FaCog className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default Header;