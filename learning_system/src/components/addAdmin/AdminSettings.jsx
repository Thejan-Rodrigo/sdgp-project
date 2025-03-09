import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import { FaTrash } from 'react-icons/fa'; // Import the bin icon

export default function AdminSettings() {
  const { user } = useAuth(); // Get the user (which includes the token) from the context
  const [schools, setSchools] = useState([]); // State to store the list of schools
  const [selectedSchool, setSelectedSchool] = useState(''); // State to store the selected school ID
  const [admins, setAdmins] = useState([]); // State to store the list of admins
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch schools data when the component mounts
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/schools/getallschools', {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the token in the header
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        const result = await response.json();

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
  }, [user.token]); // Add user.token as a dependency

  // Fetch admins when a school is selected
  useEffect(() => {
    if (selectedSchool) {
      const fetchAdmins = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/api/admin/school/${selectedSchool}`, {
            headers: {
              Authorization: `Bearer ${user.token}`, // Include the token in the header
            },
          });

          // Check if the response is JSON
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Unexpected response: ${text}`);
          }

          const result = await response.json();

          // Check if the response has the expected structure
          if (result.success && result.data && Array.isArray(result.data.admins)) {
            setAdmins(result.data.admins); // Update the admins state with the fetched data
          } else if (result.message === 'No admins found for this school') {
            setAdmins([]); // Set admins to an empty array if no admins are found
          } else {
            throw new Error(result.message || 'Invalid data format: Expected an array of admins');
          }
        } catch (error) {
          if (error.message.includes('No admins found')) {
            setAdmins([]); // Set admins to an empty array if no admins are found
          } else {
            setError(error.message); // Set error state if the request fails
          }
        } finally {
          setLoading(false); // Set loading to false after the request completes
        }
      };

      fetchAdmins();
    }
  }, [selectedSchool, user.token]); // Add user.token as a dependency

  // Handle delete admin
  const handleDeleteAdmin = async (adminId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/${adminId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`, // Include the token in the header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete admin');
      }

      // Refresh the admin list after deletion
      const updatedAdmins = admins.filter((admin) => admin._id !== adminId);
      setAdmins(updatedAdmins);
    } catch (error) {
      setError(error.message); // Set error state if the request fails
    }
  };

  // Handle dropdown change
  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value); // Update the selected school ID
  };

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
      <div className="space-y-4">
        {/* School Dropdown */}
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

        {/* Admins List */}
        {selectedSchool && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Admins in Selected School</h3>
            {admins.length > 0 ? (
              <ul className="space-y-2">
                {admins.map((admin) => (
                  <li
                    key={admin._id}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          {admin.firstName} {admin.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{admin.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Role: {admin.role}</span>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteAdmin(admin._id)}
                          className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <FaTrash className="w-4 h-4" /> {/* Bin icon */}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                There are no admins in this school. Please add a new admin to this school.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}