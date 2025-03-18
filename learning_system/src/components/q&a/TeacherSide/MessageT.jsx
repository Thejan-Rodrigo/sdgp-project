const Message = ({ message, timestamp, senderId, currentUserId }) => {
  const isSentByUser = senderId === currentUserId;

  return (
    <div className={`flex ${isSentByUser ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`max-w-xs p-3 rounded-lg shadow-md ${
          isSentByUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-gray-200 text-black rounded-tl-none"
        }`}
      >
        <p>{message}</p>
        <span className="text-xs text-gray-500 block text-right mt-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
};

export default Message;
