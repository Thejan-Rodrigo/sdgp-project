import React from 'react';
import ParentNav from './ParentNav';
import ParentContent from './ParentContent';

const ParentPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ParentNav />
      <ParentContent />
    </div>
  );
};

export default ParentPage;