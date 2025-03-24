import React from 'react';
import Sidebar from '../../TeaSidebar';
import ChatArea from './ChatAreaT';
import ContactListT from './ContactListT';

const TeacherChat = () => {
  return (

    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Section - Fixed Left */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Section - Right Side of Sidebar */}
      <div className="flex-1">
        <ChatArea />
      </div>
    </div>
  );
};

export default TeacherChat;