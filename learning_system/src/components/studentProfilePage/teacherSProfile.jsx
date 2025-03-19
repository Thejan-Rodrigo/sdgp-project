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
          {/* Student List Section */}
          <div className="w-[300px] border-r p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">Students</h2>
            {loading ? (
              <LoadingAnimation /> // Use the loading animation
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : students.length === 0 ? (
              <p className="text-gray-500">No students found.</p>
            ) : (
              <div className="overflow-auto h-[calc(100vh-11rem)]">
                {students.map((student) => (
                  <div
                    key={student._id}
                    className={`flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-blue-50 transition-colors duration-200 ${
                      selectedStudent?._id === student._id ? "bg-blue-100" : "bg-white"
                    }`}
                    onClick={() => {
                      console.log("Selected student ID:", student._id); // Debugging
                      setSelectedStudent(student); // Update directly from the array
                    }}
                  >
                    <span className="text-gray-700">
                      {`${student.firstName} ${student.lastName}` || "Unknown Student"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Student Details and Progress Section */}
          <div className="flex-1 p-6 bg-gray-50">
            <h2 className="text-lg font-semibold mb-6">Student Details</h2>

            {selectedStudent ? (
              <div className="mt-4 bg-blue-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>ID:</strong> {selectedStudent._id}</p>
                  <p><strong>Role:</strong> {selectedStudent.role}</p>
                  <p><strong>First Name:</strong> {selectedStudent.firstName}</p>
                  <p><strong>Last Name:</strong> {selectedStudent.lastName}</p>
                  <p><strong>Date of Birth:</strong> {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                  <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                  <p><strong>Address:</strong> {selectedStudent.address}</p>
                  <p><strong>School ID:</strong> {selectedStudent.schoolId}</p>
                  <p><strong>Parent:</strong> {selectedStudent.parentFirstName} {selectedStudent.parentLastName}</p>
                </div>

                {/* Progress Section */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Progress Records</h4>
                  {loading ? (
                    <LoadingAnimation /> // Use the loading animation
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : progress.length === 0 ? (
                    <p className="text-gray-500">No progress are posted by teachers yet...</p>
                  ) : (
                    <div className="space-y-4">
                      {progress.map((record) => (
                        <div key={record._id} className="p-4 bg-white rounded-md shadow-sm">
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