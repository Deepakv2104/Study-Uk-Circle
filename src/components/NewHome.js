import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import insight from '../assets/img/insight.png';
import enhance from '../assets/img/enhance.png';
import LottieAnimation from "./LottieAnimation";
import animationData from "../assets/lotties/study.json";
import amp from '../assets/img/amp.png';
// import accomadation from '../assets/img/accomadation.png';
import Footer from './Footer';
import NewNav from './NewNav';
import AboutUs from './About';
import './NewHome1.css';

const NewHome = () => {
    const navigate = useNavigate();
    const typewriterRef = useRef(null);

    const handleJoinClick = () => {
        navigate('/join-waiting-list');
    };

    const handleBrandFormClick = () => {
        navigate('/write-to-us');
    };

    useEffect(() => {
        const phrases = ["students", "brands", "entrepreneurs"];
        let index = 0;
        let typeInterval, deleteInterval;

        const typePhrase = () => {
            const phrase = phrases[index];
            const length = phrase.length;
            let i = 0;

            typeInterval = setInterval(() => {
                if (typewriterRef.current) {
                    if (i <= length) {
                        typewriterRef.current.textContent = phrase.slice(0, i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                        setTimeout(deletePhrase, 1000);
                    }
                }
            }, 100);
        };

        const deletePhrase = () => {
            let length = typewriterRef.current ? typewriterRef.current.textContent.length : 0;

            deleteInterval = setInterval(() => {
                if (typewriterRef.current) {
                    if (length >= 0) {
                        typewriterRef.current.textContent = typewriterRef.current.textContent.slice(0, length);
                        length--;
                    } else {
                        clearInterval(deleteInterval);
                        index = (index + 1) % phrases.length;
                        setTimeout(typePhrase, 1000);
                    }
                }
            }, 100);
        };

        typePhrase();

        return () => {
            clearInterval(typeInterval);
            clearInterval(deleteInterval);
        };
    }, []);

    return (
        <div className='bg-gray-900 text-white min-h-screen'>
            <NewNav />
            <section className='mt-0'>
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <div className="md:w-1/2">
    <h3 className="text-3xl md:text-4xl font-bold">
        The ultimate ecosystem for{' '}
        <span className="custom-text-color" ref={typewriterRef}></span> <br />in the UK
    </h3>
    <p className="mt-4 text-base md:text-lg">
        WorldLynk is your one-stop solution for a seamless experience in the UK.
    </p>
    <div className="flex flex-wrap mt-6">
        <button onClick={handleJoinClick} className="custom-bg-color hover:bg-orange-600 text-black py-2 px-4 rounded mr-4 mb-2 md:mb-0">
            Join Now
        </button>
        <button onClick={handleJoinClick} className="custom-text-color border border-orange-500 hover:bg-white hover:text-black py-2 px-4 rounded">
            Sign in
        </button>
    </div>
</div>

                    <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                        <LottieAnimation
                            animationData={animationData}
                            className="max-w-full h-auto"
                            style={{ width: '80%', height: 'auto' }}
                        />
                    </div>
                </div>
            </section>

            <section>
                <AboutUs />
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
            <Footer />
        </div>
    );
};

export default NewHome;
