import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const ContactListP = ({ onSelectTeacher }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    //if (!user?.schoolId) return;

    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/teachers/bySchool/67cc5370e98552e9b5a6e097`);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, [user?.schoolId]);

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r bg-white">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Teachers</h2>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search teachers..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Teachers List */}
      <div className="overflow-y-auto">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors"
              onClick={() => onSelectTeacher({
                _id: teacher._id,
                name: teacher.name,
              })}
            >
              <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
              <p className="text-sm text-gray-500">{teacher.subject}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4">No teachers found</p>
        )}
      </div>
    </div>
  );
};

export default ContactListP;
