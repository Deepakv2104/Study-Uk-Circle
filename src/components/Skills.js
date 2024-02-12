import React, { useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { gsap } from "gsap";
import img1 from "../assets/img/img1.webp";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import colorSharp from "../assets/img/color-sharp.png";

export const Skills = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    // Using GSAP for animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.fromTo(
      carouselRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1 }
    );
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <img
                className="background-image-left"
                src={colorSharp}
                alt="Image"
              />
              <Carousel
                ref={carouselRef}
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                <div className="item">
                  <img src={img1} alt="Image" />
                </div>
                <div className="item">
                  <img src={img1} alt="Image" />
                </div>
                <div className="item">
                  <img src={img1} alt="Image" />
                </div>
                <div className="item">
                  <img src={img1} alt="Image" />
                </div>
              
               
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
