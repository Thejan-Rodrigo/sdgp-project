import React, { useEffect, useState } from "react";
import "./Lessons.css";
import TeacherSidebar from '../TeaSidebar';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);

  // Fetch students data
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        console.log("Fetching lessons ...");
        const response = await fetch(`http://localhost:5000/api/lessons/getall`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch lessons: ${response.status} ${response.statusText}`
          );
        }

        const resData = await response.json();
        console.log("lessons data:", resData);

        if (resData.success && resData.data.lessons) {
          setLessons(resData.data.lessons);
        } else {
          throw new Error("Invalid lessons data format");
        }
      } catch (err) {
        console.error("Error fetching lessons:", err);
        // setError(`Failed to fetch lessons: ${err.message}`);
      }
    };

    fetchLessons();
  }, []);
  // //Hardcoded lessons data
  // const [lessons] = useState([
  //   {
  //     id: 1,
  //     title: '1 Class',
  //     description: 'Introduction to Mathematics - Basic concepts of mathematics including numbers, operations, and problem-solving techniques.'
  //   },
  //   {
  //     id: 2,
  //     title: '2 Class',
  //     description: 'Language Arts Fundamentals - Introduction to reading, writing, and basic grammar concepts for young learners.'
  //   },
  //   {
  //     id: 3,
  //     title: '3 Class',
  //     description: 'Science Exploration - Exploring the natural world through hands-on experiments and observations.'
  //   },
  //   {
  //     id: 4,
  //     title: '4 Class',
  //     description: 'Social Studies Basics - Learning about communities, history, and geography in an engaging way.'
  //   },
  //   {
  //     id: 5,
  //     title: '5 Class',
  //     description: 'Art and Creativity - Developing artistic skills and creative expression through various mediums.'
  //   }
  // ]);

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
      {/* <header className="lessons-header">
        <div className="logo">The Learning Tree</div>
        <nav className="main-nav">
          <a href="/" className="nav-link">
            Home
          </a>
          <div className="nav-link dropdown">
            Teacher <span>▼</span>
          </div>
        </nav>
      </header> */}

      <div className="content-container">
      <TeacherSidebar/>
        {/* <aside className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <a href="/meetings">Meetings</a>
            </li>
            <li>
              <a href="/attendance">Attendance</a>
            </li>
            <li className="active">
              <a href="/lessons">Lessons</a>
            </li>
            <li>
              <a href="/progress">Progress</a>
            </li>
            <li>
              <a href="/qa">Q n A</a>
            </li>
            <li>
              <a href="/announcement">Announcement</a>
            </li>
          </ul>
        </aside> */}
        {/* <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-semibold">Teacher Lessons</h1>
          <div className="flex items-center gap-4">
            
          </div>
        </div> */}
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
