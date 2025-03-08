const MessageS = ({ message, timestamp, sender, currentUser }) => {
    const isSentByUser = sender === currentUser;
  
    return (
      <div className={`flex ${isSentByUser ? "justify-end" : "justify-start"} my-2 mb-6`}>
        <div className="flex flex-col max-w-xs">
          <div
            className={`p-3 rounded-lg ${
              isSentByUser ? "bg-blue-700 text-white" : "bg-blue-200 text-black"
            }`}
          >
            <p>{message}</p>
          </div>
          <span className={`text-xs text-gray-500 mt-1 ${isSentByUser ? "text-right" : "text-left"}`}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  };
  
  export default MessageS;
  