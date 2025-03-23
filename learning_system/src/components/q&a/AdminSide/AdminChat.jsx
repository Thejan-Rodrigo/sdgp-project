import React from 'react';
import Sidebar from '../Sidebar';
import ChatAreaA from './ChatAreaA';
import ContactListA from './ContactListA';

const AdminChat = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ChatAreaA />
    </div>
  );
};

export default AdminChat;