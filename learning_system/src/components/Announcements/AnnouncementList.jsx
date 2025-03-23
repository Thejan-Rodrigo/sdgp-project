import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 
import AnnouncementCard from './AnnouncementCard'; 
import EditAnnouncementModal from './EditAnnouncementModal'; 

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

const AnnouncementList = ({ refreshTrigger }) => {
  const { user } = useAuth(); // Access user data (e.g., token, role, schoolId)
  const [announcements, setAnnouncements] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [editingAnnouncement, setEditingAnnouncement] = useState(null); 
  const [showEditModal, setShowEditModal] = useState(false); 

  useEffect(() => {
    const fetchAnnouncements = async () => {
      if (!user?.token) return; // Exit if no user token is available

      setLoading(true); 
      try {
        // Set up query parameters based on user role and schoolId
        const params = {
          page: 1,
          limit: 10,
          status: 'published',
          role: user.role, // Pass user role to filter announcements
          schoolId: user.schoolId, // Pass schoolId for role-specific filtering
        };

        console.log('Fetching announcements with token:', user.token ? 'Has token' : 'No token');
        const response = await axios.get(
          'http://localhost:5000/api/v1/announcements',
          {
            headers: {
              'Authorization': `Bearer ${user.token}` // Attach token for authentication
            },
            params // Pass query parameters
          }
        );

        console.log('API Response:', response.data);

        // Handle different API response formats
        let fetchedAnnouncements = [];
        if (response.data.data?.announcements) {
          fetchedAnnouncements = response.data.data.announcements;
        } else if (response.data.data) {
          fetchedAnnouncements = response.data.data;
        } else if (response.data.announcements) {
          fetchedAnnouncements = response.data.announcements;
        } else if (Array.isArray(response.data)) {
          fetchedAnnouncements = response.data;
        }

        // Ensure each announcement has an `_id` property
        fetchedAnnouncements = fetchedAnnouncements.map(announcement => {
          if (!announcement._id && announcement.id) {
            return { ...announcement, _id: announcement.id }; // Map `id` to `_id` if necessary
          }
          return announcement;
        });

        // Filter announcements based on user role and target audience
        let filteredAnnouncements = fetchedAnnouncements;
        if (user.role !== 'superadmin') {
          filteredAnnouncements = fetchedAnnouncements.filter(announcement => {
            // Teachers can see their own announcements regardless of target audience
            if (user.role === 'teacher' && announcement.authorId?._id === user.id) {
              return true;
            }

            // If no target audience is specified, show to all users
            if (!announcement.targetAudience || announcement.targetAudience.length === 0) {
              return true;
            }

            // Convert target audience to array for consistent handling
            const targetAudiences = Array.isArray(announcement.targetAudience)
              ? announcement.targetAudience
              : [announcement.targetAudience];

            // Hide superadmin-only announcements from other roles
            if (targetAudiences.includes('superadmin') && targetAudiences.length === 1 && user.role !== 'superadmin') {
              return false;
            }

            // Role-specific filtering logic
            if (user.role === 'student' && targetAudiences.includes('students') || targetAudiences.includes('all')) {
              return true;
            }

            if (user.role === 'parent' && targetAudiences.includes('parents') || targetAudiences.includes('all')) {
              return true;
            }

            if (user.role === 'teacher' && targetAudiences.includes('teachers') || targetAudiences.includes('all')) {
              return true;
            }

            if (user.role === 'admin' && targetAudiences.includes('admins') || targetAudiences.includes('all')) {
              return true;
            }

            // Admins can see all announcements except superadmin-only ones
            if (user.role === 'admin') {
              return !targetAudiences.includes('superadmin') || targetAudiences.length > 1;
            }

            return false;
          });
        }

        setAnnouncements(filteredAnnouncements); // Update state with filtered announcements
        setError(''); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchAnnouncements(); // Fetch announcements when component mounts or dependencies change
  }, [user, refreshTrigger, user?.token]); // Re-fetch when user, refreshTrigger, or token changes

  const handleEdit = (id) => {
    const announcementToEdit = announcements.find(a => a._id === id); // Find the announcement to edit
    if (announcementToEdit) {
      setEditingAnnouncement(announcementToEdit); // Set the announcement to edit
      setShowEditModal(true); // Show the edit modal
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false); // Hide the edit modal
    setEditingAnnouncement(null); // Clear the editing announcement
  };

  const handleAnnouncementUpdate = async (updatedAnnouncement) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/announcements/${updatedAnnouncement._id}`,
        {
          title: updatedAnnouncement.title,
          content: updatedAnnouncement.content,
          targetAudience: updatedAnnouncement.targetAudience,
          status: updatedAnnouncement.status || 'published' // Default status if not provided
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}` // Attach token for authentication
          }
        }
      );

      console.log('Announcement updated:', response.data);

      // Update the announcement in the local state
      setAnnouncements(announcements.map(a => 
        a._id === updatedAnnouncement._id ? 
          {...a, ...updatedAnnouncement} : a // Replace the old announcement with the updated one
      ));

      setShowEditModal(false); // Hide the edit modal
      setEditingAnnouncement(null); // Clear the editing announcement
    } catch (err) {
      console.error('Error updating announcement:', err);
      setError('Failed to update announcement. Please try again.'); // Set error message
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm('Are you sure you want to delete this announcement?')) {
        return;
      }

      await axios.delete(`http://localhost:5000/api/v1/announcements/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}` // Attach token for authentication
        }
      });

      // Remove the deleted announcement from the local state
      setAnnouncements(announcements.filter(a => a._id !== id));
    } catch (err) {
      console.error('Error deleting announcement:', err);
      if (err.response?.data?.message === 'Invalid announcement ID format') {
        setError('Cannot delete: Invalid announcement ID format. The ID might not be compatible with MongoDB.');
      } else {
        setError('Failed to delete announcement. Please try again.');
      }
    }
  };

  // Mark announcements as read when viewed by students or parents
  useEffect(() => {
    const markAnnouncementsAsRead = async () => {
      if (!user?.token || announcements.length === 0) return;

      if (user.role === 'student' || user.role === 'parent') {
        try {
          for (const announcement of announcements) {
            await axios.post(
              `http://localhost:5000/api/v1/announcements/${announcement._id}/read`,
              {},
              {
                headers: {
                  'Authorization': `Bearer ${user.token}` // Attach token for authentication
                }
              }
            );
          }
        } catch (err) {
          console.error('Error marking announcements as read:', err);
        }
      }
    };

    markAnnouncementsAsRead(); // Mark announcements as read when the component mounts or announcements change
  }, [announcements, user]);

  if (loading) {
    return <div className="mt-6 text-center">Loading announcements...</div>; // Show loading message
  }

  if (error) {
    return <div className="mt-6 text-red-500 text-center">{error}</div>; // Show error message
  }

  if (announcements.length === 0) {
    return <div className="mt-6 text-center">No announcements found.</div>; // Show message if no announcements
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Announcements</h2>
      {announcements.map((announcement) => (
        <AnnouncementCard 
          key={announcement._id}
          id={announcement._id}
          title={announcement.title}
          content={announcement.content}
          timeAgo={new Date(announcement.createdAt).toLocaleDateString()} // Format creation date
          views={announcement.readCount || 0} // Display read count (default to 0 if not available)
          targetAudience={announcement.targetAudience?.join(', ') || 'All'} // Format target audience
          postedBy={announcement.authorId ? 
                   `${announcement.authorId.firstName || ''} ${announcement.authorId.lastName || ''}` : 
                   'System'} // Display author name or 'System'
          userRole={user.role}
          // Only allow editing/deleting for superadmin, admin, or if the teacher is the author
          canEdit={user.role === 'superadmin' || user.role === 'admin' || 
                  (user.role === 'teacher' && announcement.authorId?._id === user.id)}
          onEdit={() => handleEdit(announcement._id)} // Handle edit action
          onDelete={() => handleDelete(announcement._id)} // Handle delete action
        />
      ))}

      {/* Edit Announcement Modal */}
      {showEditModal && editingAnnouncement && (
        <EditAnnouncementModal
          announcement={editingAnnouncement} // Pass the announcement being edited
          onClose={handleEditModalClose} // Handle modal close
          onUpdate={handleAnnouncementUpdate} // Handle announcement update
        />
      )}
    </div>
  );
};

export default AnnouncementList;