import React, { useState, useEffect } from "react";

const StudentProfile = () => {
  const [student, setStudent] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        console.log("helow");
        // Fetch Student Details
        const studentRes = await fetch(`http://localhost:5000/students/67ceba38ebd2b490d7c573b6`);
        const studentData = await studentRes.json();
        console.log(studentData);
        setStudent(studentData);

        // Fetch Attendance
        // const attendanceRes = await fetch(`http://localhost:5000/attendance/${studentId}`);
        // const attendanceData = await attendanceRes.json();
        // setAttendance(attendanceData);

        // Fetch Progress
        // const progressRes = await fetch(`http://localhost:5000/progress/${studentId}`);
        // const progressData = await progressRes.json();
        // setProgress(progressData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

  
      fetchStudentData();
    
  }, []);

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
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-medium">
                {student ? `${student.firstName} ${student.lastName}` : "Loading..."}
              </div>
              <div className="text-sm text-gray-500">Student ID: {student?._id || "..."}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Student Profile</h2>
        </header>

        <main className="p-6">
          {/* Profile Info */}
          {loading ? (
            <p>Loading student details...</p>
          ) : (
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-4">
                {student ? `${student.firstName} ${student.lastName}` : "No Name"}
              </h3>
              <p><strong>Role:</strong> {student?.role || "N/A"}</p>
              <p><strong>Phone:</strong> {student?.phone || "N/A"}</p>
              <p><strong>Address:</strong> {student?.address || "N/A"}</p>
            </div>
          )}

          {/* Attendance
          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-lg font-medium mb-4">Attendance Overview</h4>
            {attendance.length > 0 ? (
              attendance.map((month) => (
                <div key={month.month} className="mb-4">
                  <div className="flex justify-between">
                    <span>{month.month}</span>
                    <span>{month.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${month.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Present: {month.presentDays} / {month.totalDays} days
                  </p>
                </div>
              ))
            ) : (
              <p>No attendance records found.</p>
            )}
          </div> */}

          {/* Progress Reports
          <div className="bg-white rounded-lg p-6">
            <h4 className="text-lg font-medium mb-4">Progress Messages</h4>
            {progress.length > 0 ? (
              progress.map((item, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium">{item.teacher}</h5>
                    <p className="text-sm text-gray-500">{item.subject}</p>
                    <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                    <p className="mt-2 text-gray-600">{item.remarks}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No progress records found.</p>
            )}
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;
