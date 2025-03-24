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
      <Sidebar className="w-[300px] flex-shrink-0" /> {/* Sidebar with fixed width */}
      <main className="flex-1 p-8 ml-[300px]"> {/* Add margin-left to offset the sidebar */}
        <Header 
          onSettingsClick={toggleSettings} 
          showSettings={showSettings} // Pass showSettings to Header
        />
        
        {/* Render the selected component based on settings visibility */}
        {showSettings ? <AdminSettings /> : <AdminForm />}
      </main>
    </div>
  );
};

export default AddAdminPage;
