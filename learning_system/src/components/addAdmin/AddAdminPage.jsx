import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatsCards from './StatsCards';
import SchoolFilter from './SchoolFilter';
import AdminForm from './AdminForm';

const AddAdminPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header />
        <SchoolFilter 
          selectedFilter={selectedFilter} 
          setSelectedFilter={setSelectedFilter} 
        />
        <StatsCards />
        <AdminForm />
      </main>
    </div>
  );
};

export default AddAdminPage;