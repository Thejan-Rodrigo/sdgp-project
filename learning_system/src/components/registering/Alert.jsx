import React from "react";

const Alert = ({ type, message, onClose }) => {
  // Determine the alert color based on the type
  const alertColors = {
    success: {
      bg: "bg-green-100",
      border: "border-green-400",
      text: "text-green-700",
      icon: "✅",
    },
    error: {
      bg: "bg-red-100",
      border: "border-red-400",
      text: "text-red-700",
      icon: "❌",
    },
  };

  const { bg, border, text, icon } = alertColors[type] || {};

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg border ${bg} ${border} ${text} shadow-lg flex items-center justify-between max-w-sm z-50`}
    >
      <div className="flex items-center">
        <span className="mr-2">{icon}</span>
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;