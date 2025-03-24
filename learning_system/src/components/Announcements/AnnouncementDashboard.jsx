import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AnnouncementForm from './AnnouncementForm';
import AnnouncementList from './AnnouncementList';

// Loading Animation Component
const LoadingAnimation = () => (
  <div className="flex-col gap-4 w-full flex items-center justify-center">
    <div
      className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
    >
      <div
        className="w-16 h-16 border-4 border-transparent text-blue-400 text-2xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
      ></div>
    </div>
  </div>
);

const AnnouncementDashboard = ({ 
  SidebarComponent, // Sidebar component passed as a prop
  HeaderComponent // Header component passed as a prop
}) => {
  const { user } = useAuth(); // Access user data from authentication context
  const [refreshTrigger, setRefreshTrigger] = useState(0); // State to trigger data refresh
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Effect to log authentication status and simulate loading completion
  useEffect(() => {
    console.log('Announcement Dashboard - Auth Status:', {
      isLoggedIn: !!user, // Check if user is logged in
      role: user?.role, // Log user role
      token: user?.token ? 'Token exists' : 'No token' // Log token status
    });
    setLoading(false); // Simulate loading completion (e.g., after fetching data)
  }, [user]);

  // Function to refresh the announcement list after creating a new one
  const handleAnnouncementAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Only superadmin, admin, and teachers can create announcements
  const canCreateAnnouncements = user && 
    (user.role === 'superadmin' || user.role === 'admin' || user.role === 'teacher');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed h-screen w-64">
        <SidebarComponent />
      </div>

      {/* Main Content with Left Margin */}
      <div className="flex-1 ml-64">
        <HeaderComponent />
        <div className="p-6">
          {loading ? (
            <LoadingAnimation /> // Use the loading animation
          ) : (
            <>
              {canCreateAnnouncements && (
                <AnnouncementForm onAnnouncementAdded={handleAnnouncementAdded} />
              )}
              <AnnouncementList refreshTrigger={refreshTrigger} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDashboard;