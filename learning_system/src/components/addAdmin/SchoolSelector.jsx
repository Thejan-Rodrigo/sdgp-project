import React from 'react';
import { FaSchool } from 'react-icons/fa';

const SchoolSelector = ({ selectedSchool, setSelectedSchool }) => {
  // Mock data for schools
  const schools = [
    { id: 1, name: "Springfield Elementary School" },
    { id: 2, name: "Riverdale High School" },
    { id: 3, name: "Westview Academy" },
    { id: 4, name: "Oakridge International School" },
    { id: 5, name: "Greenwood Primary School" },
    { id: 6, name: "Sunnydale High" },
    { id: 7, name: "Lakeside Montessori" },
    { id: 8, name: "Pinecrest Academy" }
  ];

  const handleChange = (e) => {
    setSelectedSchool(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="schoolSelect" className="block text-sm font-medium text-gray-700 mb-1">
        Select School <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSchool className="text-gray-400" />
        </div>
        <select
          id="schoolSelect"
          name="schoolSelect"
          value={selectedSchool}
          onChange={handleChange}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          required
        >
          <option value="">Choose a school</option>
          {schools.map(school => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SchoolSelector;