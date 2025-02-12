
import './App.css';
import AdminDashboard from './components/Announcement/adminAnnouncement/AdminDashboard';
import StudentDashboard from './components/Announcement/studentAnnouncement/StudentDashboard';
import SuperAdminDashboard from './components/Announcement/superAdminAnnouncement/SuperAdminDashboard';
import TeacherDashboard from './components/Announcement/teacherAnnouncement/TeacherDashboard';
import Home from './components/homePage/Home'


function App() {
  // You can change this to switch between different roles
  const userRole = 'teacher'; // Options: 'teacher', 'student', 'admin', 'superadmin'

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
  };

  return (
    <>
      {renderDashboard()}
    </>
  );
}

export default App;
