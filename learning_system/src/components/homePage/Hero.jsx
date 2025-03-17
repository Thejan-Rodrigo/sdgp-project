import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Updated animation variants with slower duration
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4 } }, // Slower duration (1.2 seconds)
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.4 } }, // Slower duration (1.2 seconds)
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

const Hero = () => {
  return (
    <div className="relative h-[600px] bg-gradient-to-r from-blue-500 to-green-400">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <AnimatedSection variants={fadeInLeft}>
            <h1 className="text-5xl font-bold mb-6">Where Learning Meets Fun</h1>
          </AnimatedSection>

          <AnimatedSection variants={fadeInLeft} className="mb-8">
            <p className="text-xl">Nurturing Young Minds for a Brighter Future</p>
          </AnimatedSection>

          <AnimatedSection variants={fadeInUp}>
            <button className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
              Explore Our Programs
            </button>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Hero;