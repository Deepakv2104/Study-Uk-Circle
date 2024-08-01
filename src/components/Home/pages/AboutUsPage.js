import React from 'react';
import { motion } from 'framer-motion';
import NewNav from '../sub-components/NewNav';
import Footer from '../sub-components/Footer';
import { FaBullseye, FaLightbulb, FaUsers } from 'react-icons/fa';
import './AboutUsPage.css';
import globe from '../../../assets/vid/globe.mp4'
const AboutUsPage = () => {
  return (
    <div className="text-white min-h-screen">
      <NewNav />
      <div className="relative overflow-hidden">
        <motion.div
          className="bg-video-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <video className="bg-video" autoPlay loop muted>
            <source src={globe} type="video/mp4" />
          </video>
        </motion.div>
        <div className="container mx-auto py-16 px-4 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-gray-300">Get to know more about our mission, vision, and values</p>
          </motion.div>
          <div className="grid gap-12 md:grid-cols-3">
            <motion.div
              className="flex flex-col items-center text-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <FaBullseye className="text-5xl text-blue-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-2">Personalized Experiences</h3>
              <p className="text-gray-400">
                <strong>Goal:</strong> Tailor the platform to meet users' needs and preferences. <br />
                <strong>Achievement:</strong> Provide relevant recommendations and a customized user experience.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <FaLightbulb className="text-5xl text-yellow-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-2">Innovation & Improvement</h3>
              <p className="text-gray-400">
                <strong>Goal:</strong> Evolve the platform with cutting-edge technologies. <br />
                <strong>Achievement:</strong> Keep the platform up-to-date and relevant.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <FaUsers className="text-5xl text-green-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-2">Supportive Community</h3>
              <p className="text-gray-400">
                <strong>Goal:</strong> Cultivate a supportive community for users. <br />
                <strong>Achievement:</strong> Create a sense of belonging and provide valuable networks.
              </p>
            </motion.div>
          </div>
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-gray-400 mb-6">
              At WorldLynk, our mission is to empower individuals and communities by integrating leading services into a seamless experience. We enhance connectivity, accessibility, and productivity, making global information and opportunities universally accessible.
            </p>
            <p className="text-lg text-gray-400">
              We envision a world where digital connections transcend boundaries, enabling everyone to thrive. Our platform supports, inspires, and empowers future generations, creating a world of unlimited digital bridges.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
