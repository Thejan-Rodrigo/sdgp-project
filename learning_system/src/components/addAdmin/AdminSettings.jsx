import React, { useState, useEffect } from 'react';

export default function AdminSettings() {
  const [schools, setSchools] = useState([]); // State to store the list of schools
  const [selectedSchool, setSelectedSchool] = useState(''); // State to store the selected school
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch schools data when the component mounts
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/schools/getallschools'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        const result = await response.json(); // Parse the response as JSON

        // Check if the response has the expected structure
        if (result.success && result.data && Array.isArray(result.data.schools)) {
          setSchools(result.data.schools); // Update the schools state with the fetched data
        } else {
          throw new Error('Invalid data format: Expected an array of schools');
        }
      } catch (error) {
        setError(error.message); // Set error state if the request fails
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchSchools();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle dropdown change
  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };

  // Display loading state
  if (loading) {
    return <div>Loading schools...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display message if no schools are found
  if (schools.length === 0) {
    return <div>No schools found.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="school" className="block text-sm font-medium text-gray-700">
            Select School
          </label>
          <select
            id="school"
            name="school"
            value={selectedSchool}
            onChange={handleSchoolChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select a school</option>
            {schools.map((school) => (
              <option key={school._id} value={school._id}>
                {school.name || school.schoolName} {/* Use 'name' or 'schoolName' based on the response */}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Selected School ID: {selectedSchool}
          </p>
        </div>
      </div>
    </div>
  );
}