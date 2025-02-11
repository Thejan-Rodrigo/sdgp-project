import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your backend server URL

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => {
            socket.off("message");
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            const message = { text: input, sender: "You" };
            socket.emit("message", message);
            setMessages((prevMessages) => [...prevMessages, message]);
            setInput("");
        }
    };

    return (
        <div className="p-4 border rounded shadow-md w-96 mx-auto">
            <div className="h-64 overflow-y-auto border p-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-1 my-1 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
                        <span className="bg-gray-200 px-2 py-1 rounded">{msg.sender}: {msg.text}</span>
                    </div>
                ))}
            </div>
            <div className="mt-2 flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border p-2 flex-1 rounded-l"
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">Send</button>
            </div>
        </div>
    );
}
