
import './App.css';
import Home from './components/homePage/Home'
import MeetingForm from './components/meeting/MeetingForm';
import ParentMeeting from './components/meeting/ParentMeeting';
import TeacherMeeting from './components/meeting/TeacherMeeting';
import Test from './components/test/Test';




function App() {
  return (
    <div className="App">
      <ParentMeeting/>
    </div>
  );
}

export default App;
