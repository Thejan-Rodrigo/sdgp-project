import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const StudentAttendanceCalendar = ({ schoolId, studentId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/students/attendance/${schoolId}`);
        const { data } = await response.json();
        
        // Process data to create calendar events for the specific student
        const attendanceEvents = data.flatMap(dayRecord => {
          // Skip weekends (0 = Sunday, 6 = Saturday)
          const dayOfWeek = moment(dayRecord.date).day();
          if (dayOfWeek === 0 || dayOfWeek === 6) return [];
          
          // Find the specific student's attendance record
          const studentAttendance = dayRecord.students.find(s => s.id === studentId);
          if (!studentAttendance) return [];
          
          return {
            title: studentAttendance.present ? 'Present' : 'Absent',
            start: new Date(dayRecord.date),
            end: new Date(dayRecord.date),
            allDay: true,
            present: studentAttendance.present,
          };
        });
        
        setEvents(attendanceEvents);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [schoolId, studentId]);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.present ? '#4CAF50' : '#F44336';
    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  const dayPropGetter = (date) => {
    // Skip styling for weekends
    const day = date.getDay();
    if (day === 0 || day === 6) {
      return {
        className: 'weekend-day',
        style: {
          backgroundColor: '#f5f5f5',
          cursor: 'not-allowed',
        },
      };
    }
    return {};
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Student Attendance Calendar
        </h2>
        
        <div className="h-[500px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={['month']}
            eventPropGetter={eventStyleGetter}
            dayPropGetter={dayPropGetter}
            components={{
              event: ({ event }) => (
                <div className="text-center p-1">
                  <span className="text-xs font-medium">{event.title}</span>
                </div>
              ),
            }}
          />
        </div>
        
        <div className="flex justify-center mt-6 space-x-6">
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-green-500 rounded mr-2"></span>
            <span className="text-sm">Present</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-red-500 rounded mr-2"></span>
            <span className="text-sm">Absent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceCalendar;