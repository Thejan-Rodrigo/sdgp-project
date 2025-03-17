import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const StudentProfile = () => {
  const [student, setStudent] = useState(null); // Change initial state to null
  const [attendance, setAttendance] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the authenticated user (parent) from the context
  const { user } = useAuth();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        if (!user || !user.id) {
          console.error("Parent ID not found in auth context.");
          return;
        }

        // Fetch Student Details using the parent ID
        const studentRes = await fetch(
          `http://localhost:5000/api/students/parent/${user.id}`
        );
        const studentData = await studentRes.json();
        console.log(studentData);

        if (!studentData || studentData.length === 0) {
          console.error("No student found for this parent.");
          return;
        }

        // Assuming the API returns an array of students, take the first student
        setStudent(studentData[0]);

        // Fetch Progress Data using the parent ID
        const progressRes = await fetch(
          `http://localhost:5000/api/students/parent/${user.id}/progress`
        );
        const progressData = await progressRes.json();
        console.log(progressData);

        if (!progressData || progressData.length === 0) {
          console.error("No progress records found for this parent.");
        } else {
          setProgress(progressData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [user]); // Add user as a dependency to re-fetch when the user changes

  // Function to format date to yyyy/mm/dd
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle null or undefined dates
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

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
          ) : student ? (
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-4">
                {`${student.firstName} ${student.lastName}`}
              </h3>
              <p><strong>Role:</strong> {student.role || "N/A"}</p>
              <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
              <p><strong>Address:</strong> {student.address || "N/A"}</p>
              <p><strong>Date of Birth:</strong> {formatDate(student.dateOfBirth)}</p>
            </div>
          ) : (
            <p>No student data found.</p>
          )}

          {/* Progress Reports */}
          <div className="bg-white rounded-lg p-6">
            <h4 className="text-lg font-medium mb-4">Progress Messages</h4>
            {progress.length > 0 ? (
              progress.map((item, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium">{item.teacher}</h5>
                    <p className="text-sm text-gray-500">{item.notes}</p>
                    <p className="text-sm text-gray-500">
                      Created Date: {formatDate(item.createdAt)}
                    </p>
                    <p className="mt-2 text-gray-600">{item.remarks}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No progress records found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;