import React, { useState } from 'react';
import axios from 'axios';
import Alert from "./Alert"; // Import the Alert component
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaLock, FaEyeSlash, FaEye } from 'react-icons/fa';

const RegistrationForm = () => {
  const [role, setRole] = useState('student');
  const [cusalert, setCusAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [schoolId, setSchoolId] = useState('67ac6107daffb78924247923');

  // Form Data for Student
  const [studentData, setStudentData] = useState({
    studentFirstName: '',
    studentLastName: '',
    dateOfBirth: '',
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    phone: '',
    password: '',
    address: ''
  });

  // Form Data for Teacher
  const [teacherData, setTeacherData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    password: '',
    address: ''
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeacherChange = (e) => {
    const { name, value } = e.target;
    setTeacherData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(studentData)
      let response;
      if (role === 'student') {
        response = await axios.post('http://localhost:5000/api/auth/register', { role, schoolId, ...studentData });
      } else {
        response = await axios.post('http://localhost:5000/api/auth/register', { role, schoolId, ...teacherData });
      }
      console.log('✅ Registration successful:', response.data);
      //const result = await response.json();
      //console.log('Success:', result);
  
      // Clear the form fields after successful submission
      setStudentData({
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
        password: '',
      });

      setTeacherData({
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
        password: '',
      });
      alert('Registration successful!');
    } catch (error) {
      console.error('❌ Registration failed:', error.response?.data || error.message);
      setCusAlert({ type: "error", message: "Failed to create school. Please try again." });
      //alert('Registration failed! Check the console for more details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Role *</label>
        <div className="flex gap-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === 'student'}
              onChange={handleRoleChange}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Student</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={role === 'teacher'}
              onChange={handleRoleChange}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Teacher</span>
          </label>
        </div>
      </div>

      {/* Display the alert */}
      {cusalert && (
        <Alert
          type={cusalert.type}
          message={cusalert.message}
          onClose={() => setCusAlert(null)} // Close the alert
        />
      )}

      {/* Student Registration Form */}
      {role === 'student' && (
        <>
          <div className="space-y-4">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student's First Name *</label>
              <div className="relative">
                <FaUser className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg" />
                <input
                  type="text"
                  name="studentFirstName"
                  value={studentData.studentFirstName}
                  onChange={handleStudentChange}
                  placeholder="Enter First Name Here"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student's Last Name *</label>
              <div className="relative">
                <FaUser className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg" />
                <input
                  type="text"
                  name="studentLastName"
                  value={studentData.studentLastName}
                  onChange={handleStudentChange}
                  placeholder="Enter Last Name Here"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <div className="relative">
                <FaCalendar className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg" />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={studentData.dateOfBirth}
                  onChange={handleStudentChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <div className="relative">
                <FaUser className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg" />
                <input
                  type="text"
                  name="phone"  // ✅ Corrected name
                  value={studentData.phone}
                  onChange={handleStudentChange}
                  placeholder="Enter Phone Number Here"
                  className="block w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Parent Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent's First Name *</label>
              <input
                type="text"
                name="parentFirstName"
                value={studentData.parentFirstName}
                onChange={handleStudentChange}
                placeholder="Enter First Name Here"
                className="block w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Last Name *</label>
              <input
                type="text"
                name="parentLastName"
                value={studentData.parentLastName}
                onChange={handleStudentChange}
                placeholder="Enter Last Name Here"
                className="block w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Parent's Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Email Address *</label>
              <input
                type="email"
                name="parentEmail"
                value={studentData.parentEmail}
                onChange={handleStudentChange}
                placeholder="Enter Email Here"
                className="block w-full p-2 border border-gray-300 rounded-lg"
                required
              />
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
                  value={studentData.password}
                  onChange={handleStudentChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Teacher Registration Form */}
      {role === 'teacher' && (
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={teacherData.firstName}
                onChange={handleTeacherChange}
                placeholder="Enter First Name Here"
                className="block w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={teacherData.lastName}
                onChange={handleTeacherChange}
                placeholder="Enter Last Name Here"
                className="block w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <div className="relative">
                <FaCalendar className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg" />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={teacherData.dateOfBirth}
                  onChange={handleTeacherChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="text"
                name="phone"  // ✅ Corrected name
                value={teacherData.phone}
                onChange={handleTeacherChange}
                placeholder="Enter Phone Number Here"
                className="block w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={teacherData.email}
                onChange={handleTeacherChange}
                placeholder="Enter Email Here"
                className="block w-full p-2 border border-gray-300 rounded-lg"
                required
              />
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
                  value={teacherData.password}
                  onChange={handleTeacherChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Common Address Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
        <textarea
          name="address"
          value={role === 'student' ? studentData.address : teacherData.address}
          onChange={role === 'student' ? handleStudentChange : handleTeacherChange}
          placeholder="Enter Address Here"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          rows="3"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Register {role === 'student' ? 'Student' : 'Teacher'}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
