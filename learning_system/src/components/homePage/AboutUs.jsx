import React from "react";
import { FaLinkedin } from "react-icons/fa";
import HomeNavBar from "./HomeNavBar";
import Footer from "./Footer";

// Import images from assets
import thejanImage from "../../assets/thejanPic.jpeg";
import kalinImage from "../../assets/kalinPic.jpeg";
import tariniImage from "../../assets/tariniPic.jpeg";
import achiraImage from "../../assets/achiraPic.jpeg";
import rashmithaImage from "../../assets/rashmithaPic.jpeg";
import praveenaImage from "../../assets/praveenaPic.jpeg";

// Default placeholder image
const placeholderImage = "https://via.placeholder.com/300";

// Team Member Card Component
const TeamMember = ({ name, age, role, description, image, linkedin }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
      <img
        src={image || placeholderImage}
        alt={name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold text-blue-600 mb-1">{name}</h3>
      <p className="text-gray-600 text-sm mb-2">Age: {age}</p>
      <p className="font-semibold text-gray-800 mb-2">{role}</p>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      {linkedin && (
        <div className="flex space-x-4">
          <a
            href={`https://www.linkedin.com/in/${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            <FaLinkedin className="text-xl" />
          </a>
        </div>
      )}
    </div>
  );
};

// About Us Component
const AboutUs = () => {
  const teamMembers = [
    {
      name: "Thejan Rodrigo",
      age: "21",
      role: "Developer",
      description:
        "Full-stack developer passionate about building scalable and efficient solutions for kindergarten education.",
      image: thejanImage,
      linkedin: "thejan-pandula-01a661337",
    },
    {
      name: "Kalin Dissanayake",
      age: "25",
      role: "Developer",
      description:
        "Backend specialist ensuring seamless data management and system reliability for our platform.",
      image: kalinImage,
      linkedin: "kalindissanayake",
    },
    {
      name: "Tarini Apara",
      age: "18",
      role: "Team Leader",
      description:
        "Leading the team with a vision for revolutionizing early childhood education through technology and collaboration.",
      image: tariniImage,
      linkedin: "tarini-apara-87a028294",
    },
    {
      name: "Achira Manathunga",
      age: "22",
      role: "Developer",
      description:
        "Front-end developer focused on creating intuitive and engaging user interfaces for teachers and parents.",
      image: achiraImage,
      linkedin: "",
    },
    {
      name: "Rashmitha Weerasinhe",
      age: "23",
      role: "Developer",
      description:
        "Software engineer committed to enhancing the learning experience through innovative features and AI integration.",
      image: rashmithaImage,
      linkedin: "",
    },
    {
      name: "Praveena Rathnayake",
      age: "22",
      role: "UI/UX Designer",
      description:
        "Crafting seamless and visually appealing user experiences to make learning more interactive and accessible.",
      image: praveenaImage,
      linkedin: "",
    },
  ];


  return (
    <div>
      <HomeNavBar />
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Meet Our Amazing Team
            </h2>
            <p className="text-gray-600">
              Dedicated professionals shaping young minds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
