import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AnnouncementForm from './AnnouncementForm';
import AnnouncementList from './AnnouncementList';

// Import the sidebar and header components based on user role
const AnnouncementDashboard = ({ 
  SidebarComponent, 
  HeaderComponent 
}) => {
  const { user } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    console.log('Announcement Dashboard - Auth Status:', {
      isLoggedIn: !!user,
      role: user?.role,
      token: user?.token ? 'Token exists' : 'No token'
    });
  }, [user]);

  // Function to refresh the announcement list after creating a new one
  const handleAnnouncementAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Only superadmin,admin and parents can create announcements
  const canCreateAnnouncements = user && 
    (user.role === 'superadmin' || user.role === 'admin' || user.role === 'teacher');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarComponent />
      <div className="flex-1">
        <HeaderComponent />
        <div className="p-6">
          {canCreateAnnouncements && (
            <AnnouncementForm onAnnouncementAdded={handleAnnouncementAdded} />
          )}
          <AnnouncementList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDashboard;