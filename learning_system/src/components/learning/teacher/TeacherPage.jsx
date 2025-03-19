 
import React from 'react';
import TeacherNav from './TeacherNav';
import TeacherContent from './TeacherContent';


const TeacherPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherNav />
      <TeacherContent />
    </div>
  );
};

export default TeacherPage;