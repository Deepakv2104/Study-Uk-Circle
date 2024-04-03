import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import lottie from "lottie-web";

const LottieAnimation = ({ animationData }) => {
    const container = useRef(null);
  
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
      return () => animation.destroy();
    }, [animationData]);
  
    return <div ref={container}></div>;
  };
  
  export default LottieAnimation;