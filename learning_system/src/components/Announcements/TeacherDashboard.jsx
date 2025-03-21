import React from 'react';
import TeacherSidebar from '../TeaSidebar';
import TeacherHeader from './Headers/TeacherHeader';
import AnnouncementDashboard from './AnnouncementDashboard';

const TeacherDashboard = () => {
  return (
    <AnnouncementDashboard 
      SidebarComponent={TeacherSidebar} 
      HeaderComponent={TeacherHeader} 
    />
  );
};

export default TeacherDashboard;