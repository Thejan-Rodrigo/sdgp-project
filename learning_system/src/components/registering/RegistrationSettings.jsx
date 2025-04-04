import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import bin icon
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook

// Loading Animation Component
const LoadingAnimation = () => (
  <div className="flex-col gap-4 w-full flex items-center justify-center">
    <div
      className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
    >
      <div
        className="w-16 h-16 border-4 border-transparent text-blue-400 text-2xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
      ></div>
    </div>
  </div>
);

export default function RegistrationSettings() {
  const { user } = useAuth(); // Get the user (which includes the token) from the context
  const [users, setUsers] = useState({ teachers: [], parents: [], students: [] }); // State to store users by school
  const [loading, setLoading] = useState(true);

  // Fetch users by school ID when the component mounts
  useEffect(() => {
    if (user?.schoolId) {
      const fetchUsersBySchoolId = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/auth/users/${user.schoolId}`, {
            headers: {
              Authorization: `Bearer ${user.token}`, // Include the token in the request
            },
          });
          const data = await response.json(); // Parse the response as JSON

          if (data.success) {
            setUsers(data.data.users); // Update the state with the list of users
          } else {
            console.error('Failed to fetch users:', data.message);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsersBySchoolId(); // Call the fetch function
    }
  }, [user]); // Run this effect when the user context changes

  // Handle delete teacher
  const handleDeleteTeacher = async (teacherId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/teachers/${teacherId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`, // Include the token in the request
        },
      });

      if (response.ok) {
        // Remove the deleted teacher from the list
        setUsers((prevUsers) => ({
          ...prevUsers,
          teachers: prevUsers.teachers.filter((teacher) => teacher._id !== teacherId),
        }));
        alert('Teacher deleted successfully');
      } else {
        const errorData = await response.json();
        alert(`Failed to delete teacher: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
      alert('An error occurred while deleting the teacher');
    }
  };

  // Handle delete parent and student
  const handleDeleteParent = async (parentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/parents/${parentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`, // Include the token in the request
        },
      });

      if (response.ok) {
        // Remove the deleted parent from the list
        setUsers((prevUsers) => ({
          ...prevUsers,
          parents: prevUsers.parents.filter((parent) => parent._id !== parentId),
        }));
        alert('Parent and associated student deleted successfully');
      } else {
        const errorData = await response.json();
        alert(`Failed to delete parent: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting parent:', error);
      alert('An error occurred while deleting the parent');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Registration Settings</h2>

      {/* Display users */}
      {loading ? (
        <LoadingAnimation /> // Use the loading animation
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4">Users in Your School</h3>

          {/* Teachers Section */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4">Teachers</h4>
            {users.teachers.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {users.teachers.map((teacher) => (
                  <li key={teacher._id} className="py-3 flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-700 font-medium">{teacher.firstName} {teacher.lastName}</span>
                      <span className="text-sm text-gray-500">{teacher.email}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteTeacher(teacher._id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="text-lg" /> {/* Bin icon */}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No teachers found.</p>
            )}
          </div>

          {/* Parents Section */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4">Parents</h4>
            {users.parents.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {users.parents.map((parent) => {
                  const student = users.students.find((student) => student._id === parent.student);
                  return (
                    <li key={parent._id} className="py-3 flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <span className="text-gray-700 font-medium">{parent.firstName} {parent.lastName}</span>
                        <span className="text-sm text-gray-500">{parent.email}</span>
                        {student && (
                          <span className="text-xs text-gray-400 mt-1">
                            Student - {student.firstName} {student.lastName}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteParent(parent._id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <FaTrash className="text-lg" /> {/* Bin icon */}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">No parents found.</p>
            )}
          </div>

          {/* Students Section */}
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4">Students</h4>
            {users.students.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {users.students.map((student) => {
                  const parent = users.parents.find((parent) => parent.student === student._id);
                  return (
                    <li key={student._id} className="py-3">
                      <div className="flex flex-col space-y-1">
                        <span className="text-gray-700 font-medium">{student.firstName} {student.lastName}</span>
                        <span className="text-sm text-gray-500">{student.email}</span>
                        {parent && (
                          <span className="text-xs text-gray-400 mt-1">
                            Parent - {parent.firstName} {parent.lastName}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
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