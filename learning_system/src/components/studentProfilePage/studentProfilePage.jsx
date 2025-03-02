import React, { useState, useEffect } from "react";

const StudentProfile = ({ studentId }) => {
  const [student, setStudent] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Fetch Student Profile
        const studentRes = await fetch(`http://localhost:5000/students/${studentId}`);
        const studentData = await studentRes.json();
        setStudent(studentData);

        // Fetch Attendance
        const attendanceRes = await fetch(`http://localhost:5000/students/${studentId}/attendance`);
        const attendanceData = await attendanceRes.json();
        setAttendance(attendanceData);

        // Fetch Progress
        const progressRes = await fetch(`http://localhost:5000/students/${studentId}/progress`);
        const progressData = await progressRes.json();
        setProgress(progressData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-blue-600">📚</span> EduTeach
          </h1>
        </div>
        <div className="p-2">
          <div className="flex items-center gap-3 p-2 rounded-lg">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(957)-5e3TmHrDL3HXRTMv5sjmO9Udl51G7a.png"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-medium">{student?.name || "Loading..."}</div>
              <div className="text-sm text-gray-500">Class {student?.class || "..."}</div>
            </div>
          </div>
          <nav className="mt-4 space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              📢 Announcements
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              📅 Meeting Schedule
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-blue-600 bg-blue-50 rounded-md">
              👤 Student Profile
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              📊 Learning Progress
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              ❓ Q&A
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Student Profile</h2>
          <div className="flex items-center gap-4">
            <select className="border rounded-md px-3 py-1.5">
              <option>{student?.class || "Loading..."}</option>
            </select>
            <button className="text-gray-600">🔔</button>
          </div>
        </header>

        <main className="p-6">
          {/* Profile Info */}
          {loading ? (
            <p>Loading student details...</p>
          ) : (
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex gap-6">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(957)-5e3TmHrDL3HXRTMv5sjmO9Udl51G7a.png"
                  alt="Profile"
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-2xl font-semibold mb-4">{student.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="text-gray-500">Class:</span> {student.class}</div>
                    <div><span className="text-gray-500">Roll Number:</span> {student.rollNumber}</div>
                    <div><span className="text-gray-500">Age:</span> {student.age}</div>
                    <div><span className="text-gray-500">Gender:</span> {student.gender}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-lg font-medium mb-4">Attendance Overview</h4>
            <div className="grid md:grid-cols-3 gap-6">
              {attendance.length > 0 ? (
                attendance.map((month) => (
                  <div key={month.month}>
                    <div className="flex justify-between mb-2">
                      <span>{month.month}</span>
                      <span>{month.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${month.percentage}%` }} />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Present: {month.presentDays} / {month.totalDays} days
                    </p>
                  </div>
                ))
              ) : (
                <p>No attendance records found.</p>
              )}
            </div>
          </div>

          {/* Progress Reports */}
          <div className="bg-white rounded-lg p-6">
            <h4 className="text-lg font-medium mb-4">Progress Messages</h4>
            <div className="space-y-4">
              {progress.length > 0 ? (
                progress.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0" />
                    <div>
                      <div className="flex justify-between">
                        <div>
                          <h5 className="font-medium">{item.teacher}</h5>
                          <p className="text-sm text-gray-500">{item.subject}</p>
                        </div>
                        <span className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-2 text-gray-600">{item.remarks}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No progress records found.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;
