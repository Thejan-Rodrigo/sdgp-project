import React from 'react'
import CommenNavBar from '../CommenNavbBar'
import TeacherSideBar from '../TeacherSideBar'

export default function Test() {
    return (
        <div className="test">
            <CommenNavBar/>

            <div className="side">
                <TeacherSideBar/>
            </div>
        </div>
    )
}