import React, { useEffect, useState } from "react";
import "./Lessons.css";
import TeacherSidebar from '../TeaSidebar';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);

  // Fetch students data
  useEffect(() => {
    const fetchLessons = async () => {
      try {
       //fetch api
        const response = await fetch(`http://localhost:5000/api/lessons/getall`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch lessons: ${response.status} ${response.statusText}`
          );
        }
        
        const resData = await response.json();
       // checks the response status and handle the output
        if (resData.success && resData.data.lessons) {
          setLessons(resData.data.lessons);
        } else {
          throw new Error("Invalid lessons data format");
        }
      } catch (err) {
        console.error("Error fetching lessons:", err);
       
      }
    };

    fetchLessons();
  }, []);

  //State to track expanded lessons
  const [expandedLessons, setExpandedLessons] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });

  //Toggle lesson expansion
  const toggleLesson = (id) => {
    setExpandedLessons(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="lessons-page">


      <div className="content-container">
      <TeacherSidebar/>
      
        <main className="main-content">
          <h1 className="text-2xl font-semibold">Lessons</h1><br/>
          {lessons.map((lesson) => (
            <div key={lesson._id} className="lesson-card">
              <div className="lesson-header">
                <h5><i>{lesson.grade}</i></h5>
                <h2>{lesson.title}</h2>
                
                <button
                  className="expand-btn"
                  onClick={() => toggleLesson(lesson._id)}
                >
                  {expandedLessons[lesson._id] ? "▲" : "▼"}
                </button>
              </div>
              {expandedLessons[lesson._id] && (
                <div className="lesson-content">
                  <p>{lesson.description}</p><hr style={{marginTop:'1rem', marginBottom:'1rem'}}/>
                  <h6 style={{fontWeight:600}}>Additional Resources: </h6>
                  <img 
                  style={{ width: '80px', height: 'auto', objectFit: 'cover' }}
                  src={`http://localhost:5000/api/lessons/image${lesson.image}`} alt={lesson.title}
                   className="w-full h-32 object-cover mb-4" />
                 
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Lessons;
