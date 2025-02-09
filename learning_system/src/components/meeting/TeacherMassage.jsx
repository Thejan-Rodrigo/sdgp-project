import React from 'react'
import { FaClock } from 'react-icons/fa';

export default function TeacherMassage(props) {
    return (
        <div class=" ml-8 h-32 bg-white rounded-lg mb-10 p-3" style={{ width: 800 }}>
            <div class="flex">
                
                <h1 class="text-black font-semibold pl-4"> {props.name}</h1>
            </div>
            <div class="pt-1 font-normal mb-5">
                <p>{props.descrip}</p>
            </div>
            <div className="flex justify-between items-center w-full">
                {/* Left side: Time with icon */}
                <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{props.time}</span>
                </div>

                {/* Right side: Buttons */}
                <div className="flex items-center gap-2">
                    <button className="text-white w-10 h-7 border-2 border-green-500 rounded-lg font-extralight bg-green-400">
                        Join
                    </button>
                    <button className="text-white w-16 h-7 border-2 border-red-400 rounded-lg font-extralight bg-red-500">
                        Remove
                    </button>
                </div>
            </div>

        </div>
    )
}
