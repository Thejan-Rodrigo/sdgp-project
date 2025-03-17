import React from 'react';
import StudentSidebar from '../ParentSideBar';
import StudentHeader from './Headers/StudentHeader';
import AnnouncementDashboard from './AnnouncementDashboard';

const StudentDashboard = () => {
  return (
    <AnnouncementDashboard 
      SidebarComponent={StudentSidebar} 
      HeaderComponent={StudentHeader} 
    />
  );
};

export default StudentDashboard;