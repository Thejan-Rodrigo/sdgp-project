import React from 'react';
import Sidebar from '../registering/Sidebar';
import RegistrationHeader from '../registering/RegistrationHeader';
import RegistrationForm from '../registering/RegistrationForm';

const RegistrationPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <RegistrationHeader />
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <RegistrationForm />
        </div>
      </main>
    </div>
  );
};

export default RegistrationPage;