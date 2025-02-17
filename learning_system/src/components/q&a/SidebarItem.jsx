import React from 'react';

const SidebarItem = ({ icon, label, isActive }) => {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default SidebarItem;