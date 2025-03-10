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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format the audience tag label based on role
  const getAudienceLabel = () => {
    if (userRole === 'student' || userRole === 'parent') {
      return targetAudience.includes('all') ? 'All Classes' : 'Your Class';
    } else if (userRole === 'teacher') {
      return 'Teacher';
    } else if (userRole === 'admin') {
      return targetAudience.includes('all') ? 'All Branches' : 'This Branch';
    } else {
      return 'System Announcement';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4 relative">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            {/* Three-dot menu button - only show if user can modify */}
            {canEdit && (
              <div className="relative" ref={menuRef}>
                <button onClick={toggleMenu} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                  <FaEllipsisV />
                </button>

                {/* Dropdown menu */}
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
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mt-2">
            {getAudienceLabel()}
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