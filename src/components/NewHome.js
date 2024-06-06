import React from 'react'
import { useNavigate } from 'react-router-dom';
import insight from '../assets/img/insight.png'
import events from '../assets/img/events.png'
import enhance from '../assets/img/enhance.png'
import LottieAnimation from "./LottieAnimation";
import animationData from "../assets/lotties/study.json";
import mentorship2 from "../assets/img/mentorship2.png";
import university from '../assets/img/university.png'
import amp from '../assets/img/amp.png'
import job from '../assets/img/job.png';
// import accomadation from '../assets/img/accomadation.png';
import Footer from './Footer';
import NewNav from './NewNav';
import accom from '../assets/img/accom.jpeg'
import jobop from '../assets/img/jobop.jpeg'
import mentor from '../assets/img/mentor.jpeg'
import uni from '../assets/img/uni.jpeg'
import eve from '../assets/img/eve.avif'
import AboutUs from './About';
import './NewHome1.css'

const NewHome = () => {
    const navigate = useNavigate();

    const handleJoinClick = () => {
        navigate('/join-waiting-list')
    }

    const handleBrandFormClick = () => {
        navigate('/write-to-us')
    }

    return (
        <div className='bg-gray-900 text-white min-h-screen'>
            <NewNav />
            <section className=' mt-0'>
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                    <div className="md:w-1/2">
                        <h3 className="text-3xl font-bold">
                        The ultimate ecosystem to <span className="custom-text-color"> connect </span> and                             <span className="custom-text-color">empower</span>
 you in the UK!
                            
                        </h3>
                        <p className="mt-4 text-lg">
                            WorldLynk is your one-stop solution for a seamless student experience in the UK.
                        </p>
                        <div className="flex mt-6">
                            <button onClick={handleJoinClick} className="custom-bg-color hover:bg-orange-600 text-black py-2 px-4 rounded mr-4">
                                Join Now
                            </button>
                            <button onClick={handleJoinClick} className="custom-text-color border border-orange-500  hover:bg-white hover:text-black py-2 px-4 rounded">
                                Sign in
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                        <LottieAnimation
                            animationData={animationData}
                            className="max-w-full h-auto"
                            style={{ width: '80%', height: 'auto' }} // Adjust the width and height as needed
                        />
                    </div>
                </div>
            </section>



<section  >
<AboutUs/>
</section>



<section className='py-10 bg-gray-800 text-white'>
    <div className="container mx-auto px-4">
        <div className="text-center mb-10">
            <h2 className='text-3xl font-bold'>Partner <span className="custom-text-color">With Us.</span></h2>
            <p className='mt-4'>Embark on a journey of mutual growth and success by aligning your brand with WorldLynk. Partnering with us offers unparalleled advantages:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
                <div className="custom-bg-color p-4 rounded-full mb-4">
                    <img src={amp} alt="Amplified Reach" className="w-10 h-10" />
                </div>
                <h5 className="text-lg font-semibold">Amplified Reach</h5>
            </div>
            <div className="flex flex-col items-center">
                <div className="custom-bg-color p-4 rounded-full mb-4">
                    <img src={enhance} alt="Enhanced Engagement" className="w-10 h-10" />
                </div>
                <h5 className="text-lg font-semibold">Enhanced Engagement</h5>
            </div>
            <div className="flex flex-col items-center">
                <div className="custom-bg-color p-4 rounded-full mb-4">
                    <img src={insight} alt="Insightful Analytics" className="w-10 h-10" />
                </div>
                <h5 className="text-lg font-semibold">Insightful Analytics</h5>
            </div>
        </div>
        <div className="text-center mt-10">
            <button onClick={handleBrandFormClick} className="custom-bg-color hover:bg-orange-600 text-black py-2 px-4 rounded">
                Write to us
            </button>
        </div>
    </div>
</section>
<div id="about" className="about-containe m-3 mx-auto px-4">
    <div className=" p-4 border-2 border-gray-600 rounded-lg text-center md:text-left transform transition-transform duration-300 hover:scale-105">
        <h2 className='text-4xl font-bold mb-6'>About Us</h2>
        <p className='text-lg text-justify'>
            Worldlynk's goal is to create an ecosystem for international students by consolidating various solutions into a single platform, encompassing accommodation, travel, financial transactions, careers, and more. We are collaborating with universities to help them gain insights into their students and enhance their experiences. We have also partnered with accommodation providers. Our B2B model will be detailed further in our product demo. Our broader vision is to develop an interactive, AI-driven ecosystem that integrates and adapts all other platforms through our portal to meet your needs.
        </p>
    </div>
</div>


            <Footer />
        </div>
    )
}

export default NewHome
