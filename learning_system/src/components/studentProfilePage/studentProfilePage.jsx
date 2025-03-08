import React, { useState, useEffect } from "react";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const studentRes = await fetch("http://localhost:5000/students"); // Assuming this returns a single student
        const studentData = await studentRes.json();
        setStudent(studentData);

        const attendanceRes = await fetch(`http://localhost:5000/students/${studentData.id}/attendance`);
        const attendanceData = await attendanceRes.json();
        setAttendance(attendanceData);

        const progressRes = await fetch(`http://localhost:5000/students/${studentData.id}/progress`);
        const progressData = await progressRes.json();
        setProgress(progressData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-blue-600">📚</span> EduTeach
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Student Profile</h2>
        </header>

        <main className="p-6">
          {loading ? (
            <p>Loading student details...</p>
          ) : student ? (
            <>
              {/* Profile Info */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold">{student.name}</h3>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Student ID:</strong> {student.studentId}</p>
                <p><strong>Role:</strong> {student.role}</p>
              </div>

              {/* Attendance */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h4 className="text-lg font-medium mb-4">Attendance Overview</h4>
                {attendance.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    {attendance.map((month) => (
                      <div key={month.month}>
                        <span>{month.month}</span> - <span>{month.percentage}%</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No attendance records found.</p>
                )}
              </div>

              {/* Progress Reports */}
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-medium mb-4">Progress Messages</h4>
                {progress.length > 0 ? (
                  <div className="space-y-4">
                    {progress.map((item, index) => (
                      <div key={index}>
                        <p><strong>{item.subject}</strong> - {item.remarks}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No progress records found.</p>
                )}
              </div>
            </>
          ) : (
            <p>No student data available.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;
