import React from 'react';
import { FaBell } from 'react-icons/fa';

const TeacherHeader = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-2xl font-semibold">Announcements</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaBell className="text-xl text-gray-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Class 10-A</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TeacherHeader;