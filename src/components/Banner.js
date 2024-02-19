import React, { useState, useEffect, useRef } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import lottie from "lottie-web";
import gsap from 'gsap';
import '../styles/Banner.css';
import animationData from "../assets/lotties/study.json";
import { useNavigate } from "react-router-dom";
export const Banner = () => {
  const container = useRef(null);
  const navigate = useNavigate();
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [" a Job ?", "Guidence?", "Stays?"];
  const period = 500;

  const handleLogin = () => {
    console.log("clicked");
    navigate('login');
  };

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    // GSAP Animation for the container
    gsap.fromTo(container.current,
      { opacity: 0, scale: 0.5 }, // Start state
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 } // End state and animation properties
    );

    return () => {
      // Cleanup the animation when the component is unmounted
      animation.destroy();
    };
  }, []);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum((prevLoopNum) => prevLoopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <div className="animate__animated animate__fadeIn">
              <span className="tagline">Welcome to INSAUK</span>
              <h1>
                {`Hi! Looking for`}{" "}
                <span
                  className="txt-rotate"
                  data-period="1000"
                  data-rotate='[" Job ", "Guidence?", "stays?]'
                >
                  <span className="wrap">{text}</span>
                </span>
              </h1>

              <p>
                INSA is an organisation that works to connect with all Indian
                students in the UK in order to promote their well-being, to
                keep them bridged with their roots in India and to nurture
                them as future leaders for India
              </p>
              {/* <button onClick={handleLogin}>
                Let’s Connect <ArrowRightCircle size={25} />
              </button> */}
            </div>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <div ref={container}></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
