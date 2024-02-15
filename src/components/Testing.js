// Import necessary libraries
import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import animationData1 from '../assets/lotties/study.json';
import animationData2 from '../assets/lotties/student.json';
import animationData3 from '../assets/lotties/students.json';
import animationData4 from '../assets/lotties/job1.json';
import '../styles/Testing.css'; // Import the custom styles

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  // Create a ref for the container element
  const containerRef = useRef(null);

  useEffect(() => {
    // Set up animations using gsap and ScrollTrigger
    const animations = [
      createAnimation('.section1', animationData1),
      createAnimation('.section2', animationData2),
      createAnimation('.section3', animationData3),
      createAnimation('.section4', animationData4),
    ];

    // Initialize ScrollTrigger for sections
    animations.forEach((animation, index) => {
      ScrollTrigger.create({
        trigger: `.section${index + 1}`,
        start: 'top center', // Adjust start position as needed
        end: '+=200%', // Adjust as needed
        animation: animation,
        scrub: true,
      });
    });

    // Initialize ScrollTrigger for panels
    gsap.utils.toArray('.card__content').forEach((item) => {
      const contentElements = item.querySelectorAll('.card__inner > *');

      gsap.set(contentElements, {
        y: 0,
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: item,
        markers: true,
        pin: true,
        start: 'top 50%',
        end: 'bottom 50%',
        snap: { snapTo: [0.5], duration: 1, delay: 0 },
        onEnter: ({ progress, direction, isActive }) => {
          gsap.fromTo(contentElements, { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05 });
        },
        onLeave: ({ progress, direction, isActive }) => {
          gsap.fromTo(contentElements, { y: 0, opacity: 1 }, { y: -80, opacity: 0, stagger: 0.05 });
        },
        onLeaveBack: ({ progress, direction, isActive }) => {
          gsap.fromTo(contentElements, { y: 0, opacity: 1 }, { y: -80, opacity: 0, stagger: 0.05 });
        },
        onEnterBack: ({ progress, direction, isActive }) => {
          gsap.fromTo(contentElements, { y: -80, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05 });
        },
      });
    });

    // Animate the container with gsap.fromTo
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.5 }, // Start state
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 } // End state and animation properties
    );

    // Show popup after scrolling a certain distance
    ScrollTrigger.create({
      trigger: '.section4',
      start: 'top bottom',
      end: '+=100%',
      onEnter: () => showPopup(),
    });
  }, []);

  const createAnimation = (target, animationData) => {
    return gsap.timeline({
      scrollTrigger: {
        trigger: target,
        start: 'top center', // Adjust start position as needed
        end: '+=200%', // Adjust as needed
        scrub: true,
      },
    }).fromTo(target, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power1.inOut' });
  };

  const showPopup = () => {
    gsap.to('.popup-container', { opacity: 1, transform: 'translateY(0)', duration: 0.5, ease: 'power1.inOut' });
  };

  const defaultLottieOptions = {
    loop: false,
    autoplay: false,
    animationData: {},
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      {[animationData1, animationData2, animationData3, animationData4].map((animationData, index) => (
        <section
          key={`section-${index + 1}`}
          className={`section${index + 1}`}
        >
          <div className="lottie-container" ref={containerRef}>
            <Lottie
              options={{ ...defaultLottieOptions, animationData: animationData }}
              height={200}
              width={200}
            />
          </div>
        </section>
      ))}

      {/* Popup Container */}
      <div className="popup-container">
        <p>This is a popup!</p>
      </div>
    </div>
  );
};

export default HomePage;
