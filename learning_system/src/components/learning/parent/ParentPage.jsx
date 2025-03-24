import React from 'react';
import ParentNav from './ParentNav';
import ParentContent from './ParentContent';
import ParentSidebar from '../../ParentSideBar';

const ParentPage = () => {
  return (
    <div className="flex bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed h-screen w-64">
        <ParentSidebar />
      </div>

      {/* Main Content with Left Margin */}
      <div className="flex-1 ml-64">
        <ParentContent />
      </div>
    </div>
  );
};

export default ParentPage;