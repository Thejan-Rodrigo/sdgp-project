import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Search } from "lucide-react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const ParentChatArea = () => {
  const { user } = useAuth();
  const senderId = user?._id;
  const schoolId = user?.schoolId;

  const [receiverId, setReceiverId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/teachers/bySchool/67cc5370e98552e9b5a6e097`);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    if (schoolId) fetchTeachers();
  }, [schoolId]);

  useEffect(() => {
    if (!receiverId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/${senderId}/${receiverId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchMessages();
    socket.emit("join", senderId);

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [senderId, receiverId]);

  const handleSendMessage = async (messageContent) => {
    if (!messageContent.trim() || !receiverId) return;

    const messageData = {
      senderId,
      receiverId,
      message: messageContent,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/chat/send", messageData);
      const savedMessage = response.data;
      setMessages((prev) => [...prev, savedMessage]);
      socket.emit("sendMessage", savedMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Section */}
      <div className="w-64 flex-shrink-0">
        <div className="h-full border-r bg-white flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Teachers</h2>
          </div>

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

          <div className="overflow-y-auto flex-1">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <div
                  key={teacher._id}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors"
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    setReceiverId(teacher._id);
                  }}
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
      </div>

      {/* Chat Area Section */}
      <div className="flex-1 flex flex-col">
        {selectedTeacher ? (
          <>
            <ChatHeader teacher={{ name: selectedTeacher.name, subject: selectedTeacher.subject }} />
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
          <p className="text-center text-gray-500 p-4">Select a teacher to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default ParentChatArea;
