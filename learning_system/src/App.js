import './App.css';
import Home from './components/homePage/Home'
import LoginPage from './components/loginPage/LoginPage';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import Lessons from './components/Lessons';
import Attendance from './components/Attendance';

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
      <div className="user-info">
        {user ? (
          <h1>Welcome, {user.firstName}!</h1>
        ) : (
          <a href="/login" className="login-button">Login</a>
        )}
      </div>
    </Router>
  );
}

export default App;
