import React from 'react';
import Sidebar from '../Sidebar';
import ChatArea from './ChatAreaT';

const ParentChat = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

export default ParentChat;