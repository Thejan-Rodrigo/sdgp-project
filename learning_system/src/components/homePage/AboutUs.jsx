import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import HomeNavBar from './HomeNavBar';
import Footer from './Footer';


const TeamMember = ({ name, age, role, description, image, linkedin }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold text-blue-600 mb-1">{name}</h3>
      <p className="text-gray-600 text-sm mb-2">Age: {age}</p>
      <p className="font-semibold text-gray-800 mb-2">{role}</p>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex space-x-4">
        <a
          href={linkedin.startsWith("http") ? linkedin : `https://www.linkedin.com/in/${linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          <FaLinkedin className="text-xl" />
        </a>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Thejan Rodrigo",
      age: "21",
      role: "Developer",
      description: "Leading our educational initiatives with over 10 years of experience in early childhood development.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      linkedin: "thejan-pandula-01a661337"
    },
    {
      name: "Kalin Dissanayake",
      age: "25",
      role: "Developer",
      description: "Passionate about creating engaging learning experiences through innovative teaching methods.",
      image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      linkedin: "kalindissanayake"
    },
    {
      name: "Tarini Apara",
      age: "18",
      role: "Team Leader",
      description: "Dedicated to designing comprehensive educational programs that inspire young minds.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      linkedin: "tarini-apara-87a028294"
    },
    {
      name: "Achira Manathuga",
      age: "22",
      role: "Developer",
      description: "Specializing in understanding and supporting children's emotional and social development.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      linkedin: ""
    },
    {
      name: "Rashmitha Perera",
      age: "23",
      role: "Developer",
      description: "Bringing creativity and artistic expression into our daily learning activities.",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      linkedin: ""
    },
    {
      name: "Praveena Karunanayake",
      age: "22",
      role: "UI/UX Designer",
      description: "Promoting healthy development through active play and structured physical activities.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      linkedin: ""
    }
  ];

  /*
  <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Team</h3>
          <p className="text-gray-600 mb-6">
            We're always looking for passionate educators to join our growing family.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
            View Open Positions
          </button>
        </div>
  */

  return (
    <div>
      <HomeNavBar />
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Meet Our Amazing Team</h2>
            <p className="text-gray-600">Dedicated professionals shaping young minds</p>
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