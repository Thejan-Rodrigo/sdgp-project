 
import React from 'react';
import TeacherNav from './TeacherNav';
import TeacherContent from './TeacherContent'
import TeaSidebar from "../../TeaSidebar"


const TeacherPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeaSidebar />
      <TeacherContent />
    </div>
  );
};

export default TeacherPage;