import React from 'react';
import Sidebar from '../../AdSidebar';
import ChatAreaA from './ChatAreaA';
import ContactListA from './ContactListA';

const AdminChat = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar Section - Fixed Left */}
    <div className="w-64 flex-shrink-0">
    <Sidebar />
    </div>

    {/* Main Content Section - Right Side of Sidebar */}
    <div className="flex-1">
    <ChatAreaA />
    </div>
  </div>
  );
};

export default AdminChat;