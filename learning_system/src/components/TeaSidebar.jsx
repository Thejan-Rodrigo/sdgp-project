import React from 'react';
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { FaGraduationCap, FaBullhorn, FaCalendar, FaUserCheck, FaBook, FaChartBar, FaQuestionCircle, FaHeadphones } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { user, logout } = useAuth(); // Get user and logout function
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <FaBullhorn />, text: 'Announcement', path: '/teacherannouncement' },
    { icon: <FaCalendar />, text: 'Meeting', path: '/teachermeeting' },
    { icon: <FaUserCheck />, text: 'Attendance', path: '/attendance' },
    { icon: <FaUserCheck />, text: 'Student Profile', path: '/teacherSProfile' },
    { icon: <FaBook />, text: 'Lessons', path: '/lessons' },
    { icon: <FaChartBar />, text: 'Progress', path: '/progress' },
    { icon: <FaQuestionCircle />, text: 'Q&A', path: '/Teacherq&a' },
    { icon: <FaHeadphones />, text: 'Learing', path: '/teacher' },
  ];

  const handleMenuItemClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="fixed w-64 h-screen bg-white shadow-lg overflow-y-auto flex flex-col">
      <div className="p-4 flex-grow">
        <div className="items-center gap-3 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-lg mb-2 text-blue-600 font-bold text-lg">
            <FaGraduationCap />
            <span>EduTeach</span>
          </div>

          {/* Updated to use actual user data */}
          {user ? (
            <>
              <h3 className="font-semibold ml-2">{`${user.firstName} ${user.lastName}`}</h3>
              <p className="text-sm text-gray-500 ml-2">{user.role}</p>
            </>
          ) : (
            <>
              <h3 className="font-semibold ml-2">Sarah Wilson</h3>
              <p className="text-sm text-gray-500 ml-2">Teacher</p>
            </>
          )}
        </div>
        <nav>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleMenuItemClick(item.path)}
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Logout button at the bottom */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
        >
          <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              ></path>
            </svg>
          </div>
          <div
            className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          >
            Logout
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;