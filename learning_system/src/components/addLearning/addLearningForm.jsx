import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AddLearningForm = ({ onLearningAdded }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState(null);
  const [audience, setAudience] = useState('teacher'); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected image:", file);
      setImage(file);
    } else {
      console.error("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
  
    try {
      if (!title || !description || !duration || !image) {
        setError('All fields are required');
        setIsSubmitting(false);
        return;
      }
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('duration', duration);
      formData.append('image', image);
      formData.append('audience', audience); 
  
      const response = await axios.post(
        'http://localhost:5000/api/learning/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user?.token}`
          }
        }
      );
  
      console.log('Learning material added:', response.data);
      setTitle('');
      setDescription('');
      setDuration('');
      setImage(null);
  
      if (onLearningAdded) {
        onLearningAdded();
      }
    } catch (error) {
      console.error('Error adding learning material:', error);
  
      
      const errorMessage = error.response?.data?.message || 'Failed to add learning material';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h2 className="text-xl font-semibold mb-4">New Learning Material</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Duration"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Audience</label>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                value="teacher"
                checked={audience === 'teacher'}
                onChange={() => setAudience('teacher')}
                className="mr-2"
              />
              Teacher
            </label>
            <label>
              <input
                type="radio"
                value="parent"
                checked={audience === 'parent'}
                onChange={() => setAudience('parent')}
                className="mr-2"
              />
              Parent
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Learning Material'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLearningForm;
