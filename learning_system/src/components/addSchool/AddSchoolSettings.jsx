import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth to access the token
import { FaTrash } from 'react-icons/fa'; // Import the bin icon

export default function AddSchoolSettings() {
  const { user } = useAuth(); // Get the user (which includes the token) from the context
  const [schools, setSchools] = useState([]); // State to store the list of schools
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch schools when the component mounts
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        if (!user?.token) {
          throw new Error('No token found. User is not authenticated.');
        }

        const response = await fetch('http://localhost:5000/api/schools/getallschools', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.success) {
          setSchools(result.data.schools); // Set the schools data in state
        } else {
          throw new Error(result.message || 'Failed to fetch schools');
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
        setError(error.message); // Set the error message
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchSchools();
  }, [user?.token]); // Re-run the effect if the token changes

  // Function to handle school deletion
  const handleDeleteSchool = async (schoolId) => {
    try {
      if (!user?.token) {
        throw new Error('No token found. User is not authenticated.');
      }

      const response = await fetch(`http://localhost:5000/api/schools/${schoolId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Remove the deleted school from the list
      setSchools((prevSchools) => prevSchools.filter((school) => school._id !== schoolId));
      console.log('School deleted successfully');
    } catch (error) {
      console.error('Error deleting school:', error);
    }
  };

  // Display loading state
  if (loading) {
    return <div>Loading schools...</div>;
  }

  // Display error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the list of schools
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">School List</h2>
      {schools.length > 0 ? (
        <ul className="space-y-4">
          {schools.map((school) => (
            <li key={school._id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{school.name || school.schoolName}</h3>
                  <p className="text-sm text-gray-600">{school.address || school.schoolAddress}</p>
                  <p className="text-sm text-gray-600">{school.contactNumber}</p>
                  <p className="text-sm text-gray-600">{school.email}</p>
                  <p className="text-sm text-gray-600">
                    Status: {school.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">
                    <p>Created: {new Date(school.createdAt).toLocaleDateString()}</p>
                    <p>Updated: {new Date(school.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteSchool(school._id)} // Call handleDeleteSchool with the school ID
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete School"
                  >
                    <FaTrash className="text-lg" /> {/* Bin icon */}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No schools found.</p>
      )}
    </div>
  );
}