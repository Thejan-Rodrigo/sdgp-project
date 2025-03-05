import React from 'react';
import { FaFilter } from 'react-icons/fa';

const SchoolFilter = ({ selectedFilter, setSelectedFilter }) => {
  const handleChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className="flex items-center justify-end mb-6">
      <div className="relative w-64">
        <select
          value={selectedFilter}
          onChange={handleChange}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="all">All Schools</option>
          <option value="elementary">Elementary Schools</option>
          <option value="middle">Middle Schools</option>
          <option value="high">High Schools</option>
          <option value="private">Private Schools</option>
        </select>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaFilter className="text-gray-400" />
        </div>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SchoolFilter;