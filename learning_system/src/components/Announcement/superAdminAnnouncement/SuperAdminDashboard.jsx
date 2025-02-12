import React from 'react';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminHeader from './SuperAdminHeader';
import NewAnnouncementForm from './NewAnnouncementForm';
import SuperAdminAnnouncementList from './SuperAdminAnnouncementList';

const SuperAdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SuperAdminSidebar />
      <div className="flex-1">
        <SuperAdminHeader />
        <div className="p-6">
          <NewAnnouncementForm />
          <SuperAdminAnnouncementList />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;