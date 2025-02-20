import React from 'react'
import HomeNavBar from './HomeNavBar'

import TopicAndDescription from './TopicAndDescription'
import Footer from './Footer'
import Photo1 from '../../assets/Photo1.png'
import Photo2 from '../../assets/Photo2.png'
import Photo3 from '../../assets/Photo3.png'
import Hero from './Hero'
import Features from './Features'
import { useAuth } from "../../context/AuthContext";

export default function Home() {
    const { user } = useAuth();
    return (
        <div class="bg-white">
            <HomeNavBar />

            <Hero />

            <Features />

            <div class="grid grid-cols-2 gap-4 content-start">
                <div class="mt-10">
                    <img src={Photo1} alt="hello1" class=" h-96 ml-40 rounded-lg bg-gray-50" />
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
                    <img src={Photo2} alt="hello2" class=" h-96 ml-20 rounded-lg bg-gray-50" />
                </div>
                <div class="mt-10">
                    <img src={Photo3} alt="hello3" class=" h-96 ml-20 rounded-lg bg-gray-50" />
                </div>
                <div class="mt-10">
                    <TopicAndDescription topic="Teaching methods ">
                        <span class=" font-medium">Kindergarten teaching methods are crucial because they lay the foundation for a child's future learning by providing a nurturing environment that fosters early development in key areas like social skills, communication, creativity, and basic academic concepts, setting the stage for a lifelong love of learning while addressing their unique developmental needs at this critical stage.</span>
                    </TopicAndDescription>
                </div>
            </div>

            {user ? ( // ✅ Check if user exists
                <h1>Welcome, {user.firstName} ({user.role})!</h1>
            ) : (
                <h1>Loading or not logged in...</h1>
            )}

            <Footer></Footer>

        </div>
    )
}