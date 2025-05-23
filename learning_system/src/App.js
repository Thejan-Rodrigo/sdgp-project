import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Progress from "./components/progress/progress";
import AddAdminPage from './components/addAdmin/AddAdminPage';
import AddSchoolPage from './components/addSchool/AddSchoolPage';
import SuperAdminDashboard from './components/Announcements/SuperAdminDashboard';
import TeacherDashboard from './components/Announcements/TeacherDashboard';
import StudentDashboard from './components/Announcements/StudentDashboard';
import AdminDashboard from './components/Announcements/AdminDashboard';
import Home from './components/homePage/Home';
import AboutUs from './components/homePage/AboutUs';
import LoginPage from './components/loginPage/LoginPage';
import RegistrationPage from './components/registering/RegistrationPage';
import TeacherMassage from './components/meeting/TeacherMassage';
import TeacherMeeting from './components/meeting/TeacherMeeting';
import ParentMeeting from './components/meeting/ParentMeeting';
import { useAuth } from './context/AuthContext'; // Import useAuth
import StudentProfile from './components/studentProfilePage/studentProfilePage';
import TeacherSProfile from './components/studentProfilePage/teacherSProfile';
import AdminSProfile from "./components/studentProfilePage/adminSProfile";
import TeacherPage from "./components/learning/teacher/TeacherPage";
import ParentPage from "./components/learning/parent/ParentPage";
import AddLearningPage from "./components/learning/addLearning/addLearningpage";
//import AddLearningPage from "./components/addLearning/addLearningpage";
import Lessons from './components/lessons/Lessons';
import AddLesson from  './components/addLesson/AddLesson';
import Attendance from './components/attendence/Attendance';
import ParentChat from './components/q&a/ParentSide/ParentChat';
import TeacherChat from './components/q&a/TeacherSide/TeacherChat'
import AdminChat from './components/q&a/AdminSide/AdminChat';
import SuperAdminChat from './components/q&a/SuperAdminSide/SuperAdminChat';

// ProtectedRoute component
const ProtectedRoute = ({ allowedRoles, element }) => {
  const { user } = useAuth(); // Get the user from AuthContext

  // If the user is not logged in or their role is not allowed, redirect to home
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // If the user has the required role, render the element
  return element;
};


const App = () => {
  

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/progress" element={<Progress/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>

        {/* Role-protected routes */}
        <Route
          path="/addadmin"
          element={
            <ProtectedRoute
              allowedRoles={['superadmin']}
              element={<AddAdminPage />}
            />
          }
        />
        <Route
          path="/addSchool"
          element={
            <ProtectedRoute
              allowedRoles={['superadmin']}
              element={<AddSchoolPage />}
            />
          }
        />
        <Route
          path="/addlesson"
          element={
            <ProtectedRoute
              allowedRoles={['superadmin']}
              element={<AddLesson />}
            />
          }
        />
        <Route
          path="/registering"
          element={
            <ProtectedRoute
              allowedRoles={['admin']}
              element={<RegistrationPage />}
            />
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute
              allowedRoles={['teacher']}
              element={<Progress />}
            />
          }
        />
        <Route
          path="/teachermeeting"
          element={
            <ProtectedRoute
              allowedRoles={['teacher']}
              element={<TeacherMeeting />}
            />
          }
        />
        <Route
          path="/parentmeeting"
          element={
            <ProtectedRoute
              allowedRoles={['parent']}
              element={<ParentMeeting />}
            />
          }
        />
        <Route
          path="/superadminannouncement"
          element={
            <ProtectedRoute
              allowedRoles={['superadmin']}
              element={<SuperAdminDashboard />}
            />
          }
        />

        <Route
          path="/adminannouncement"
          element={
            <ProtectedRoute
              allowedRoles={['admin']}
              element={<AdminDashboard />}
            />
          }
        />

        <Route
          path="/teacherannouncement"
          element={
            <ProtectedRoute
              allowedRoles={['teacher']}
              element={<TeacherDashboard />}
            />
          }
        />

        <Route
          path="/studentannouncement"
          element={
            <ProtectedRoute
              allowedRoles={['parent']}
              element={<StudentDashboard />}
            />
          }
        />

        <Route
          path="/lessons"
          element={
            <ProtectedRoute
              allowedRoles={['teacher']}
              element={<Lessons />}
            />
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute
              allowedRoles={['teacher']}
              element={<Attendance />}
            />
          }
        />

        <Route
          path="/addLearningPage"
          element={
            <ProtectedRoute
              allowedRoles={['superadmin']}
              element={<AddLearningPage />}
            />
          }
        />

        <Route
          path="/parentq&a"
          element={
            <ProtectedRoute
              allowedRoles={['parent']}
              element={<ParentChat />}
            />
          }
        />

        <Route
          path="/Teacherq&a"
          element={
            <ProtectedRoute
              allowedRoles={['teacher']}
              element={<TeacherChat />}
            />
          }
        />

        <Route
          path="/Adminq&a"
          element={
            <ProtectedRoute
              allowedRoles={['admin']}
              element={<AdminChat />}
            />
          }
        />

        <Route
          path="/SuperAdminq&a"
          element={
            <ProtectedRoute
              allowedRoles={['superadmin']}
              element={<SuperAdminChat />}
            />
          }
        />

        <Route
          path="/studentprofile"
          element={
            <ProtectedRoute
              allowedRoles={['parent']}
              element={<StudentProfile />}
            />
          }
        />

        <Route
          path="/teacherSProfile"
          element={
            <ProtectedRoute
              allowedRoles={['teacher']}
              element={<TeacherSProfile />}
            />
          }
        />

        <Route
          path="/adminSProfile"
          element={
            <ProtectedRoute
              allowedRoles={['admin']}
              element={<AdminSProfile />}
            />
          }
        />

        <Route
          path="/parent"
          element={
            <ProtectedRoute
              allowedRoles={['parent']}
              element={<ParentPage />}
            />
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute
              allowedRoles={['teacher']}
              element={<TeacherPage />}
            />
          }
        />

        <Route
          path="/addLearningPage"
          element={
            <ProtectedRoute
              allowedRoles={['superadmin']}
              element={<AddLearningPage />}
            />
          }
        />

      </Routes>
    </Router>
  );
};

export default App;