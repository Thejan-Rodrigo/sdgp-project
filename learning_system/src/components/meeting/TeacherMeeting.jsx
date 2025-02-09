import { React, useState } from 'react'
import CommenNavBar from '../CommenNavbBar'
import TeacherSideBar from '../TeacherSideBar'
import TeacherMassage from './TeacherMassage'
import MeetingForm from './MeetingForm';

export default function TeacherMeeting() {
    const [model, setModel] = useState(false);
    const [showGenerate, setShowGenerate] = useState(true);
    const [showAddLink, setShowAddLink] = useState(false);

    const handleGenerateClick = () => {
        setShowGenerate(true);
        setShowAddLink(false); // Hide Add Link when Generate is clicked
    };

    const handleAddLinkClick = () => {
        setShowGenerate(false); // Hide Generate when Add Link is clicked
        setShowAddLink(true);
    };
    const data = [
        {
            "name": "Nethmi Himasara",
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

    const toggel = () => {
        console.log("Hello World")
        setModel(!model)
    }

    return (
        <div className="test">
            <CommenNavBar />

            <div className="side" class=" flex bg-pink-200">
                <TeacherSideBar />
                <div class=" p-7 bg-yellow-100 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full mt-28 overflow-y-scroll" style={{ height: 570 }}>

                    <TeacherMassage name={data.at(0).name} descrip={data.at(0).descrip} />
                    <TeacherMassage name={data.at(1).name} descrip={data.at(1).descrip} />
                    <TeacherMassage name={data.at(2).name} descrip={data.at(2).descrip} />
                    <TeacherMassage name={data.at(3).name} descrip={data.at(3).descrip} />
                    <TeacherMassage name={data.at(4).name} descrip={data.at(4).descrip} />
                    <TeacherMassage name={data.at(5).name} descrip={data.at(5).descrip} />


                    <button onClick={toggel} class=" bottom-0 fixed right-0 p-4 m-20 px-3 fixd  float-start w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                        </svg>
                    </button>
                </div>
                {model && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
                        <div className="bg-white mt-32 rounded-lg h-auto w-auto mx-60 px-6 pb-4 relative">
                            {/* Top-right close button */}
                            <button
                                type="button"
                                onClick={toggel}
                                className="absolute top-2 right-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-1 text-center"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18 17.94 6M18 18 6.06 6"
                                    />
                                </svg>
                            </button>

                            {/* Button Section */}
                            <div className="flex justify-center space-x-4 mt-5">
                                <div className="text-center w-40 h-10 bg-gray-400 text-black flex rounded-lg mt-4">
                                    <button
                                        className="p-2 border-black"
                                        onClick={handleAddLinkClick}
                                    >
                                        Add a link
                                    </button>
                                </div>

                                <div className="text-center w-40 h-10 bg-gray-400 text-black flex rounded-lg mt-4">
                                    <button
                                        className="p-2"
                                        onClick={handleGenerateClick}
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>

                            {/* Conditional Rendering */}
                            {showGenerate && (
                                <div>
                                    <form>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <label
                                                htmlFor="message"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Title of the meeting
                                            </label>
                                            <textarea
                                                id="message"
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Reason for the meeting......."
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="relative max-w-sm">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>
                                            <input
                                                id="datepicker-actions"
                                                datepicker
                                                datepicker-buttons
                                                datepicker-autoselect-today
                                                type="date"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Select date"
                                                required
                                            />
                                        </div>

                                        <div className="relative z-0 w-full mb-5 group my-7">
                                            <div className="w-40">
                                                <input
                                                    type="time"
                                                    id="time"
                                                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            )}

                            {showAddLink && (
                                <div>
                                    <form>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <label
                                                htmlFor="message"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Title of the meeting
                                            </label>
                                            <textarea
                                                id="message"
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Reason for the meeting......."
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <label
                                                htmlFor="link"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Enter your link
                                            </label>
                                            <textarea
                                                id="link"
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Enter the link......."
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
