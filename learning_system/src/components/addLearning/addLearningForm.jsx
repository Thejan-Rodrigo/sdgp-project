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
  const [fileName, setFileName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected image:", file);
      setImage(file);
      setFileName(file.name);
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
      setFileName('');
  
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
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Learning Material</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter material title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            placeholder="Provide a detailed description"
            className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            id="duration"
            type="text"
            placeholder="e.g. 2 hours, 45 minutes"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600 text-center">
              {fileName ? fileName : 'Drag & drop an image or click to browse'}
            </p>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Target Audience</label>
          <div className="flex items-center space-x-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="teacher"
                checked={audience === 'teacher'}
                onChange={() => setAudience('teacher')}
                className="sr-only"
              />
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${audience === 'teacher' ? 'border-indigo-600 bg-indigo-100' : 'border-gray-300'}`}>
                {audience === 'teacher' && <span className="w-3 h-3 rounded-full bg-indigo-600"></span>}
              </span>
              <span className="text-gray-700">Teacher</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="parent"
                checked={audience === 'parent'}
                onChange={() => setAudience('parent')}
                className="sr-only"
              />
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${audience === 'parent' ? 'border-indigo-600 bg-indigo-100' : 'border-gray-300'}`}>
                {audience === 'parent' && <span className="w-3 h-3 rounded-full bg-indigo-600"></span>}
              </span>
              <span className="text-gray-700">Parent</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:bg-indigo-300 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : (
              'Add Learning Material'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLearningForm;