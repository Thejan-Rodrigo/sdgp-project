import React, { useState, useEffect } from 'react';
import ParentSideBar from '../ParentSideBar';
import ParentMessage from './ParentMessage';
import axios from 'axios';
import Chatbot from '../chatbot/Chatbot';

export default function ParentMeeting() {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/meetings'); // Adjust backend URL if needed
                setMeetings(response.data); // Update state with meetings data
            } catch (error) {
                console.error('Error fetching meetings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeetings();
    }, []); // Empty dependency array ensures it runs only on page load

    // Loading Animation Component
    const LoadingAnimation = () => (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div
                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
            >
                <div
                    className="w-16 h-16 border-4 border-transparent text-blue-400 text-2xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                ></div>
            </div>
        </div>
    );

    return (
        <>
            <div className="flex bg-white">
                {/* Fixed Sidebar */}
                <div className="fixed h-screen w-64">
                    <ParentSideBar />
                </div>



                {/* Main Content with Left Margin */}
                <div className="flex-1 ml-64">
                    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Upcoming Meetings</h2>
                    </header>

                    <main className="p-6">
                        {loading ? (
                            <LoadingAnimation /> // Use the loading animation
                        ) : meetings.length > 0 ? (
                            <div className="space-y-4">
                                {meetings.map((meeting) => (
                                    <div
                                        key={meeting._id}
                                        className="bg-blue-50 rounded-lg p-6 shadow-sm"
                                    >
                                        <ParentMessage
                                            id={meeting._id}
                                            name={meeting.name}
                                            descrip={meeting.description}
                                            time={meeting.time}
                                            link={meeting.link}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No meetings found.</p>
                        )}
                    </main>
                </div>
            </div>
            <Chatbot />
        </>
    );
}