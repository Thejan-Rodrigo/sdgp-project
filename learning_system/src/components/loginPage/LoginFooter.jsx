import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

const LoginFooter = () => {
  return (
    <div className="mt-8 text-center">
      {/* <p className="text-sm text-gray-600">
        New to Kinder Zone?{' '}
        <a href="/registering" className="text-blue-600 hover:text-blue-500 font-medium">
          Register here
        </a>
      </p> */}
      <div className="flex items-center justify-center mt-4 text-gray-500 text-sm">
        <FaShieldAlt className="mr-1" />
        <span>Secure Login</span>
      </div>
    </div>
  );
};

export default LoginFooter;