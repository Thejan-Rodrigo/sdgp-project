import React, { useState } from 'react';
import { MdDateRange } from "react-icons/md"; // Calendar icon
import { FaClock } from 'react-icons/fa';

export default function ParentMessage(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 100; // Adjust this limit

    const dateObj = new Date(props.time);

    // Format the date in YYYY/MM/DD (UTC)
    const utcDate = dateObj.toISOString().split("T")[0].replace(/-/g, "/");

    // Format the time in 12-hour format with AM/PM (UTC)
    const utcHours = dateObj.getUTCHours();
    const utcMinutes = dateObj.getUTCMinutes();
    const formattedUTCTime = `${(utcHours % 12 || 12).toString().padStart(2, "0")}:${utcMinutes
        .toString()
        .padStart(2, "0")} ${utcHours >= 12 ? "PM" : "AM"}`;

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col space-y-4">
                {/* Meeting Name */}
                <h1 className="text-xl font-semibold text-gray-800">{props.name}</h1>

                {/* Description with Show More/Show Less */}
                <p className="text-gray-600">
                    {isExpanded || props.descrip.length <= MAX_LENGTH
                        ? props.descrip
                        : `${props.descrip.slice(0, MAX_LENGTH)}... `}
                    {props.descrip.length > MAX_LENGTH && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-500 hover:text-blue-600 ml-1 focus:outline-none"
                        >
                            {isExpanded ? "Show Less" : "Show More"}
                        </button>
                    )}
                </p>

                {/* Date and Time */}
                <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-2">
                        <MdDateRange className="text-blue-500" /> {/* Calendar icon */}
                        <span>{utcDate}</span> {/* Formatted date */}
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaClock className="text-blue-500" /> {/* Clock icon */}
                        <span>{formattedUTCTime}</span> {/* Formatted time */}
                    </div>
                </div>

                {/* Join Button */}
                <div className="flex justify-end">
                    <button
                        onClick={() => window.open(props.link, "_blank")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors focus:outline-none"
                    >
                        Join Meeting
                    </button>
                </div>
            </div>
        </div>
    );
}