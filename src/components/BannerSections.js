import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LottieAnimation from "./LottieAnimation";
import '../styles/BannerSections.css';

// Define sections separately
const sections = [
  {
    id: 1,
    animationData: require("../assets/lotties/study.json"),
    title: "Are you studying in UK?",
    content: "Embark on your academic journey with WorldLynk, your one-stop solution for seamless student experiences in the UK. We gobeyond boundaries to provide comprehensive services, ensuring your stay is enriching and your career path is paved with success.",
    search: "Register Now"
  },
  {
    id: 2,
    animationData: require("../assets/lotties/job1.json"),
    title: "Job Opportunities",
    content: "Your gateway to global job opportunities. Explore diverse stays, jobs, mentorship, and events effortlessly. Find personalized guidance and connections for a seamless career journey. Break geographical boundaries and access international opportunities. Empower your career with WorldLynk.",
    search: "Register Now"
  },
  {
    id: 3,
    animationData: require("../assets/lotties/workshops.json"),
    title: "Events/Workshops",
    content: "Elevate your skills with exclusive events and workshops. Discover tailored opportunities in stays, jobs, and mentorship. Our platform provides personalized guidance, connecting you with events to enhance your professional journey. Break boundaries, access international workshops, and empower your career growth with WorldLynk.",
    search: "Register Now"
  },
  {
    id: 4,
    animationData: require("../assets/lotties/connect.json"),
    title: "Connect with peers",
    content: "WorldLynk opens doors to a global network, facilitating connections with like-minded peers. Discover stays, jobs, and mentorship opportunities while engaging with a vibrant community. Our platform provides personalized guidance for a seamless networking experience, empowering your professional growth.",
    search: "Contact Now"
  },
  {
    id: 5,
    animationData: require("../assets/lotties/locate.json"),
    title: "Find Accommodation",
    content: "Find your ideal stay seamlessly. Explore diverse accommodation options tailored to your preferences. Whether it's for education or work, our platform offers personalized guidance, ensuring a comfortable and enriching stay experience. Break barriers, discover international stays, and elevate your living arrangements with WorldLynk.",
    search: "Search Homes"
  }
];

const BannerSection = ({ id, animationData, title, content, search }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.section-${id}`,
        toggleActions: "play none none reset",
        start: "top center",
        markers: false, // for debugging purposes
      }
    });

    tl.fromTo(
      `.section-${id} .left-column-content`,
      { opacity: 0, y: 70 },
      {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: "power3.out",
      }
    ).fromTo(
      `.section-${id} .right-column-content`,
      { opacity: 0, y: 70 },
      {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: "power3.out",
      },
      
      "-=2.5" // delay the animation for the right column
    );

    return () => {
      tl.scrollTrigger.kill();
    };
  }, [id]);

  return (
    <Container>
      
      <Row className={`align-items-center section-${id}`}>
        <Col xs={12} md={6} xl={5} className="left-column-content">
          <LottieAnimation animationData={animationData} />
        </Col>
        <Col xs={12} md={6} xl={7} className="right-column-content">
          <h1>{title}</h1>
          <div style={{ textAlign: 'justify' }}>
            <p>{content}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const BannerSections = () => {
  return (
    <section className="banner-sections" id="services">
       <span className="tagline" style={{ fontSize: "36px" }}>
              Welcome to <span style={{   color: "#02ffab" }}>WorldLynk</span>
            </span>
      <Container>
        {sections.map((section) => (
          <BannerSection key={section.id} {...section} />
        ))}
      </Container>
    </section>
  );
};

export default BannerSections;
