import React from 'react';
import { FaBell, FaCog, FaPlus } from 'react-icons/fa'; 

const Header = ({ onSettingsClick, isSettingsView }) => { 
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <span className="font-medium">Add Learning</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FaBell className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <img src="https://via.placeholder.com/32" alt="Profile" className="rounded-full w-8 h-8" />
          <button
            onClick={onSettingsClick} 
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isSettingsView ? ( 
              <FaPlus className="text-gray-600" /> 
            ) : (
              <FaCog className="text-gray-600" /> 
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;