import React from 'react';
import StudentSidebar from './StudentSidebar';
import StudentHeader from './StudentHeader';
import StudentAnnouncementList from './StudentAnnouncementList';

const StudentDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      <div className="flex-1">
        <StudentHeader />
        <div className="p-6">
          <StudentAnnouncementList />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;