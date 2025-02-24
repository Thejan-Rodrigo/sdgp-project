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
        "Leading our educational initiatives with over 10 years of experience in early childhood development.",
      image: thejanImage,
      linkedin: "thejan-pandula-01a661337",
    },
    {
      name: "Kalin Dissanayake",
      age: "25",
      role: "Developer",
      description:
        "Passionate about creating engaging learning experiences through innovative teaching methods.",
      image: kalinImage,
      linkedin: "kalindissanayake",
    },
    {
      name: "Tarini Apara",
      age: "18",
      role: "Team Leader",
      description:
        "Dedicated to designing comprehensive educational programs that inspire young minds.",
      image: tariniImage,
      linkedin: "tarini-apara-87a028294",
    },
    {
      name: "Achira Manathuga",
      age: "22",
      role: "Developer",
      description:
        "Specializing in understanding and supporting children's emotional and social development.",
      image: achiraImage,
      linkedin: "",
    },
    {
      name: "Rashmitha Perera",
      age: "23",
      role: "Developer",
      description:
        "Bringing creativity and artistic expression into our daily learning activities.",
      image: rashmithaImage,
      linkedin: "",
    },
    {
      name: "Praveena Karunanayake",
      age: "22",
      role: "UI/UX Designer",
      description:
        "Promoting healthy development through active play and structured physical activities.",
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

          {/* Optional Section for Hiring */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Join Our Team
            </h3>
            <p className="text-gray-600 mb-6">
              We're always looking for passionate educators to join our growing
              family.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
              View Open Positions
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
