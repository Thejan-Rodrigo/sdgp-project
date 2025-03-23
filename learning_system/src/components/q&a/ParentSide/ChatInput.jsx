import React, { useState } from "react";
import { Paperclip, Send } from "lucide-react";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    console.log("Sending message:", message);
    
    onSendMessage(message);
    setMessage(""); // Clear input after sending
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
      <div className="flex items-center gap-2">
        <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
          <Paperclip size={20} className="text-gray-600" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
