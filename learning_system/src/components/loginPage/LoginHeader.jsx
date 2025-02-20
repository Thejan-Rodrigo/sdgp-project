import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 text-3xl font-bold text-blue-600 mb-2">
        <FaGraduationCap className="text-4xl" />
        <span>Kinder Zone</span>
      </div>
      <p className="text-gray-600">Where Learning Begins!</p>
      <h1 className="text-2xl font-bold mt-6 mb-2">Welcome Back!</h1>
      <p className="text-gray-600">Please login to your account</p>
    </div>
  );
};

export default LoginHeader;