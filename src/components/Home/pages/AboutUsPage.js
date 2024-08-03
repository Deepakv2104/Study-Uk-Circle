import React, { useState, useEffect } from 'react';
import NewNav from '../sub-components/NewNav';
import Footer from '../sub-components/Footer';
import { FaBullseye, FaLightbulb, FaUsers } from 'react-icons/fa';

const AboutUsPage = () => {


  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <NewNav />
      <div className="relative overflow-hidden">
        <div className="bg-video-wrapper">
        
        </div>
        <div className="container mx-auto py-16 px-4 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-gray-200">Get to know more about our mission, vision, and values</p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <FaBullseye className="text-5xl text-blue-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-2">Personalized Experiences</h3>
              <p className="text-gray-200">
                <strong>Goal:</strong> Tailor the platform to meet users' needs and preferences. <br />
                <strong>Achievement:</strong> Provide relevant recommendations and a customized user experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaLightbulb className="text-5xl text-yellow-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-2">Innovation & Improvement</h3>
              <p className="text-gray-200">
                <strong>Goal:</strong> Evolve the platform with cutting-edge technologies. <br />
                <strong>Achievement:</strong> Keep the platform up-to-date and relevant.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaUsers className="text-5xl text-green-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-2">Supportive Community</h3>
              <p className="text-gray-200">
                <strong>Goal:</strong> Cultivate a supportive community for users. <br />
                <strong>Achievement:</strong> Create a sense of belonging and provide valuable networks.
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-gray-200 mb-6">
              At WorldLynk, our mission is to empower individuals and communities by integrating leading services into a seamless experience. We enhance connectivity, accessibility, and productivity, making global information and opportunities universally accessible.
            </p>
            <p className="text-lg text-gray-200">
              We envision a world where digital connections transcend boundaries, enabling everyone to thrive. Our platform supports, inspires, and empowers future generations, creating a world of unlimited digital bridges.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;


