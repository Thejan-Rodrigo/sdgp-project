import { React, useState, useEffect } from 'react'
import CommenNavBar from '../CommenNavbBar'
import ParentSideBar from '../ParentSideBar'
import ParentMessage from './ParentMessage'
import axios from "axios";
import Sidebar from '../TeaSidebar';

export default function ParentMeeting() {

    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/meetings"); // Adjust backend URL if needed
                setMeetings(response.data); // Update state with meetings data
            } catch (error) {
                console.error("Error fetching meetings:", error);
            }
        };

        fetchMeetings();
    }, []); // Empty dependency array ensures it runs only on page load

    const data = [
        {
            "name": "Rashmitha Himasara",
            "descrip": "This is monthly meeting"
        },
        {
            "name": "Tarini Abesinhe",
            "descrip": "Annual meeting to 'Kakulu sara'"
        },
        {
            "name": "Kalina Dissanayake",
            "descrip": "Only for G3 class"
        },
        {
            "name": "Achira Manathunga",
            "descrip": "All the Teachers"
        },
        {
            "name": "Thejani Balasuriya",
            "descrip": "Weekly meeting"
        },
        {
            "name": "Sarani Niranthara",
            "descrip": "Daruwo godagamu workshop"
        }
    ]

    return (
        <div className="side" class=" flex bg-white">
            <Sidebar />
            <div class=" p-7 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full overflow-y-scroll" style={{ height: 700 }}>

                <h2 className="text-lg font-semibold mb-4 ml-10">Upcoming Meetings</h2>

                {meetings.map((meeting, index) => (
                    <ParentMessage
                        key={meeting._id} // Use unique ID from MongoDB
                        id={meeting._id} // Pass ID to the component
                        name={meeting.name}
                        descrip={meeting.description}
                        time={meeting.time}
                        link={meeting.link}
                    />
                ))}
            </div>
        </div>
    )
}
