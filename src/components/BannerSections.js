import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import lottie from "lottie-web";
import animationData from "../assets/lotties/job1.json";
import animationData1 from "../assets/lotties/workshops.json";
import animationData2 from "../assets/lotties/connect.json";
import animationData3 from "../assets/lotties/locate.json";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LottieAnimation from "./LottieAnimation";
import logo from '../assets/img/logo.svg';
import '../styles/BannerSections.css'
const sections = [
  {
    id: 1,
    animationData: animationData,
    title: "Job Opportunities",
    content:
"    Your gateway to global job opportunities. Explore diverse stays, jobs, mentorship, and events effortlessly. Find personalized guidance and connections for a seamless career journey. Break geographical boundaries and access international opportunities. Empower your career with WorldLynk."  },
  {
    id: 2,
    animationData: animationData1,
    title: "Events/Workshops",
    content:
      " Elevate your skills with exclusive events and workshops. Discover tailored opportunities in stays, jobs, and mentorship. Our platform provides personalized guidance, connecting you with events to enhance your professional journey. Break boundaries, access international workshops, and empower your career growth with WorldLynk.",
    search:"Register Now"
    },
  {
    id: 2,
    animationData: animationData2,
    title: "Connect with peers",
    content:
      "WorldLynk opens doors to a global network, facilitating connections with like-minded peers. Discover stays, jobs, and mentorship opportunities while engaging with a vibrant community. Our platform provides personalized guidance for a seamless networking experience, empowering your professional growth.",
   search:"Contact Now"
    },
  {
    id: 2,
    animationData: animationData3,
    title: "Find Accomodation",
    content:
      "Find your ideal stay seamlessly. Explore diverse accommodation options tailored to your preferences. Whether it's for education or work, our platform offers personalized guidance, ensuring a comfortable and enriching stay experience. Break barriers, discover international stays, and elevate your living arrangements with WorldLynk.",
  search:"Search Homes"
    },
  // Add more sections as needed
];

const BannerSections = () => {

  const container = useRef(null);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.fromTo(
      ".right-column-content",
      { opacity: 0, y: 70 },
      {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".right-column-content",
         
          toggleActions: "play none none reset",
          delay: 0.5,
        },
      }
    );

    return () => {
      // If the component unmounts, kill the ScrollTrigger instance
      tl.scrollTrigger.kill();
    };
  }, []);

  return (
    <section className="section2" id="services">
      <Container>
     
        {sections.map((section, index) => (
          <Row
          key={section.id}
          className={`align-items-center ${index % 2 === 0 ? 'even-section' : 'odd-section'}`}
        >
            {/* Check if the index is odd or even to determine the layout */}
            {index % 2 === 0 ? (
              <>
                <Col xs={12} md={6} xl={7} >
                  <LottieAnimation animationData={section.animationData} />
                </Col>
                <Col xs={12} md={6} xl={5} className="right-column-content">
                  <h1>{section.title}</h1>
                  <p>{section.content}</p>
                  {/* <button onClick={() => console.log("connect")}>
                    {section.search} <ArrowRightCircle size={25} />
                  </button> */}
                </Col>
              </>
            ) : (
              <>
                <Col xs={12} md={6} xl={5} className="right-column-content">
                  <h1>{section.title}</h1>
                  <p>{section.content}</p>
                  {/* <button onClick={() => console.log("connect")}>
                   {section.search} <ArrowRightCircle size={25} />
                  </button> */}
                </Col>
                <Col xs={12} md={6} xl={7}>
                  <LottieAnimation animationData={section.animationData} />
                </Col>
              </>
            )}
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default BannerSections;
