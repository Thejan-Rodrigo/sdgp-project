import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const ContactListT = ({ onSelectStudent }) => {
  const { user } = useAuth(); // Get teacher ID
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/bySchool/${user.schoolId}`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (user?.schoolId) fetchStudents();
  }, [user?.schoolId]);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r bg-white">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Students</h2>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto">
        {filteredStudents.map((student) => (
          <div
            key={student._id}
            className="p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors"
            onClick={() => onSelectStudent(student)}
          >
            <h3 className="font-semibold text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-500">Parent ID: {student.parentId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactListT;
