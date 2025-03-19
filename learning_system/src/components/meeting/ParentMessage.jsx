import React from 'react'
import { MdDateRange } from "react-icons/md"; // Calendar icon
import { FaClock } from 'react-icons/fa';
import { useState } from "react";

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
        <div class=" ml-8 h-auto bg-white rounded-lg mb-10 p-3" style={{ width: 800 }}>
            <div class="flex">

                <h1 class="text-black font-semibold pl-4"> {props.name}</h1>
            </div>
            <div class="pt-1 font-normal mb-5">

                <p>{isExpanded || props.descrip.length <= MAX_LENGTH
                    ? props.descrip
                    : `${props.descrip.slice(0, MAX_LENGTH)}... `}
                    {props.descrip.length > MAX_LENGTH && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-500 font-thin ml-1"
                        >
                            {isExpanded ? "Show Less" : "Show More.."}
                        </button>
                    )}</p>
            </div>
            <div className="flex justify-between items-center w-full">
                {/* Left side: Time with icon */}
                <div className="flex items-center gap-4">
                    {/* Date with icon */}
                    <div className="flex items-center gap-2">
                        <MdDateRange />  {/* Small calendar icon */}
                        <span>{utcDate}</span>  {/* YYYY/MM/DD */}
                    </div>

                    {/* Time with icon */}
                    <div className="flex items-center gap-2">
                        <FaClock />
                        <span>{formattedUTCTime}</span> {/* HH:MM AM/PM */}
                    </div>
                </div>

                {/* Right side: Buttons */}
                <div className="flex items-center gap-2">
                    <button onClick={() => window.open(props.link, "_blank")} className="text-white w-14 h-7 border-2 border-green-500 rounded-lg font-extralight bg-green-400">
                        Join
                    </button>
                </div>
            </div>

        </div>
    )
}
