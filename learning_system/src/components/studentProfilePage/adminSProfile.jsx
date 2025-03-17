"use client";

import { useState, useEffect } from "react";

function AdminSProfile({ user }) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [editedStudent, setEditedStudent] = useState({}); // Holds edited student details

  // Fetch students by school ID
  useEffect(() => {
    const fetchStudentsBySchoolId = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`http://localhost:5000/students/school/67cc5370e98552e9b5a6e097`);

        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        console.log("Fetched students data:", data);

        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsBySchoolId();
  }, [user]);

  // Handle input changes for edited student
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/students/${selectedStudent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedStudent),
      });

      if (!response.ok) throw new Error("Failed to update student");

      const updatedStudent = await response.json();
      console.log("Updated student data:", updatedStudent);

      // Update the student list with the edited student details
      setStudents((prev) =>
        prev.map((student) => (student._id === updatedStudent._id ? updatedStudent : student))
      );

      setSelectedStudent(updatedStudent); // Update the selected student with new data
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating student:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-60 bg-white border-r flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b">
          <span className="text-2xl">🎓</span>
          <span className="font-semibold">EduTeach</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 h-14">
            <h1 className="text-xl font-semibold">Student Progress</h1>
          </div>
        </header>

        <div className="flex flex-1 bg-white">
          <div className="w-[300px] border-r p-4">
            <h2 className="text-lg font-semibold">Students</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : students.length === 0 ? (
              <p className="text-gray-500">No students found.</p>
            ) : (
              <div className="overflow-auto h-[calc(100vh-11rem)]">
                {students.map((student) => (
                  <div
                    key={student._id}
                    className={`flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100 ${
                      selectedStudent?._id === student._id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => {
                      setSelectedStudent(student);
                      setEditedStudent(student); // Initialize editedStudent with current data
                      setIsEditing(false); // Disable editing on selection
                    }}
                  >
                    <span>
                      {`${student.firstName} ${student.lastName}` || "Unknown Student"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 p-6">
            <h2 className="text-lg font-semibold">Student Details</h2>

            {selectedStudent ? (
              <div className="mt-4 bg-gray-100 p-4 rounded-md">
                {isEditing ? (
                  <>
                    <h3 className="text-xl font-semibold">Edit Student</h3>
                    
                    <input
                      type="text"
                      name="firstName"
                      value={editedStudent.firstName || ""}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="block w-full p-2 mt-2 border rounded"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={editedStudent.lastName || ""}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="block w-full p-2 mt-2 border rounded"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={editedStudent.phone || ""}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      className="block w-full p-2 mt-2 border rounded"
                    />
                    <input
                      type="text"
                      name="address"
                      value={editedStudent.address || ""}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="block w-full p-2 mt-2 border rounded"
                    />
                    <input
                      type="text"
                      name="address"
                      value={editedStudent.dateOfBirth || ""}
                      onChange={handleInputChange}
                      placeholder="DateOfBirth"
                      className="block w-full p-2 mt-2 border rounded"
                    />
                    <button
                      onClick={handleSave}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold">
                      {selectedStudent.firstName} {selectedStudent.lastName}
                    </h3>
                    <p className="text-gray-600">Phone: {selectedStudent.phone}</p>
                    <p className="text-gray-600">First Name: {selectedStudent.firstName}</p>
                    <p className="text-gray-600">Last Name: {selectedStudent.lastName}</p>
                    <p className="text-gray-600">Date of Birth: {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                    <p className="text-gray-600">Address: {selectedStudent.address}</p>
                    <p className="text-gray-600">Role: {selectedStudent.role}</p>
                    <p className="text-gray-600">ID: {selectedStudent._id}</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Select a student to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSProfile;
