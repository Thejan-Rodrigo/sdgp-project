import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

// Updated animation variants with slower duration
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }, // Slower duration (1.2 seconds)
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

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <AnimatedSection variants={fadeInUp}>
              <div>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-primary text-blue-500">≡ Kinder Zone</div>
                </div>
                <p className="mt-4 text-gray-400">Nurturing young minds and building strong foundations.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection variants={fadeInUp}>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Programs
                    </a>
                  </li>
                  <li>
                    <a onClick={() => navigate('/aboutus')} className="text-gray-400 hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Enrollment
                    </a>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection variants={fadeInUp}>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <p className="text-gray-400">123 Education St, City</p>
                <p className="text-gray-400">contact@kinderzone.com</p>
              </div>
            </AnimatedSection>

            <AnimatedSection variants={fadeInUp}>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaFacebook />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaTwitter />
                  </a>
                  <a href="https://www.instagram.com/kinderzone_sl/" className="text-gray-400 hover:text-white">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </footer>
    </div>
  );
}