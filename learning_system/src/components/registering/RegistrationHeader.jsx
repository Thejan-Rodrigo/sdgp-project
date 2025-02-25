import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const RegistrationHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <FaGraduationCap className="text-blue-600 text-3xl" />
        <h1 className="text-2xl font-bold">User Registration</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Admin User</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default RegistrationHeader;