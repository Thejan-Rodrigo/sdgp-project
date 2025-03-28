import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HomeNavBar from './HomeNavBar';
import TopicAndDescription from './TopicAndDescription';
import Footer from './Footer';
import Photo1 from '../../assets/progress.webp';
import Photo2 from '../../assets/meeting.jpg';
import Photo3 from '../../assets/Photo3.png';
import Photo4 from '../../assets/q&a.avif';
import Hero from './Hero';
import Features from './Features';
import { useAuth } from '../../context/AuthContext';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Component to wrap elements for scroll-triggered animations
const AnimatedSection = ({ children, variants, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { user } = useAuth();
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      <HomeNavBar />
      <Hero scrollToFeatures={scrollToFeatures} />
      <Features />

      <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 content-start">
        <AnimatedSection variants={fadeInLeft} className="mt-10">
          <img
            src={Photo1}
            alt="hello1"
            className="h-96 mx-auto rounded-xl shadow-xl transform transition duration-500 hover:scale-105"
          />
        </AnimatedSection>

        <AnimatedSection variants={fadeInRight} className="mt-10">
          <TopicAndDescription topic="Real-time Progress Tracking">
            <span>
              Real-time progress tracking allows parents and teachers to monitor the academic growth and development of children in a dynamic, interactive way. This feature provides insights into each child's performance across subjects and activities, ensuring that parents and teachers are always on the same page.
            </span>
          </TopicAndDescription>
        </AnimatedSection>

        {/* Rest of your content sections... */}
        <AnimatedSection variants={fadeInLeft} className="mt-10">
          <TopicAndDescription topic="Virtual Meetings & Announcements">
            <span>
              Our virtual meeting and announcement feature enables teachers and parents to stay connected at all times. Teachers can schedule virtual meetings, and important announcements are instantly communicated to parents, ensuring timely updates and effective communication within the school community.
            </span>
          </TopicAndDescription>
        </AnimatedSection>

        <AnimatedSection variants={fadeInRight} className="mt-10">
          <img
            src={Photo2}
            alt="hello2"
            className="h-96 mx-auto rounded-xl shadow-xl transform transition duration-500 hover:scale-105"
          />
        </AnimatedSection>

        <AnimatedSection variants={fadeInLeft} className="mt-10">
          <img
            src={Photo3}
            alt="hello3"
            className="h-96 mx-auto rounded-xl shadow-xl transform transition duration-500 hover:scale-105"
          />
        </AnimatedSection>

        <AnimatedSection variants={fadeInRight} className="mt-10">
          <TopicAndDescription topic="Well-Structured Learning System">
            <span>
              Our well-structured learning system ensures that every child receives personalized and age-appropriate learning experiences. From interactive lessons to developmental activities, this system prepares children for the next level of education, fostering creativity, critical thinking, and emotional intelligence.
            </span>
          </TopicAndDescription>
        </AnimatedSection>

        <AnimatedSection variants={fadeInLeft} className="mt-10">
          <TopicAndDescription topic="Q&A Chat System">
            <span>
              The Q&A chat system improves the teacher-parent relationship by allowing real-time communication about the child's progress, challenges, and activities. Parents can ask questions, share concerns, and receive updates about their child's learning experience directly from the teacher.
            </span>
          </TopicAndDescription>
        </AnimatedSection>

        <AnimatedSection variants={fadeInRight} className="mt-10">
          <img
            src={Photo4}
            alt="hello3"
            className="h-96 mx-auto rounded-xl shadow-xl transform transition duration-500 hover:scale-105"
          />
        </AnimatedSection>
      </div>

      {user ? (
        <AnimatedSection variants={fadeInUp} className="text-center mt-10">
          <h1>Welcome, {user.firstName} ({user.role})!</h1>
        </AnimatedSection>
      ) : (
        <AnimatedSection variants={fadeInUp} className="text-center mt-10">
          <h1>Loading or not logged in...</h1>
        </AnimatedSection>
      )}

      <Footer />
    </div>
  );
}