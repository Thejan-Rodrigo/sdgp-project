import React from 'react';
import Sidebar from '../Sidebar';
import ChatArea from './ChatAreaT';
import ContactListT from './ContactListT';

const TeacherChat = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ContactListT/>
      <ChatArea />
      
    </div>
  );
};

export default TeacherChat;