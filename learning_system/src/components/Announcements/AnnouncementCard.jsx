import React, { useState, useRef, useEffect } from "react";
import { FaClock, FaEye, FaEllipsisV } from "react-icons/fa";

const AnnouncementCard = ({ 
  id, 
  title, 
  content, 
  timeAgo, 
  views, 
  targetAudience,
  postedBy, 
  userRole,
  canEdit,
  onEdit, 
  onDelete 
}) => {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage dropdown menu visibility
  const menuRef = useRef(null); // Ref to track the dropdown menu for click-outside detection

  // Toggle dropdown menu visibility
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Effect to close the dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Close menu if click is outside the dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // Attach event listener
    return () => document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener on unmount
  }, []);

  // Dynamically determine the audience label based on user role and target audience
  const getAudienceLabel = () => {
    if (userRole === 'student' || userRole === 'parent') {
      return targetAudience.includes('all') ? 'All Classes' : 'Your Class'; // For students/parents
    } else if (userRole === 'teacher') {
      return 'Teacher'; // For teachers
    } else if (userRole === 'admin') {
      return targetAudience.includes('all') ? 'All Branches' : 'This Branch'; // For admins
    } else {
      return 'System Announcement'; // Default label
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4 relative">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            {/* Dropdown menu for edit/delete actions - only visible if user has edit permissions */}
            {canEdit && (
              <div className="relative" ref={menuRef}>
                <button onClick={toggleMenu} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                  <FaEllipsisV /> {/* Three-dot icon */}
                </button>

                {/* Dropdown menu content */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md z-10">
                    <button
                      onClick={onEdit}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit 
                    </button>
                    <button
                      onClick={onDelete}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete 
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Audience label with dynamic styling */}
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mt-2">
            {getAudienceLabel()} {/* Display formatted audience label */}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-400" />
            <span>{timeAgo}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEye className="text-gray-400" />
            <span>{views} views</span>
          </div>
        </div>
        <div>
          Posted by: {postedBy}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;