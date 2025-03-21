import React from 'react';
import Sidebar from '../Sidebar';
import ChatAreaS from './ChatAreaS';
import ContactListS from './ContactListS';

const SuperAdminChat = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ContactListS/>
      <ChatAreaS />
    </div>
  );
};

export default SuperAdminChat;