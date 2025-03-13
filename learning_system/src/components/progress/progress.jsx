"use client";

import { useState, useEffect } from "react";
import Sidebar from "../TeaSidebar";
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import { TrashIcon } from "@heroicons/react/24/outline"; // Import the bin icon from Heroicons

function Progress() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progressHistory, setProgressHistory] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get the authenticated user from the context
  const { user } = useAuth();

  // Fetch students by school ID (from the authenticated user)
  useEffect(() => {
    if (!user || !user.schoolId) return; // Ensure user and schoolId are available

    const fetchStudentsBySchoolId = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/progress/school/${user.schoolId}`); // Use user.schoolId
        console.log("Response object:", response); // Check the raw response

        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        console.log("Fetched students data:", data); // Debugging

        // Extract the students array from the response
        if (data.success && data.data && data.data.students) {
          setStudents(data.data.students);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsBySchoolId();
  }, [user]); // Re-fetch when user changes

  // Fetch progress history when a student is selected
  useEffect(() => {
    if (!selectedStudent) return;

    const fetchProgressHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/progress/student/${selectedStudent._id}`);

        if (!response.ok) throw new Error("Failed to fetch progress history");

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }

        const data = await response.json();
        console.log("Progress history:", data);

        // Extract the progress array from the response
        if (data.success && data.data && data.data.progress) {
          setProgressHistory(data.data.progress);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching progress:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressHistory();
  }, [selectedStudent]);

  // Handle adding a progress note
  const handleAddNote = async () => {
    if (!selectedStudent || !newNote.trim() || !user) return; // Ensure user is available

    try {
      const response = await fetch("http://localhost:5000/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudent._id,
          teacherId: user.id, // Use user._id as teacherId
          notes: newNote,
        }),
      });

      if (!response.ok) throw new Error("Failed to add progress note");

      const data = await response.json();

      // Extract the new progress note from the response
      if (data.success && data.data && data.data.newProgress) {
        setProgressHistory([data.data.newProgress, ...progressHistory]);
        setNewNote(""); // Clear input after saving
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle deleting a progress note
  const handleDeleteProgress = async (progressId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/progress/${progressId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete progress note");

      const data = await response.json();

      // Remove the deleted progress note from the state
      if (data.success && data.data && data.data.deletedProgress) {
        setProgressHistory(progressHistory.filter((entry) => entry._id !== progressId));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-7">
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 h-14">
            <h1 className="text-xl font-semibold">Student Progress</h1>
            <input
              type="text"
              className="border rounded-md px-3 py-1"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="flex flex-1 bg-white">
          {/* Student List */}
          <div className="w-[300px] border-r p-4">
            <h2 className="text-lg font-semibold">Students</h2>
            {loading ? (
              <p className="text-gray-500">Loading students...</p>
            ) : filteredStudents.length === 0 ? (
              <p className="text-gray-500">No students found.</p>
            ) : (
              <div className="overflow-auto h-[calc(100vh-11rem)]">
                {filteredStudents.map((student) => (
                  <div
                    key={student._id}
                    className={`flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100 ${
                      selectedStudent?._id === student._id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <span>
                      {`${student.firstName} ${student.lastName}` || "Unknown Student"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Progress History */}
          <div className="flex-1 p-6">
            <h2 className="text-lg font-semibold">Progress History</h2>

            {selectedStudent ? (
              <>
                <div className="mt-4">
                  <textarea
                    className="w-full border rounded-md p-2"
                    rows="3"
                    placeholder="Add a progress note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  ></textarea>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                    onClick={handleAddNote}
                  >
                    Save Progress
                  </button>
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div className="mt-6">
                  {loading ? (
                    <p className="text-gray-500">Loading progress history...</p>
                  ) : progressHistory.length > 0 ? (
                    progressHistory.map((entry) => (
                      <div key={entry._id} className="p-3 border-b hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-gray-600 text-sm">
                              {new Date(entry.createdAt).toLocaleDateString()}
                            </div>
                            <p className="mt-1">{entry.notes}</p>
                            {/* Display teacher's name */}
                            {entry.teacherId && (
                              <div className="text-gray-600 text-sm mt-1">
                                Added by: {entry.teacherId.firstName} {entry.teacherId.lastName}
                              </div>
                            )}
                          </div>
                          {/* Bin icon for delete */}
                          <button
                            className="text-gray-500 hover:text-red-500 transition-colors"
                            onClick={() => handleDeleteProgress(entry._id)}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No progress history available.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-500">
                Select a student to view progress.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;