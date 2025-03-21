import React from 'react';
import ParentNav from './ParentNav';
import ParentContent from './ParentContent';
import ParentSidebar from "../../ParentSideBar"

const ParentPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ParentSidebar />
      <ParentContent />
    </div>
  );
};

export default ParentPage;