import React from 'react';
import SuperAdminSidebar from './Headers/SuperAdminSidebar'
import SuperAdminHeader from './Headers/SuperAdminHeader';
import AnnouncementDashboard from './AnnouncementDashboard';

const SuperAdminDashboard = () => {
  return (
    <AnnouncementDashboard 
      SidebarComponent={SuperAdminSidebar} 
      HeaderComponent={SuperAdminHeader} 
    />
  );
};

export default SuperAdminDashboard;