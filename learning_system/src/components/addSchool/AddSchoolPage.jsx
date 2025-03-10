import React, { useState } from 'react';
import Sidebar from '../SupAdSidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';
import SchoolInformationForm from './SchoolInformationForm';
import AdministratorForm from './AdministratorForm';
import AddSchoolSettings from './AddSchoolSettings';
import CustomAlert from './CustomAlert'; // Import the custom alert component

const AddSchoolPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolAddress: '',
    district: '',
    province: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    password: ''
  });

  const [showSettings, setShowSettings] = useState(false); // State to manage visibility
  const [alert, setAlert] = useState(null); // State to manage the alert

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
      return;
    }

    const requestBody = {
      ...formData,
      role: user.role,
    };

    try {
      const response = await fetch('http://localhost:5000/api/schools/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);

      // Show a success alert
      setAlert({ message: 'School registered successfully!', type: 'success' });

      // Clear the form data after successful submission
      setFormData({
        schoolName: '',
        schoolAddress: '',
        district: '',
        province: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        address: '',
        password: ''
      });
    } catch (error) {
      console.error('Error:', error);

      // Show an error alert
      setAlert({ message: 'Failed to register school. Please try again.', type: 'error' });
    }
  };

  const closeAlert = () => {
    setAlert(null); // Close the alert
  };

  const toggleSettings = () => {
    setShowSettings(prev => !prev); // Toggle the settings view
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header
          onSettingsClick={toggleSettings} // Pass the toggle function
          isSettingsView={showSettings} // Pass the current view state
        />

        {/* Render the custom alert if alert state is not null */}
        {alert && (
          <CustomAlert
            message={alert.message}
            type={alert.type}
            onClose={closeAlert} // Pass the closeAlert function
          />
        )}

        {showSettings ? (
          <AddSchoolSettings /> // Render the settings component if showSettings is true
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default AddSchoolPage;