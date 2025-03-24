import React from 'react';
import TeacherNav from './TeacherNav';
import TeacherContent from './TeacherContent';
import TeaSidebar from '../../TeaSidebar';

const TeacherPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 fixed h-full">
        <TeaSidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 ml-64 p-4">
        <TeacherContent />
      </div>
    </div>
  );
};

export default TeacherPage;