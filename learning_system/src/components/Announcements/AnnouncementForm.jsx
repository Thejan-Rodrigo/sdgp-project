import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AnnouncementForm = ({ onAnnouncementAdded }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate form
      if (!title || !content) {
        setError('Title and content are required');
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/v1/announcements',
        { 
          title, 
          content, 
          targetAudience: [targetAudience],
          status: 'published'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          }
        }
      );

      console.log('Announcement created:', response.data);
      
      // Clear form
      setTitle('');
      setContent('');
      setTargetAudience('all');
      
      // Notify parent component to refresh announcement list
      if (onAnnouncementAdded) {
        onAnnouncementAdded();
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      setError(error.response?.data?.message || 'Failed to create announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h2 className="text-xl font-semibold mb-4">New Announcement</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Announcement Title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Write your announcement here..."
            className="w-full p-3 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
          <select
            className="block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          >
            <option value="all">Everyone</option>
            <option value="teachers">Teachers Only</option>
            <option value="parents">Parents Only</option>
            <option value="admin">Admins Only</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Announcement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementForm;