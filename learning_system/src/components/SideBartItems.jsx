import React from 'react';

const SidebarItem = ({ icon, label, isActive }) => {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default SidebarItem;