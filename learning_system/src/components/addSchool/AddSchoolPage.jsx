import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SchoolInformationForm from './SchoolInformationForm';
import AdministratorForm from './AdministratorForm';

const AddSchoolPage = () => {
  const [formData, setFormData] = useState({
    // School Information
    schoolName: '',
    schoolAddress: '',
    district: '',
    province: '',
    
    // Administrator Details
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    emailAddress: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <SchoolInformationForm formData={formData} handleChange={handleChange} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <AdministratorForm formData={formData} handleChange={handleChange} />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create School
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddSchoolPage;