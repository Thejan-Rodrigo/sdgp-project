import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const ContactListT = ({ onSelectStudent }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!user?.schoolId) return;

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/bySchool/${user.schoolId}`);
        setStudents(response.data); // Store students properly
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [user?.schoolId]);

  // Ensure that student properties exist before filtering
  const filteredStudents = students.filter((student) =>
    (`${student.firstName} ${student.lastName}`).toLowerCase().includes(searchQuery.toLowerCase())
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
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div
              key={student._id}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors"
              onClick={() => onSelectStudent({
                _id: student._id,
                name: `${student.firstName} ${student.lastName}`,
                parentId: student.parent, // Fix: Use `parent` instead of `parentId`
              })}
            >
              <h3 className="font-semibold text-gray-900">{student.firstName} {student.lastName}</h3>
              <p className="text-sm text-gray-500">Parent ID: {student.parent}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4">No students found</p>
        )}
      </div>
    </div>
  );
};

export default ContactListT;
