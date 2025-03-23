import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const ContactListA = ({ onSelectUser }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user?._id]);

  const filteredUsers = users.filter((user) =>
    (`${user.firstName} ${user.lastName}`).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r bg-white">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Super Admin </h2>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors"
              onClick={() => onSelectUser({
                _id: user._id,
                name: `${user.firstName} ${user.lastName}`,
              })}
            >
              <h3 className="font-semibold text-gray-900">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-gray-500">Role: {user.role}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4">No users found</p>
        )}
      </div>
    </div>
  );
};

export default ContactListA;
