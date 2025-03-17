"use client";

import { useState, useEffect } from "react";

function TeacherSProfile({ user }) {
  const [students, setStudents] = useState([]); // State for the list of students
  const [selectedStudent, setSelectedStudent] = useState(true); // State for selected student
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch students by school ID (from the authenticated user)
  useEffect(() => {
    //if (!user || !user.schoolId) return; // Ensure user and schoolId are available

    const fetchStudentsBySchoolId = async () => {
      try {
        console.log("hi");
        setLoading(true);
        setError("");
        const response = await fetch(`http://localhost:5000/students/school/67cc5370e98552e9b5a6e097`);
        console.log("hi");
        console.log("Response object:", response);
        console.log("h1"); // Check the raw response

        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        console.log("Fetched students data:", data); // Debugging

        
        console.log(data);
        setStudents(data);
        
         
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsBySchoolId();
  }, [user]); // Re-fetch when user changes

  // Fetch student details when a student is selected
  const fetchStudentDetails = async (studentId) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`http://localhost:5000/students/${studentId}`);

      if (!response.ok) throw new Error("Failed to fetch student details");

      const data = await response.json();
      setSelectedStudent(data.data); // Update with the student details
    } catch (error) {
      console.error("Error fetching student details:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
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
                    onClick={() => fetchStudentDetails(student._id)}
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
                <h3 className="text-xl font-semibold">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </h3>
                <p className="text-gray-600">ID: {selectedStudent._id}</p>
                <p className="text-gray-600">Role: {selectedStudent.role}</p>
                <p className="text-gray-600">Date of Birth: {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                <p className="text-gray-600">Phone: {selectedStudent.phone}</p>
                <p className="text-gray-600">Address: {selectedStudent.address}</p>
                <p className="text-gray-600">School ID: {selectedStudent.schoolId}</p>
                <p className="text-gray-600">Parent ID: {selectedStudent.parent}</p>
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

export default TeacherSProfile;
