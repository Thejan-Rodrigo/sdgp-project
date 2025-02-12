import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import NewAnnouncementForm from './NewAnnouncementForm';
import AdminAnnouncementList from './AdminAnnouncementList';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <NewAnnouncementForm />
          <AdminAnnouncementList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;