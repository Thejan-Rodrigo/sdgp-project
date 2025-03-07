import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import SchoolInformationForm from './SchoolInformationForm';
import AdministratorForm from './AdministratorForm';

const AddSchoolPage = () => {
  const { user } = useAuth(); // Get the user (which includes the token) from the context
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
    phone: '',
    email: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      console.error('No token found. User is not authenticated.');
      // You can redirect the user to the login page or show an error message
      return;
    }

    // Add the role to the formData
    const requestBody = {
      ...formData,
      role: user.role, // Include the role from the user object
    };

    try {
      console.log(user.token);
      console.log(requestBody); // Log the request body to verify it includes the role
      const response = await fetch('http://localhost:5000/api/schools/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(requestBody), // Send the updated request body
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      // You can add additional logic here, such as showing a success message or redirecting the user
    } catch (error) {
      console.error('Error:', error);
      // You can add additional logic here, such as showing an error message to the user
    }
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