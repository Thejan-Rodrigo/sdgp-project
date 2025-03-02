
import './App.css';
import AdminDashboard from './components/Announcement/AdminAnnouncement/AdminDashboard.jsx';
import StudentDashboard from './components/Announcement/StudentAnnouncement/StudentDashboard.jsx';
import SuperAdminDashboard from './components/Announcement/SuperAdminAnnouncement/SuperAdminDashboard.jsx';
import TeacherDashboard from './components/Announcement/teacherAnnouncement/TeacherDashboard.jsx';
import Home from './components/homePage/Home.jsx';
import LoginPage from './components/loginPage/LoginPage.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // You can change this to switch between different roles
  /*const userRole = 'student'; // Options: 'teacher', 'student', 'admin', 'superadmin'

  const renderDashboard = () => {
    switch (userRole) {
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'superadmin':
        return <SuperAdminDashboard />;
      default:
        return <StudentDashboard />;
    }
    //{renderDashboard()}
  };*/

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/teacherannouncement" element={<TeacherDashboard/>}/>
        <Route path= "/parentannouncement" element={<StudentDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
