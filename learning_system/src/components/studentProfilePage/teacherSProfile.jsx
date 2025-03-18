"use client";

import { useState, useEffect } from "react";
import TeaSidebar from "../TeaSidebar";

function TeacherSProfile({ user }) {
  const [students, setStudents] = useState([]); // State for the list of students
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student
  const [progress, setProgress] = useState([]); // State for progress data
  const [loading, setLoading] = useState(null); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch students by school ID (from the authenticated user)
  useEffect(() => {
    const fetchStudentsBySchoolId = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`http://localhost:5000/api/students/school/67cc5370e98552e9b5a6e097`);

        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        console.log("Fetched students data:", data); // Debugging

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

  // Fetch progress data when a student is selected
  useEffect(() => {
    const fetchProgressByStudentId = async () => {
      if (!selectedStudent) return; // Do nothing if no student is selected

      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `http://localhost:5000/api/students/${selectedStudent._id}/progress`
        );

        // Handle 404 Not Found error
        if (response.status === 404) {
          setProgress([]); // Set progress to an empty array
          setError("No progress records found for this student."); // Set a user-friendly message
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch progress data");

        const data = await response.json();

        // Check if the response contains a "message" field
        if (data.message && data.message === "No progress records found for this student.") {
          setProgress([]); // Set progress to an empty array
          setError("No progress are posted by teachers yet..."); // Set a user-friendly message
        } else {
          setProgress(data); // Set progress data
          setError(""); // Clear any previous error
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressByStudentId();
  }, [selectedStudent]); // Re-run when selectedStudent changes

  return (
    <div className="flex h-screen">
      <TeaSidebar />

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
                    className={`flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100 ${selectedStudent?._id === student._id ? "bg-blue-100" : ""
                      }`}
                    onClick={() => {
                      console.log("Selected student ID:", student._id); // Debugging
                      setSelectedStudent(student); // Update directly from the array
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
                <h3 className="text-xl font-semibold">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </h3>
                <p className="text-gray-600">ID: {selectedStudent._id}</p>
                <p className="text-gray-600">Role: {selectedStudent.role}</p>
                <p className="text-gray-600">First Name: {selectedStudent.firstName}</p>
                <p className="text-gray-600">Last Name: {selectedStudent.lastName}</p>
                <p className="text-gray-600">Date of Birth: {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                <p className="text-gray-600">Phone: {selectedStudent.phone}</p>
                <p className="text-gray-600">Address: {selectedStudent.address}</p>
                <p className="text-gray-600">School ID: {selectedStudent.schoolId}</p>
                <p className="text-gray-600">Parent: {selectedStudent.parentFirstName} {selectedStudent.parentLastName}</p>
                {/* Progress Section */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold">Progress Records</h4>
                  {loading ? (
                    <p className="text-gray-500">Loading progress...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : progress.length === 0 ? (
                    <p className="text-gray-500">No progress are posted by teachers yet...</p>
                  ) : (
                    <div className="mt-4">
                      {progress.map((record) => (
                        <div key={record._id} className="mb-4 p-4 bg-white rounded-md shadow-sm">
                          <p className="text-gray-600"><strong>Notes:</strong> {record.notes}</p>
                          <p className="text-gray-600">
                            <strong>Posted By:</strong> {record.teacherFirstName} {record.teacherLastName}
                          </p>
                          <p className="text-gray-600">
                            <strong>Created At:</strong> {new Date(record.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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