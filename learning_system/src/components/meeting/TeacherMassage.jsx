import React from 'react'
import { MdDateRange } from "react-icons/md"; // Calendar icon
import { FaClock } from 'react-icons/fa';
import { useState } from "react";

export default function TeacherMassage(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 100; // Adjust this limit
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
                        <span>{new Date(props.time).toLocaleDateString("en-CA")}</span>  {/* YYYY/MM/DD */}
                    </div>

                    {/* Time with icon */}
                    <div className="flex items-center gap-2">
                        <FaClock />
                        <span>{new Date(props.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                </div>

                {/* Right side: Buttons */}
                <div className="flex items-center gap-2">
                    <button onClick={() => window.open(props.link, "_blank")} className="text-white w-10 h-7 border-2 border-green-500 rounded-lg font-extralight bg-green-400">
                        Join
                    </button>
                    <button onClick={() => props.onDelete(props.id)} className="text-white w-16 h-7 border-2 border-red-400 rounded-lg font-extralight bg-red-500">
                        Remove
                    </button>
                </div>
            </div>

        </div>
    )
}
