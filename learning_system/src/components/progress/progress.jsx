"use client";

import { useState, useEffect } from "react";

function Progress() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progressHistory, setProgressHistory] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students"); // Explicit URL
        console.log("Response object:", response); // Check the raw response

        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        console.log("Fetched students data:", data); // Debugging
        setStudents(data);
        console.log(students);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Fetch progress history when a student is selected
  useEffect(() => {
    console.log("hellow");
    if (!selectedStudent) return;

    const fetchProgressHistory = async () => {
      try {
        console.log("Fetching progress...");
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/progress/${selectedStudent._id}`);
    
        console.log("Received response");
    
        if (!response.ok) throw new Error("Failed to fetch progress history");
    
        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }
    
        const data = await response.json();
        console.log("Progress history:", data);
        setProgressHistory(data);
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
    if (!selectedStudent || !newNote.trim()) return;

    try {
      console.log("helow1");
      const response = await fetch("http://localhost:5000/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudent._id,
          notes: newNote,
        }),
      });
      console.log("helow2");
      if (!response.ok) throw new Error("Failed to add progress note");

      const newProgress = await response.json();
      setProgressHistory([newProgress, ...progressHistory]);
      setNewNote(""); // Clear input after saving
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b">
          <span className="text-2xl">🎓</span>
          <span className="font-semibold">EduTeach</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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
            ) : students.length === 0 ? (
              <p className="text-gray-500">No students found.</p>
            ) : (
              <div className="overflow-auto h-[calc(100vh-11rem)]">
                {/* .filter((student) =>
                      student?.name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) */}
                {students?.length > 0 ? (
                  students.map((student) => (
                    <div
                      key={student._id}
                      className={`flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100 ${
                        selectedStudent?._id === student._id
                          ? "bg-blue-100"
                          : ""
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <span>
                        {`${student.firstName} ${student.lastName}` ||
                          "Unknown Student"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>Loading students...</p>
                )}
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
                      <div key={entry._id} className="p-3 border-b">
                        <div className="text-gray-600 text-sm">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </div>
                        <p>{entry.notes}</p>
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
