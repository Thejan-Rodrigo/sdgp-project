import React from 'react'
import CommenNavBar from '../CommenNavbBar'
import ParentSideBar from '../ParentSideBar'
import ParentMessage from './ParentMessage'

export default function ParentMeeting() {

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
        <div>
            <CommenNavBar />
            <div class=" flex bg-pink-200">
                <ParentSideBar />
                <div class=" p-7 bg-yellow-100 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full mt-28 overflow-y-scroll" style={{ height: 570 }}>
                    <ParentMessage name={data.at(0).name} descrip={data.at(0).descrip} />
                    <ParentMessage name={data.at(1).name} descrip={data.at(1).descrip} />
                    <ParentMessage name={data.at(2).name} descrip={data.at(2).descrip} />
                    <ParentMessage name={data.at(3).name} descrip={data.at(3).descrip} />
                    <ParentMessage name={data.at(4).name} descrip={data.at(4).descrip} />
                    <ParentMessage name={data.at(5).name} descrip={data.at(5).descrip} />
                </div>
            </div>
        </div>
    )
}
