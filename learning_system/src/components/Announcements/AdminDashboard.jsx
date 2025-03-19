import React from 'react';
import AdminSidebar from '../AdSidebar';
import AdminHeader from './Headers/AdminHeader';
import AnnouncementDashboard from './AnnouncementDashboard';

const AdminDashboard = () => {
  return (
    <AnnouncementDashboard 
      SidebarComponent={AdminSidebar} 
      HeaderComponent={AdminHeader} 
    />
  );
};

export default AdminDashboard;