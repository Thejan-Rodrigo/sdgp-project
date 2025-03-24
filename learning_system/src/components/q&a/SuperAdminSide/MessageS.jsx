import { useState } from "react";

const Message = ({
  _id,
  message,
  timestamp,
  senderId,
  currentUserId,
  onDelete,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const isSentByUser = senderId === currentUserId;

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowOptions(true);
  };

  return (
    <div
      className={`relative flex ${
        isSentByUser ? "justify-end" : "justify-start"
      } my-2`}
      onContextMenu={handleRightClick}
    >
      <div
        className={`max-w-xs p-3 rounded-lg shadow-md ${
          isSentByUser
            ? "bg-blue-600 text-white rounded-tr-none"
            : "bg-gray-200 text-black rounded-tl-none"
        }`}
      >
        <p>{message}</p>
        <span className="text-xs text-gray-500 block text-right mt-1">
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Right Click Context Menu */}
      {showOptions && isSentByUser && ( // Only show delete option for messages sent by the current user
        <div className="absolute top-0 right-0 bg-white shadow-md rounded-md p-2">
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => {
              onDelete(_id);
              setShowOptions(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;