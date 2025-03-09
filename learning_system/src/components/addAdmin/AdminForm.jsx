import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook

const AdminForm = () => {
  const { user } = useAuth(); // Get the user (which includes the token) from the context
  const [schools, setSchools] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    schoolId: ''
  });

  useEffect(() => {
    const fetchSchools = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/schools/getallschools', {
                headers: {
                    Authorization: `Bearer ${user?.token}` // Send the token in the Authorization header
                }
            });

            console.log(response.data); // Check the full response
            setSchools(response.data.data.schools); // Extract the array correctly
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    };

    if (user?.token) { // Ensure the token exists before making the request
        fetchSchools();
    }
}, [user?.token]); // Re-run when the token changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(formData)
        const response = await axios.post('http://localhost:5000/api/admin/add', 
            {
                ...formData
            }, 
            {
                headers: {
                    Authorization: `Bearer ${user?.token}` // Send the token in the request headers
                }
            }
        );

        console.log('Admin registered successfully:', response.data);
        // Handle success (e.g., show a message, clear the form, etc.)
    } catch (error) {
        console.error('Error registering admin:', error);
        // Handle error (e.g., show an error message)
    }
};


  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">Administrator Information</h2>

      <div className="space-y-4">
        {/* School Selection Dropdown */}
        <div>
          <label htmlFor="schoolId" className="block text-sm font-medium text-gray-700 mb-1">
            Select School <span className="text-red-500">*</span>
          </label>
          <select
            id="schoolId"
            name="schoolId"
            value={formData.schoolId}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select a school</option>
            {schools.map((school) => (
              <option key={school._id} value={school._id}>{school.schoolName}</option>
            ))}
          </select>
        </div>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter first name"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
        </div>

        {/* Email & Password */}
        <div>
          <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Admin
        </button>
      </div>
    </form>
  );
};

export default AdminForm;
