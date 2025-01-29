import React from 'react'

export default function TeacherMassage() {
    return (
        <div class=" m-auto h-32 bg-white rounded-lg mb-10 p-3" style={{ width: 800 }}>
            <div class="flex">
                <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                </button>
                <h1 class="text-black font-semibold pl-4"> Sarani Anuththara</h1>
            </div>
            <div class = "pt-1 font-normal">
                <p>Monthly meeting for the level 1 class. Conducting by class teacher. Please join on time.</p>
            </div>
            <div >
            
                <button class=" text-white float-right w-10 h-7 border-2 border-green-500 rounded-lg font-extralight bg-green-400">
                    Join 
                </button>
                <button class=" text-white float-right w-16 h-7 border-2 border-red-400 rounded-lg font-extralight bg-red-500 mr-4">
                    Remove  
                </button>
            </div>
            
        </div>
    )
}
