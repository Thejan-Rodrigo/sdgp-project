import React from 'react';
import Sidebar from '../Sidebar';
import ChatArea from './ChatArea';
import ContactList from './ContactList';

const ParentChat = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

export default ParentChat;