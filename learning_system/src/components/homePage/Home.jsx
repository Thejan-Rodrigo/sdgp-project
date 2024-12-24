import React from 'react'
import HomeNavBar from './HomeNavBar'

import TopicAndDescription from './TopicAndDescription'
import Footer from './Footer'
import Photo1 from '../../assets/Photo1.png'
import Photo2 from '../../assets/Photo2.png'
import Photo3 from '../../assets/Photo3.png'

export default function home() {
    return (
        <div class="bg-pink-300">
            <HomeNavBar />

            <section class="bg-pink-300 dark:bg-gray-900 py-40 px-80 bg-[url('assets/homePagePhoto.jpg')] bg-no-repeat bg-contain ">
                <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 ">
                    <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">KinderZone</h1>
                    <p class="mb-8 font-normal text-black lg:text-4xl sm:px-16 lg:px-48 dark:text-gray-400">Good childerns leads to a better country</p>
                    <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            Get started
                            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                        <a href="#" class="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Learn more
                        </a>
                    </div>
                </div>
            </section>

            <div class="grid grid-cols-2 gap-4 content-start">
                <div class="mt-10">
                    <img src={Photo1} alt="hello1" class=" h-96 ml-40 rounded-lg"/>
                </div>
                <div class="mt-10">
                    <TopicAndDescription topic="What is kindergarten?">
                        <span class=" font-medium">Kindergarten is an educational division that is designed to accommodate children under the age of six. It is an addition to elementary school. After children enter primary school at the age of five or six, kindergarten instruction is completed.</span>
                    </TopicAndDescription>
                </div>
                <div class="mt-10">
                    <TopicAndDescription topic="Why Kindergarten Education is Important?">
                        <span class=" font-medium">It has aided in enhancing kids' social and emotional abilities. Grow the brains of children, students' confidence and language proficiency can both be enhanced by it. For young children, kindergarten instruction must be crucial. </span>
                    </TopicAndDescription>
                </div>
                <div class="mt-10">
                    <img src={Photo2} alt="hello2" class=" h-96 ml-20 rounded-lg" />
                </div>
                <div class="mt-10">
                    <img src={Photo3} alt="hello3" class=" h-96 ml-20 rounded-lg" />
                </div>
                <div class="mt-10">
                    <TopicAndDescription topic="Teaching methods ">
                        <span class=" font-medium">Kindergarten teaching methods are crucial because they lay the foundation for a child's future learning by providing a nurturing environment that fosters early development in key areas like social skills, communication, creativity, and basic academic concepts, setting the stage for a lifelong love of learning while addressing their unique developmental needs at this critical stage.</span>
                    </TopicAndDescription>
                </div>
            </div>

            <Footer></Footer>

        </div>
    )
}