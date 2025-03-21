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
        const params = {
          page: 1,
          limit: 10,
          status: 'published'
        };

        if (user.role === 'student' || user.role === 'parent') {
          params.targetAudience = 'parents';
        }

        const response = await axios.get(
          'http://localhost:5000/api/v1/announcements',
          {
            headers: {
              'Authorization': `Bearer ${user.token}`
            },
            params
          }
        );

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

        fetchedAnnouncements = fetchedAnnouncements.map(announcement => {
          if (!announcement._id && announcement.id) {
            return { ...announcement, _id: announcement.id };
          }
          return announcement;
        });
        
        setAnnouncements(fetchedAnnouncements);
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
      if (!window.confirm('Are you sure you want to delete this announcement?')) {
        return;
      }

      await axios.delete(`http://localhost:5000/api/v1/announcements/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
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

  if (loading) {
    return <LoadingAnimation />; // Use the loading animation
  }

  if (error) {
    return <div className="mt-6 text-red-500 text-center">{error}</div>;
  }

  if (announcements.length === 0) {
    return <div className="mt-6 text-center text-gray-500">No announcements found.</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>
      <div className="space-y-4">
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
            canEdit={user.role === 'superadmin' || user.role === 'admin' || 
                    (user.role === 'teacher' && announcement.authorId?._id === user.id)}
            onEdit={() => handleEdit(announcement._id)}
            onDelete={() => handleDelete(announcement._id)}
          />
        ))}
      </div>

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