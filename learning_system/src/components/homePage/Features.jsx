import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeatureCard from './FeatureCard';
import { FaBrain, FaUsers, FaGraduationCap } from 'react-icons/fa';

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

const Features = () => {
  const features = [
    {
      icon: <FaBrain className="text-4xl text-primary" />,
      title: 'Cognitive Development',
      description:
        'Enhance problem-solving skills and critical thinking through structured learning',
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: 'Social Skills',
      description:
        'Develop essential social and emotional learning through interactive games and guided play',
    },
    {
      icon: <FaGraduationCap className="text-4xl text-primary" />,
      title: 'Early Education',
      description:
        'Build a strong foundation by following age-appropriate and engaging curriculum',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <AnimatedSection variants={fadeInUp} className="text-center">
          <h2 className="text-3xl font-bold mb-4">Why Preschool Education Matters</h2>
          <p className="text-gray-600 mb-12">
            Early childhood education plays a crucial role in shaping your child's future. Discover how
            our program develops every aspect of development.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index} variants={fadeInUp} className="flex">
              <FeatureCard {...feature} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;