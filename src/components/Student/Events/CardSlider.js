import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardSlider.css';
import academicEvents from './img/academic-events.jpg';
import art from './img/art.jpg';
import cultural from './img/cultural-events.jpg';
import healthAndWellness from './img/health-and-wellness.jpg';
import professionalDev from './img/professional-development.jpg';
import social from './img/social-events.jpg';
import sports from './img/sports-events.jpg';
import tech from './img/tech.jpg';
import orientation from './img/orientation.png';

const categories = [
  { name: "Academic Events", imageUrl: academicEvents },
  { name: "Cultural Events", imageUrl: cultural },
  { name: "Social Events", imageUrl: social },
  { name: "Sports and Recreation", imageUrl: sports },
  { name: "Professional Development", imageUrl: professionalDev },
  { name: "Health and Wellness", imageUrl: healthAndWellness },
  { name: "Orientation and Information Sessions", imageUrl: orientation },
  { name: "Arts and Entertainment", imageUrl: art },
  { name: "Technology and Innovation", imageUrl: tech }
];

const CardSlider = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`all-events/${categoryName}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 480, settings: { slidesToShow: 3, centerMode: false } }
    ]
  };

  return (
    <div className="card-slider-wrapper">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className="card-item">
            <motion.div
              className="card-content"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="card-image-container">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="card-image"
                />
              </div>
              <p className="card-title">{category.name}</p>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export default CardSlider;
