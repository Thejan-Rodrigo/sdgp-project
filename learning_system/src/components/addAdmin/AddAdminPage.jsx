import React, { useState } from 'react';
import Sidebar from '../SupAdSidebar';
import Header from './Header';
import StatsCards from './StatsCards';
import SchoolFilter from './SchoolFilter';
import AdminForm from './AdminForm';
import AdminSettings from './AdminSettings';

const AddAdminPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false); // State to track settings visibility

  // Function to toggle between AdminForm and AdminSettings
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header 
          onSettingsClick={toggleSettings} 
          showSettings={showSettings} // Pass showSettings to Header
        />
        {/*<SchoolFilter 
          selectedFilter={selectedFilter} 
          setSelectedFilter={setSelectedFilter} 
        />
        <StatsCards />*/}
        {showSettings ? <AdminSettings /> : <AdminForm />}
      </main>
    </div>
  );
};

export default AddAdminPage;