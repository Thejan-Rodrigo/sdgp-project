import React from 'react';
import Sidebar from '../Sidebar';
import ChatAreaS from './ChatAreaS';

const SuperAdminChat = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ChatAreaS />
    </div>
  );
};

export default SuperAdminChat;