import React, { useState, useEffect } from 'react';

export default function RegistrationSettings() {
  const [schools, setSchools] = useState([]); // State to store the list of schools
  const [selectedSchool, setSelectedSchool] = useState(''); // State to store the selected school

  // Fetch schools data when the component mounts
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/schools/getallschools'); // Call the API
        const data = await response.json(); // Parse the response as JSON

        if (data.success) {
          setSchools(data.data.schools); // Update the state with the list of schools
        } else {
          console.error('Failed to fetch schools:', data.message);
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle dropdown change
  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value); // Update the selected school
  };

  return (
    <div>
      <h2>Registration Settings</h2>
      <div>
        <label htmlFor="school-select">Select School:</label>
        <select
          id="school-select"
          value={selectedSchool}
          onChange={handleSchoolChange}
        >
          <option value="">-- Select a School --</option>
          {schools.map((school) => (
            <option key={school._id} value={school._id}>
              {school.name || school.schoolName} {/* Handle different field names */}
            </option>
          ))}
        </select>
      </div>
      {selectedSchool && (
        <div>
          <h3>Selected School Details:</h3>
          <p>
            <strong>Name:</strong> {schools.find(school => school._id === selectedSchool)?.name || schools.find(school => school._id === selectedSchool)?.schoolName}
          </p>
          <p>
            <strong>Address:</strong> {schools.find(school => school._id === selectedSchool)?.address || schools.find(school => school._id === selectedSchool)?.schoolAddress}
          </p>
          <p>
            <strong>Contact:</strong> {schools.find(school => school._id === selectedSchool)?.contactNumber}
          </p>
          <p>
            <strong>Email:</strong> {schools.find(school => school._id === selectedSchool)?.email}
          </p>
        </div>
      )}
    </div>
  );
}