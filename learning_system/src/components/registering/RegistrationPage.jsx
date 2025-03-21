import React, { useState } from 'react';
import Sidebar from '../AdSidebar';
import RegistrationHeader from '../registering/RegistrationHeader';
import RegistrationForm from '../registering/RegistrationForm';
import RegistrationSettings from '../registering/RegistrationSettings';

const RegistrationPage = () => {
  const [isSettingsView, setIsSettingsView] = useState(false);

  const toggleSettingsView = () => {
    setIsSettingsView(!isSettingsView);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fixed on the left */}
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      {/* Content moves to the right */}
      <main className="flex-1 ml-64 p-8">
        <RegistrationHeader 
          onSettingsClick={toggleSettingsView} 
          isSettingsView={isSettingsView} 
        />
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {isSettingsView ? <RegistrationSettings /> : <RegistrationForm />}
        </div>
      </main>
    </div>
  );
};

export default RegistrationPage;
