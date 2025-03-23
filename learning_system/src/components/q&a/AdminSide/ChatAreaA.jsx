import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Search } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import ChatHeader from "./ChatHeaderA";
import ChatInput from "./ChatInputA";
import Message from "./MessageA";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const AdminChat = () => {
  const { user } = useAuth();
  const senderId = user?._id || "67ceb8c8c1c3dfe20547e3d6"; // Default Admin ID
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/chat/superadmins");
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/get/${senderId}/${selectedUser._id}`);
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchMessages();
    socket.emit("join", senderId);

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      if (
        (message.senderId === senderId && message.receiverId === selectedUser._id) ||
        (message.senderId === selectedUser._id && message.receiverId === senderId)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Cleanup listener on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [senderId, selectedUser]);

  const handleSendMessage = async (messageContent) => {
    if (!messageContent.trim() || !senderId || !selectedUser) return;

    const messageData = {
      senderId,
      receiverId: selectedUser._id,
      message: messageContent,
      timestamp: new Date().toISOString(),
    };

    try {
      // // Send the message to the backend
      // const response = await axios.post("http://localhost:5000/api/chat/send", messageData);
      // const savedMessage = response.data;

      // // Update the messages state with the new message
      // setMessages((prev) => [...prev, savedMessage]);

      // Emit the message via socket for real-time updates
      socket.emit("sendMessage", messageData);
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  const filteredUsers = users.filter((user) =>
    (`${user.firstName} ${user.lastName}`).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <div className="w-80 border-r bg-white overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Super Admin</h2>
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

        <div>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className={`p-4 cursor-pointer border-b transition-colors ${selectedUser?._id === user._id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                onClick={() => setSelectedUser(user)}
              >
                <h3 className="font-semibold text-gray-900">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 p-4">No super admin found</p>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <ChatHeader admin={{ name: `${selectedUser.firstName} ${selectedUser.lastName}` }} />
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <Message key={index} {...msg} currentUserId={senderId} />
                ))
              ) : (
                <p className="text-gray-500 text-center">Start a conversation...</p>
              )}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="text-center text-gray-500 p-4">
            <p className="text-gray-500 text p-4">Select a super admin to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;