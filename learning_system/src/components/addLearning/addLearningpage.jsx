import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';
import AddLearningForm from './addLearningForm';
import axios from 'axios';

const AddLearningPage = () => {
  const { user } = useAuth();
  const [alert, setAlert] = useState(null);
  const [learningMaterials, setLearningMaterials] = useState([]);

  useEffect(() => {
    const fetchLearningMaterials = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/learning/getall');
        const data = await response.json();
        setLearningMaterials(data.data.materials); 
      } catch (error) {
        console.error('Error fetching learning materials:', error);
      }
    };

    fetchLearningMaterials();
  }, []);

  const handleLearningAdded = () => {
    setAlert({ message: 'Learning material added successfully!', type: 'success' });

    
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleDelete = async (id) => {
    try {
      
      await axios.delete(`http://localhost:5000/api/learning/${id}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`, 
        },
      });

      
      setLearningMaterials(learningMaterials.filter(material => material._id !== id));

      setAlert({ message: 'Learning material deleted successfully!', type: 'success' });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting learning material:', error);
      setAlert({ message: 'Error deleting learning material.', type: 'error' });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header />
        
        {alert && (
          <div className={`p-4 mb-4 text-white ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`}>
            {alert.message}
          </div>
        )}

        <AddLearningForm onLearningAdded={handleLearningAdded} />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">All Learning Materials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningMaterials.map((material) => (
              <div key={material._id} className="p-4 bg-white border rounded-lg shadow-sm">
                <img src={`http://localhost:5000/api/learning/image${material.image}`} alt={material.title} className="w-full h-32 object-cover mb-4" />
                <h3 className="text-lg font-semibold">{material.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{material.description}</p>
                <p className="text-sm text-gray-500">Duration: {material.duration}</p>
                
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(material._id)}
                >
                  Delete
                </button>
                
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddLearningPage;
