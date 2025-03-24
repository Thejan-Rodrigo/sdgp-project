import React from 'react';
import Sidebar from '../../SupAdSidebar';
import ChatAreaS from './ChatAreaS';
import ContactListS from './ContactListS';

const SuperAdminChat = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar Section - Fixed Left */}
    <div className="w-64 flex-shrink-0">
    <Sidebar />
    </div>

    {/* Main Content Section - Right Side of Sidebar */}
    <div className="flex-1">
    <ChatAreaS />
    </div>
  </div>
  );
};

export default SuperAdminChat;