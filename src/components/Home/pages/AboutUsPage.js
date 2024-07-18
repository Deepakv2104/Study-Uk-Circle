import React from 'react';
import NewNav from '../sub-components/NewNav';
import Footer from '../sub-components/Footer';
import { FaBullseye, FaLightbulb, FaUsers } from 'react-icons/fa';
// import './NewHome1.css';

const AboutUsPage = () => {
  return (
    <div>
      <NewNav />
      <div className="bg-gray-800 text-white min-h-screen">
        <div className="join-container mx-auto max-w-5xl px-4 py-2">
          <div className="left-column space-y-12">
            <div className="heading mb-8 text-center">
              <h3 className="text-4xl font-bold">About Us</h3>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start sm:space-x-4">
                <FaBullseye className="text-4xl text-blue-400 mb-4 sm:mb-0" />
                <div>
                  <h4 className="text-2xl font-semibold mb-4">Deliver Personalized Experiences</h4>
                  <p className="large-text">
                    <strong>Goal:</strong> Tailor the platform to meet users' needs and preferences.<br />
                    <strong>Achievement:</strong> Provide relevant recommendations and a customized user experience that increases satisfaction and engagement.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start sm:space-x-4">
                <FaLightbulb className="text-4xl text-yellow-400 mb-4 sm:mb-0" />
                <div>
                  <h4 className="text-2xl font-semibold mb-4">Foster Innovation and Continuous Improvement</h4>
                  <p className="large-text">
                    <strong>Goal:</strong> Continuously evolve the platform by integrating cutting-edge technologies and responding to user feedback.<br />
                    <strong>Achievement:</strong> Keep the platform up-to-date with the latest advancements and remain relevant and practical.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start sm:space-x-4">
                <FaUsers className="text-4xl text-green-400 mb-4 sm:mb-0" />
                <div>
                  <h4 className="text-2xl font-semibold mb-4">Build a Supportive Community</h4>
                  <p className="large-text">
                    <strong>Goal:</strong> Cultivate a community where users can share resources, seek advice, and collaborate on projects.<br />
                    <strong>Achievement:</strong> Create a sense of belonging and provide valuable support networks for users.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-2xl font-semibold mb-4">Our Company's Main Mission</h4>
              <p className="large-text">
                At WorldLynk, our mission is to empower individuals and communities by integrating the world's leading services into a seamless and personalized experience. We aim to enhance connectivity, accessibility, and productivity, ensuring that everyone can organize, access, and utilize information effortlessly. By linking professionals, students, and consumers globally, we strive to make learning, earning, and living more dynamic and inclusive, fostering a future where digital bridges are unlimited.
              </p>
              <p className="large-text">
                WorldLynk envisions a world where digital connections transcend geographical boundaries, enabling individuals and communities to thrive. Our vision is to create an enduring platform that supports, inspires, and empowers the next generations, making global information and opportunities universally accessible and beneficial for all.
              </p>
            </div>
            <img src="https://join.getwyld.in/assets/images/line.png" alt="Divider" className="mb-8 mx-auto" />
            <div className="text-center">
            <a href="/" className="glass-button smaller w-button  rounded-lg bg-orange-500 hover:bg-orange-600" style={{ textDecoration: 'none', color: 'white', padding:'0.8rem' }}>Back to homepage</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
