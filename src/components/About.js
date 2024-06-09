import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import accom from '../assets/img/accom.jpeg';
import jobop from '../assets/img/jobop.jpeg';
import mentor from '../assets/img/mentor.jpeg';
import uni from '../assets/img/uni.jpeg';
import eve from '../assets/img/eve.avif';
import './NewHome1.css';

const AboutUs = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className='py-10 bg-gray-900 text-white mt-8'>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold">Get to know us</h2>
                <hr className="custom-hr" />
                <div className="slider-container mx-auto flex justify-center items-center">
                    <hr className="border-white mb-8" />
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Slider {...settings}>
                            <motion.div
                                className="flex flex-col items-center text-center p-4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={jobop} className='h-48 w-full object-cover mb-4 rounded-lg shadow-lg' alt="Job Opportunities" />
                                <h4 className='text-2xl font-semibold mb-2'>Job Opportunities</h4>
                                <p className='text-base mx-auto'>Your gateway to global job opportunities. Break geographical boundaries and access international opportunities. Empower your career with WorldLynk.</p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center p-4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={eve} className='h-48 w-full object-cover mb-4 rounded-lg shadow-lg' alt="Events" />
                                <h4 className='text-2xl font-semibold mb-2'>Events</h4>
                                <p className='text-base mx-auto'>Discover and participate in engaging events tailored for international students. Explore academic, social, and cultural gatherings that enhance your educational journey in the UK.</p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center p-4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={uni} className='h-48 w-full object-cover mb-4 rounded-lg shadow-lg' alt="Universities" />
                                <h4 className='text-2xl font-semibold mb-2'>Universities</h4>
                                <p className='text-base mx-auto'>Explore top universities across the UK, detailed with program offerings, campus facilities, and admission requirements. Find your perfect academic fit and start your journey to educational excellence.</p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center p-4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={accom} className='h-48 w-full object-cover mb-4 rounded-lg shadow-lg' alt="Accommodation" />
                                <h4 className='text-2xl font-semibold mb-2'>Accommodation</h4>
                                <p className='text-base mx-auto'>Find your ideal stay seamlessly. Explore diverse accommodation options tailored to your preferences. Break barriers, discover international stays, and elevate your living arrangements with WorldLynk.</p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center p-4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={mentor} className='h-48 w-full object-cover mb-4 rounded-lg shadow-lg' alt="Mentorship" />
                                <h4 className='text-2xl font-semibold mb-2'>Mentorship</h4>
                                <p className='text-base mx-auto'>Connect with experienced mentors who can guide you through your academic and career challenges. Our mentorship program offers personalized advice and support to help you succeed in your educational journey and beyond.</p>
                            </motion.div>
                        </Slider>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
