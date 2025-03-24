import React from 'react';
import { useAuth } from "../context/AuthContext";
import { FaGraduationCap, FaBullhorn, FaCalendar, FaUserCheck, FaBook, FaChartBar, FaQuestionCircle, FaHeadphones, FaUserGraduate } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const Sidebar = () => {
    const { user } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation(); // Initialize useLocation to get the current route

    const menuItems = [
        { icon: <FaBullhorn />, text: 'Announcement', path: '/studentannouncement' }, // Added path for Announcement
        { icon: <FaCalendar />, text: 'Meeting', path: '/parentmeeting' }, // Added path for Meeting
        { icon: <FaUserGraduate />, text: 'Student Profile', path: '/studentprofile' }, // Added path for Student Profile
        { icon: <FaQuestionCircle />, text: 'Q&A', path: '/parentq&a' }, // Added path for Q&A 
        { icon: <FaHeadphones />, text: 'Learing', path: '/parent' }
    ];

    // Function to handle menu item clicks
    const handleMenuItemClick = (path) => {
        if (path) {
            navigate(path); // Navigate to the specified path
        }
    };

    return (
        <div className="fixed w-64 h-screen bg-white shadow-lg overflow-y-auto">
            <div className="p-4">
                <div className="items-center gap-3 mb-8">
                    <div className="flex items-center gap-3 p-3 rounded-lg mb-2 text-blue-600 font-bold text-lg">
                        <FaGraduationCap />
                        <span>Kinderzone</span>
                    </div>

                    <div>
                        {user ? ( // Check if user exists
                            <>
                                <h3 className="font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
                                <p className="text-sm text-gray-500">{user.role}</p>
                            </>
                        ) : (
                            <h1>User not logged in</h1>
                        )}
                    </div>
                </div>
                <nav>
                    {menuItems.map((item, index) => {
                        // Check if the current route matches the item's path
                        const isActive = location.pathname === item.path;

                        return (
                            <div
                                key={index}
                                className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer ${isActive
                                    ? 'bg-blue-600 text-white' // Apply active styles
                                    : 'text-gray-700 hover:bg-gray-100' // Apply default styles
                                    }`}
                                onClick={() => handleMenuItemClick(item.path)} // Add onClick handler
                            >
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;