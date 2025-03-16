import React from 'react';
import StudentSidebar from '../ParentSideBar';
import StudentHeader from './Headers/StudentHeader';
import AnnouncementDashboard from './AnnouncementDashboard';
import Chatbot from '../chatbot/Chatbot';

const StudentDashboard = () => {
  return (
    <><AnnouncementDashboard
      SidebarComponent={StudentSidebar}
      HeaderComponent={StudentHeader} /><Chatbot /></>
  );
};

export default StudentDashboard;
