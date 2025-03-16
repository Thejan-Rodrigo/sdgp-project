import React, { useState, useEffect } from "react";
import axios from "axios";

const teacherSProfile = () => {
  const [students, setStudents] = useState([]);

  // Replace this with the actual school ID
  const schoolId = "67cc5370e98552e9b5a6e097";

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/students/school/${schoolId}`);
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Students</h1>
      <div className="flex flex-wrap justify-center p-4 gap-6">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white rounded-2xl shadow-lg p-6 m-2 w-80 flex flex-col items-center"
          >
            <img
              className="w-24 h-24 rounded-full mb-4"
              src={student.profilePicture || "https://via.placeholder.com/150"}
              alt={student.firstName}
            />
            <h2 className="text-xl font-semibold">{`${student.firstName} ${student.lastName}`}</h2>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default teacherSProfile;
