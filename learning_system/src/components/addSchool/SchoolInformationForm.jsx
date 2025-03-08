import React from 'react';

const SchoolInformationForm = ({ formData, handleChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-6">School Information</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
            School Name
          </label>
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter school name"
            required
          />
        </div>

        <div>
          <label htmlFor="schoolAddress" className="block text-sm font-medium text-gray-700 mb-1">
            School Address
          </label>
          <input
            type="text"
            id="schoolAddress"
            name="schoolAddress"
            value={formData.schoolAddress}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter school address"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter district"
              required
            />
          </div>
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
              Province
            </label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter province"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolInformationForm;