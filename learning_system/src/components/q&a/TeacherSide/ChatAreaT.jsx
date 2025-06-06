import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import ChatHeader from "./ChatHeaderT";
import ChatInput from "./ChatInputT";
import Message from "./MessageT";

const socket = io("http://localhost:5000");

const ChatArea = () => {
  const { user } = useAuth();
  const senderId = user?.id;
  const schoolId = user?.schoolId;

  const [receiverId, setReceiverId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true); // For toggling student list

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/students/bySchool/${schoolId}`);
        console.log("Fetched Students:", response.data);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [schoolId]);

  useEffect(() => {
    if (!receiverId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/get/${senderId}/${receiverId}`);
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
      // const response = await axios.post("http://localhost:5000/api/chat/send", messageData);
      // const savedMessage = response.data;
      // setMessages((prev) => [...prev, savedMessage]);
      socket.emit("sendMessage", messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to handle message deletion
  const handleDeleteMessage = async (messageId) => {
    try {
      // Call the delete API
      await axios.delete(`http://localhost:5000/api/chat/delete/${messageId}`, {
        data: { userId: senderId }, // Send userId in the request body
      });

      // Remove the deleted message from the messages state
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error.response?.data || error.message);
    }
  };

  const filteredStudents = students.filter((student) =>
    (`${student.firstName} ${student.lastName}`).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Contact List Section */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b flex justify-between items-center cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <h2 className="text-xl font-semibold">Students</h2>
          {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        {isDropdownOpen && (
          <>
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
                    onClick={() => {
                      setSelectedStudent({
                        _id: student._id,
                        name: `${student.firstName} ${student.lastName}`,
                        parentId: student.parent,
                      });
                      setReceiverId(student.parent);
                    }}
                  >
                    <h3 className="font-semibold text-gray-900">{student.firstName} {student.lastName}</h3>
                    <p className="text-sm text-gray-500">Parent ID: {student.parent}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 p-4">No students found</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Chat Area Section */}
      <div className="flex-1 flex flex-col">
        {selectedStudent ? (
          <>
            <ChatHeader teacher={{ name: selectedStudent.name }} />
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <Message
                    key={index}
                    {...msg}
                    timestamp={msg.createdAt}
                    currentUserId={senderId}
                    onDelete={handleDeleteMessage} // Pass the delete handler
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center">Start a conversation...</p>
              )}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <p className="text-center text-gray-500 p-4">Select a student to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default ChatArea;