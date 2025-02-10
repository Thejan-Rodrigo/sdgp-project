import React from 'react';
import TeacherSidebar from './TeacherSidebar';
import TeacherHeader from './TeacherHeader';
import NewAnnouncementForm from './NewAnnouncementForm';
import TeacherAnnouncementList from './TeacherAnnouncementList';

const TeacherDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <TeacherSidebar />
      <div className="flex-1">
        <TeacherHeader />
        <div className="p-6">
          <NewAnnouncementForm />
          <TeacherAnnouncementList />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;