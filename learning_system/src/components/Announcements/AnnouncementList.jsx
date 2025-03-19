import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AnnouncementCard from './AnnouncementCard';
import EditAnnouncementModal from './EditAnnouncementModal';

const AnnouncementList = ({ refreshTrigger }) => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      if (!user?.token) return;
      
      setLoading(true);
      try {
        // Set up parameters based on user role
        const params = {
          page: 1,
          limit: 10,
          status: 'published'
        };

        // For student, only get announcements targeted to them
        if (user.role === 'student' || user.role === 'parent') {
          params.targetAudience = 'parents';
        }

        console.log('Fetching announcements with token:', user.token ? 'Has token' : 'No token');
        const response = await axios.get(
          'http://localhost:5000/api/v1/announcements',
          {
            headers: {
              'Authorization': `Bearer ${user.token}`
            },
            params
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

        // Make sure we have the _id property for each announcement
        fetchedAnnouncements = fetchedAnnouncements.map(announcement => {
          // If the announcement has no _id but has id, use id as _id
          if (!announcement._id && announcement.id) {
            return { ...announcement, _id: announcement.id };
          }
          return announcement;
        });
        // Apply additional filtering based on user role if needed
        let filteredAnnouncements = fetchedAnnouncements;
        
        // Superadmin can see all announcements, no filtering needed
        if (user.role !== 'superadmin') {
          filteredAnnouncements = fetchedAnnouncements.filter(announcement => {
            // If no target audience is specified, show to all users
            if (!announcement.targetAudience || 
                (Array.isArray(announcement.targetAudience) && announcement.targetAudience.length === 0)) {
              return true;
            }
            
            // Convert target audience to array for consistent handling
            const targetAudiences = Array.isArray(announcement.targetAudience) 
              ? announcement.targetAudience 
              : [announcement.targetAudience];
              
            // Check if announcement is targeted specifically for superadmin only
            if (targetAudiences.includes('superadmin') && 
                targetAudiences.length === 1 && 
                user.role !== 'superadmin') {
              return false; // Don't show superadmin-only announcements to other roles
            }
            
            // Role-specific filtering
            if (user.role === 'student' && targetAudiences.includes('students') || targetAudiences.includes('all')) {
              return true;
            }
            
            if (user.role === 'parent' && targetAudiences.includes('parents') || targetAudiences.includes('all')) {
              return true;
            }
            
            if (user.role === 'teacher' && targetAudiences.includes('teachers') || targetAudiences.includes('parents') || targetAudiences.includes('all')) {
              return true;
            }
            
            if (user.role === 'admin' && targetAudiences.includes('admins') || targetAudiences.includes('all')) {
              return true;
            }

            
            // Admin can see all announcements except superadmin-only ones
            if (user.role === 'admin') {
              return !targetAudiences.includes('superadmin') || targetAudiences.length > 1;
            }
            
            return false;
          });
        }
        
        setAnnouncements(filteredAnnouncements);
        setError('');
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [user, refreshTrigger]);

  const handleEdit = (id) => {
    const announcementToEdit = announcements.find(a => a._id === id);
    if (announcementToEdit) {
      setEditingAnnouncement(announcementToEdit);
      setShowEditModal(true);
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditingAnnouncement(null);
  };

  const handleAnnouncementUpdate = async (updatedAnnouncement) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/announcements/${updatedAnnouncement._id}`,
        {
          title: updatedAnnouncement.title,
          content: updatedAnnouncement.content,
          targetAudience: updatedAnnouncement.targetAudience,
          status: updatedAnnouncement.status || 'published'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        }
      );

      console.log('Announcement updated:', response.data);
      
      // Update the announcement in the local state
      setAnnouncements(announcements.map(a => 
        a._id === updatedAnnouncement._id ? 
          {...a, ...updatedAnnouncement} : a
      ));
      
      setShowEditModal(false);
      setEditingAnnouncement(null);
    } catch (err) {
      console.error('Error updating announcement:', err);
      setError('Failed to update announcement. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      // Confirm before deleting
      if (!window.confirm('Are you sure you want to delete this announcement?')) {
        return;
      }

      console.log('Deleting announcement with ID:', id);
      await axios.delete(`http://localhost:5000/api/v1/announcements/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      // Remove from state
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

  // Mark announcement as read when viewed
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
                  'Authorization': `Bearer ${user.token}`
                }
              }
            );
          }
        } catch (err) {
          console.error('Error marking announcements as read:', err);
        }
      }
    };
    
    markAnnouncementsAsRead();
  }, [announcements, user]);

  if (loading) {
    return <div className="mt-6 text-center">Loading announcements...</div>;
  }

  if (error) {
    return <div className="mt-6 text-red-500 text-center">{error}</div>;
  }

  if (announcements.length === 0) {
    return <div className="mt-6 text-center">No announcements found.</div>;
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
          timeAgo={new Date(announcement.createdAt).toLocaleDateString()}
          views={announcement.readCount || 0}
          targetAudience={announcement.targetAudience?.join(', ') || 'All'}
          postedBy={announcement.authorId ? 
                   `${announcement.authorId.firstName || ''} ${announcement.authorId.lastName || ''}` : 
                   'System'}
          userRole={user.role}
          // Only allow editing/deleting if superadmin, admin, or if teacher is the author
          canEdit={user.role === 'superadmin' || user.role === 'admin' || 
                  (user.role === 'teacher' && announcement.authorId?._id === user.id)}
          onEdit={() => handleEdit(announcement._id)}
          onDelete={() => handleDelete(announcement._id)}
        />
      ))}

      {/* Edit Announcement Modal */}
      {showEditModal && editingAnnouncement && (
        <EditAnnouncementModal
          announcement={editingAnnouncement}
          onClose={handleEditModalClose}
          onUpdate={handleAnnouncementUpdate}
        />
      )}
    </div>
  );
};

export default AnnouncementList;