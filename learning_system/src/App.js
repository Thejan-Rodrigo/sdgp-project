import './App.css';
import AddAdminPage from './components/addAdmin/AddAdminPage';
import Home from './components/homePage/Home'
import LoginPage from './components/loginPage/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ParentChat from './components/q&a/ParentSide/ParentChat';
import TeacherChat from './components/q&a/TeacherSide/TeacherChat'
import AdminChat from './components/q&a/AdminSide/AdminChat';
import SuperAdminChat from './components/q&a/SuperAdminSide/SuperAdminChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addadmin" element={<AddAdminPage />}/>
        <Route path="/parentq&a" element={<ParentChat/>}/>
        <Route path="/Teacherq&a" element={<TeacherChat/>}/>
        <Route path="/Adminq&a" element={<AdminChat/>}/>
        <Route path="/SuperAdminq&a" element={<SuperAdminChat/>}/>
      </Routes>
    </Router>
  );
}

export default App;
