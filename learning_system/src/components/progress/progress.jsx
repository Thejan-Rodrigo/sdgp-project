"use client";

import { useState, useEffect } from "react";
import Sidebar from "../TeaSidebar";
import { useAuth } from '../../context/AuthContext';
import { TrashIcon } from "@heroicons/react/24/outline";

function Progress() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progressHistory, setProgressHistory] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.schoolId) return;

    const fetchStudentsBySchoolId = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/progress/school/${user.schoolId}`);
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        if (data.success && data.data?.students) {
          setStudents(data.data.students);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentsBySchoolId();
  }, [user]);

  useEffect(() => {
    if (!selectedStudent) return;

    const fetchProgressHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/progress/student/${selectedStudent._id}`);
        if (!response.ok) throw new Error("Failed to fetch progress history");
        const data = await response.json();
        if (data.success && data.data?.progress) {
          setProgressHistory(data.data.progress);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProgressHistory();
  }, [selectedStudent]);

  const handleAddNote = async () => {
    if (!selectedStudent || !newNote.trim() || !user) return;
    try {
      const response = await fetch("http://localhost:5000/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudent._id,
          teacherId: user.id,
          notes: newNote,
        }),
      });
      if (!response.ok) throw new Error("Failed to add progress note");
      const data = await response.json();
      if (data.success && data.data?.newProgress) {
        setProgressHistory([data.data.newProgress, ...progressHistory]);
        setNewNote("");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteProgress = async (progressId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/progress/${progressId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete progress note");
      const data = await response.json();
      if (data.success && data.data?.deletedProgress) {
        setProgressHistory(progressHistory.filter((entry) => entry._id !== progressId));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredStudents = students.filter((student) => 
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar className="w-64 fixed h-full" />
      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-white border-b px-6 h-14 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Student Progress</h1>
          <input
            type="text"
            className="border rounded-md px-3 py-1"
            placeholder="Search student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>

        <div className="flex flex-1 bg-white">
          <div className="w-64 border-r p-4 overflow-auto">
            <h2 className="text-lg font-semibold">Students</h2>
            {loading ? <p>Loading students...</p> : 
              (filteredStudents.length === 0 ? <p>No students found.</p> : 
                filteredStudents.map((student) => (
                  <div key={student._id} className={`p-3 border-b cursor-pointer ${selectedStudent?._id === student._id ? "bg-blue-100" : "hover:bg-gray-100"}`} onClick={() => setSelectedStudent(student)}>
                    {`${student.firstName} ${student.lastName}`}
                  </div>
                ))
              )
            }
          </div>

          <div className="flex-1 p-6">
            <h2 className="text-lg font-semibold">Progress History</h2>
            {selectedStudent ? (
              <>
                <textarea className="w-full border rounded-md p-2 mt-4" rows="3" placeholder="Add a progress note..." value={newNote} onChange={(e) => setNewNote(e.target.value)}></textarea>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={handleAddNote}>Save Progress</button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="mt-6">
                  {loading ? <p>Loading progress history...</p> : 
                    (progressHistory.length > 0 ? 
                      progressHistory.map((entry) => (
                        <div key={entry._id} className="p-3 border-b hover:bg-gray-50 transition-colors flex justify-between items-start">
                          <div>
                            <div className="text-gray-600 text-sm">{new Date(entry.createdAt).toLocaleDateString()}</div>
                            <p className="mt-1">{entry.notes}</p>
                          </div>
                          <button className="text-gray-500 hover:text-red-500" onClick={() => handleDeleteProgress(entry._id)}>
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )) : <p>No progress history available.</p>)
                  }
                </div>
              </>
            ) : <p>Select a student to view progress.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
