import React, { useState, useEffect } from 'react';

export default function RegistrationSettings() {
  const [schools, setSchools] = useState([]); // State to store the list of schools
  const [selectedSchool, setSelectedSchool] = useState(''); // State to store the selected school ID
  const [users, setUsers] = useState({ teachers: [], parents: [], students: [] }); // State to store users by school

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

  // Fetch users by school ID when a school is selected
  useEffect(() => {
    if (selectedSchool) {
      const fetchUsersBySchoolId = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/auth/users/${selectedSchool}`); // Call the API
          const data = await response.json(); // Parse the response as JSON

          if (data.success) {
            setUsers(data.data.users); // Update the state with the list of users
          } else {
            console.error('Failed to fetch users:', data.message);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsersBySchoolId(); // Call the fetch function
    }
  }, [selectedSchool]); // Run this effect when selectedSchool changes

  // Handle dropdown change
  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value); // Update the selected school
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Registration Settings</h2>
      <div className="mb-6">
        <label htmlFor="school-select" className="block text-sm font-medium text-gray-700">
          Select School:
        </label>
        <select
          id="school-select"
          value={selectedSchool}
          onChange={handleSchoolChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select a School --</option>
          {schools.map((school) => (
            <option key={school._id} value={school._id}>
              {school.name || school.schoolName} {/* Handle different field names */}
            </option>
          ))}
        </select>
      </div>

      {/* Display users */}
      {selectedSchool && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Users in Selected School</h3>

          {/* Teachers Section */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Teachers</h4>
            {users.teachers.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {users.teachers.map((teacher) => (
                  <li key={teacher._id} className="py-2">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">{teacher.firstName} {teacher.lastName}</span>
                      <span className="text-sm text-gray-500">{teacher.email}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No teachers found.</p>
            )}
          </div>

          {/* Parents Section */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Parents</h4>
            {users.parents.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {users.parents.map((parent) => (
                  <li key={parent._id} className="py-2">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">{parent.firstName} {parent.lastName}</span>
                      <span className="text-sm text-gray-500">{parent.email}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No parents found.</p>
            )}
          </div>

          {/* Students Section */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Students</h4>
            {users.students.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {users.students.map((student) => (
                  <li key={student._id} className="py-2">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">{student.firstName} {student.lastName}</span>
                      <span className="text-sm text-gray-500">{student.email}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No students found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}