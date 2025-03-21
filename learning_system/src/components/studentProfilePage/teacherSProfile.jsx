"use client";

import { useState, useEffect } from "react";
import TeaSidebar from "../TeaSidebar";

function TeacherSProfile({ user }) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentsBySchoolId = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`http://localhost:5000/api/students/school/67cc5370e98552e9b5a6e097`);
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentsBySchoolId();
  }, [user]);

  useEffect(() => {
    const fetchProgressByStudentId = async () => {
      if (!selectedStudent) return;
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`http://localhost:5000/api/students/${selectedStudent._id}/progress`);
        if (response.status === 404) {
          setProgress([]);
          setError("No progress records found for this student.");
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch progress data");
        const data = await response.json();
        if (data.message === "No progress records found for this student.") {
          setProgress([]);
          setError("No progress are posted by teachers yet...");
        } else {
          setProgress(data);
          setError("");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProgressByStudentId();
  }, [selectedStudent]);

  return (
    <div className="flex h-screen">
      {/* Sidebar fixed to the left */}
      <div className="w-[250px] fixed h-full">
        <TeaSidebar />
      </div>
      
      {/* Main content moves to the right */}
      <div className="flex-1 ml-[250px] flex flex-col">
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 h-14">
            <h1 className="text-xl font-semibold">Student Progress</h1>
          </div>
        </header>
        <div className="flex flex-1 bg-white">
          <div className="w-[300px] border-r p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">Students</h2>
            {loading ? <p>Loading...</p> : students.length === 0 ? <p>No students found.</p> : (
              <div className="overflow-auto h-[calc(100vh-11rem)]">
                {students.map((student) => (
                  <div
                    key={student._id}
                    className={`p-3 border-b cursor-pointer hover:bg-blue-50 transition-colors ${selectedStudent?._id === student._id ? "bg-blue-100" : "bg-white"}`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    {student.firstName} {student.lastName}
                  </div>
                ))}
              </div>
            )}
          </div>
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
                  <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                  <p><strong>Address:</strong> {selectedStudent.address}</p>
                </div>
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Progress Records</h4>
                  {loading ? <p>Loading...</p> : progress.length === 0 ? <p>No progress yet...</p> : (
                    <div className="space-y-4">
                      {progress.map((record) => (
                        <div key={record._id} className="p-4 bg-white rounded-md shadow-sm">
                          <p><strong>Notes:</strong> {record.notes}</p>
                          <p><strong>Posted By:</strong> {record.teacherFirstName} {record.teacherLastName}</p>
                          <p><strong>Created At:</strong> {new Date(record.createdAt).toLocaleDateString()}</p>
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
