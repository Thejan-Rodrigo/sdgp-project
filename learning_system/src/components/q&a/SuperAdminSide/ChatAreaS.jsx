import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import ChatHeader from "./ChatHeaderS";
import ChatInput from "./ChatInputS";
import Message from "./MessageS";

const socket = io("http://localhost:5000");

const SuperAdminChat = () => {
  const senderId = "67ca7c9f7800be438ae1efc1"; // SuperAdmin ID (for testing)
  const [receiverId, setReceiverId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/admins`);
        console.log(response.data);
        setAdmins(response.data || []); // Ensure admins is always an array
      } catch (error) {
        console.error("Error fetching admins:", error);
        setAdmins([]); // Set to empty array on error
      }
    };

    fetchAdmins();
  }, []); // Add empty dependency array to run only once

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

  // Safely filter admins based on firstName and lastName
  const filteredAdmins = admins.filter((admin) => {
    const fullName = `${admin?.firstName || ""} ${admin?.lastName || ""}`.toLowerCase();
    return fullName.includes((searchQuery || "").toLowerCase());
  });

  return (
    <div className="flex h-screen">
      {/* Contact List Section */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b flex justify-between items-center cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <h2 className="text-xl font-semibold">Admins</h2>
          {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        {isDropdownOpen && (
          <>
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search admins..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-y-auto">
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <div
                    key={admin._id} // Use _id instead of id
                    className="p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors"
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setReceiverId(admin._id); // Use _id instead of id
                    }}
                  >
                    <h3 className="font-semibold text-gray-900">
                      {admin.firstName} {admin.lastName}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{admin.email}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 p-4">No admins found</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Chat Area Section */}
      <div className="flex-1 flex flex-col">
        {selectedAdmin ? (
          <>
            <ChatHeader admin={{ name: `${selectedAdmin.firstName} ${selectedAdmin.lastName}` }} />
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
          <p className="text-center text-gray-500 p-4">Select an admin to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default SuperAdminChat;