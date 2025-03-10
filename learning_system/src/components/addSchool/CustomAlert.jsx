import React, { useEffect, useState } from 'react';

const CustomAlert = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  // Automatically hide the alert after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Call the onClose function to remove the alert from the parent component
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [onClose]);

  if (!visible) return null;

  // Determine the alert style based on the type
  const alertStyles = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  return (
    <div
      className={`fixed top-4 right-4 border-l-4 p-4 rounded-lg shadow-md ${alertStyles[type]}`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="font-medium">{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="ml-4 p-1 hover:bg-opacity-25 rounded-full focus:outline-none"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;