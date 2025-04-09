"use client";

import { useState, useEffect, use } from "react";
import AdSidebar from "../AdSidebar";
import { useAuth } from "../../context/AuthContext";
import StudentAttendanceCalendar from "./StudentAttendanceCalendar";

function AdminSProfile({ users }) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [editedStudent, setEditedStudent] = useState({}); // Holds edited student details
  const [progress, setProgress] = useState([]); // State for progress data
  const { user } = useAuth(); // Added logout function


  // Fetch students by school ID
  useEffect(() => {
    const fetchStudentsBySchoolId = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`http://localhost:5000/api/students/school/${user.schoolId}`);

        if (response.status === 404) {
          throw new Error("Students are not here");
        }

        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        console.log("Fetched students data:", data);

        setStudents(data);
      } catch (error) {
        //console.error("Error fetching students:", error);
        setError(error.message);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsBySchoolId();
  }, [users]);

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

        if (!response.ok) throw new Error("Failed to fetch progress data");

        const data = await response.json();

        console.log(data)

        //If the response is an empty array, set progress to an empty array
        if (Array.isArray(data)) {
          setProgress(data);
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
      console.log(selectedStudent._id);
      const response = await fetch(`http://localhost:5000/api/students/${selectedStudent._id}`, {
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

  // Loading animation component
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
      {/* Sidebar */}
      <div className="w-[300px] flex-shrink-0">
        <AdSidebar />
      </div>

      {/* Main content section */}
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
              <LoadingAnimation /> // Use loading animation
            ) : error ? (
              <div className="text-center p-4 text-gray-500">
                {error === "Students are not here" ? (
                  <div>
                    <p>Students are not here</p>
                    <p className="text-sm">No students found for this school</p>
                  </div>
                ) : (
                  <p>Error: {error}</p>
                )}
              </div>
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
              <div className="mt-4 bg-gray-100 p-6 rounded-md">
                {isEditing ? (
                  <>
                    <h3 className="text-xl font-semibold mb-4">Edit Student</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="firstName"
                        value={editedStudent.firstName || ""}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="block w-full p-2 border rounded"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={editedStudent.lastName || ""}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="block w-full p-2 border rounded"
                      />
                      <input
                        type="text"
                        name="phone"
                        value={editedStudent.phone || ""}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        className="block w-full p-2 border rounded"
                      />
                      <input
                        type="text"
                        name="address"
                        value={editedStudent.address || ""}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="block w-full p-2 border rounded"
                      />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={editedStudent.dateOfBirth || ""}
                        onChange={handleInputChange}
                        placeholder="Date of Birth"
                        className="block w-full p-2 border rounded"
                      />
                    </div>

                    {/* Save Button */}
                    <label className="mt-6 block">
                      <input type="checkbox" checked className="peer hidden" />
                      <div
                        className="group flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-blue-600 fill-none p-2 px-3 font-extrabold text-blue-600 transition-all active:scale-90 peer-checked:fill-blue-600 peer-checked:hover:text-white"
                        onClick={handleSave}
                      >
                        <div className="z-10 transition group-hover:translate-x-4">SAVE</div>
                        <svg
                          className="size-6 transition group-hover:-translate-x-6 group-hover:-translate-y-3 group-hover:scale-[750%] duration-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          ></path>
                        </svg>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-4">
                      {selectedStudent.firstName} {selectedStudent.lastName}
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-600"><strong>Phone:</strong> {selectedStudent.phone}</p>
                      <p className="text-gray-600"><strong>First Name:</strong> {selectedStudent.firstName}</p>
                      <p className="text-gray-600"><strong>Last Name:</strong> {selectedStudent.lastName}</p>
                      <p className="text-gray-600"><strong>Date of Birth:</strong> {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                      <p className="text-gray-600"><strong>Address:</strong> {selectedStudent.address}</p>
                      <p className="text-gray-600"><strong>Role:</strong> {selectedStudent.role}</p>
                      <p className="text-gray-600"><strong>ID:</strong> {selectedStudent._id}</p>
                      <p className="text-gray-600"><strong>Parent:</strong> {selectedStudent.parentFirstName} {selectedStudent.parentLastName}</p>
                    </div>

                    {/* Edit Button */}
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 mt-6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        fill="none"
                        className="h-5 w-5 mr-1 self-center items-center"
                      >
                        <path
                          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                        ></path>
                      </svg>
                      Edit
                    </button>
                  </>
                )}

                {/* Progress Section */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Progress Records</h4>
                  {loading ? (
                    <LoadingAnimation />
                  ) : progress.length === 0 ? (
                    <p>No progress records available.</p>
                  ) : (
                    <div>
                      {progress.map((entry, index) => (
                        <div key={index} className="mb-4 p-4 bg-gray-50 rounded-md shadow-sm">
                          <h5 className="font-semibold">Teacher: {entry.teacherFirstName} {entry.teacherLastName}</h5>
                          <p className="text-gray-700">{entry.notes}</p>
                          <p className="text-sm text-gray-500">Date: {new Date(entry.createdAt).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ) : (
              <p className="text-gray-500">Select a student to view details.</p>
            )}
            <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
          {loading ? (
            <LoadingAnimation /> // Use the loading animation
          ) : selectedStudent ? (
            <StudentAttendanceCalendar
              schoolId={user.schoolId}
              studentId={selectedStudent._id}
            />
          ) : (
            <p className="text-gray-500">No student data found.</p>
          )}

        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSProfile;
