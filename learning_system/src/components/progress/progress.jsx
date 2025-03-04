"use client";

import { useState, useEffect } from "react";

function Progress() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progressHistory, setProgressHistory] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  // Fetch progress history when a student is selected
  useEffect(() => {
    if (!selectedStudent) return;
    
    const fetchProgressHistory = async () => {
      try {
        const response = await fetch(`/api/progress/${selectedStudent._id}`);
        const data = await response.json();
        setProgressHistory(data);
      } catch (error) {
        console.error("Error fetching progress history:", error);
      }
    };
    fetchProgressHistory();
  }, [selectedStudent]);

  // Handle adding a progress note
  const handleAddNote = async () => {
    if (!selectedStudent || !newNote.trim()) return;

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: selectedStudent._id, notes: newNote }),
      });

      if (response.ok) {
        const newProgress = await response.json();
        setProgressHistory([newProgress, ...progressHistory]);
        setNewNote(""); // Clear input after saving
      }
    } catch (error) {
      console.error("Error adding progress note:", error);
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
            <div className="overflow-auto h-[calc(100vh-11rem)]">
              {students
                .filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((student) => (
                  <div
                    key={student._id}
                    className={`flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100 ${
                      selectedStudent?._id === student._id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <img src="https://via.placeholder.com/40" alt="Student avatar" className="h-10 w-10 rounded-full" />
                    <span>{student.name}</span>
                  </div>
                ))}
            </div>
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

                <div className="mt-6">
                  {progressHistory.length > 0 ? (
                    progressHistory.map((entry) => (
                      <div key={entry._id} className="p-3 border-b">
                        <div className="text-gray-600 text-sm">{new Date(entry.createdAt).toLocaleDateString()}</div>
                        <p>{entry.notes}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No progress history available.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-500">Select a student to view progress.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
