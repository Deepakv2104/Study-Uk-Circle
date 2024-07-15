import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CardSlider.css';

import academicEvents from './img/academic-events.jpg'
import art from './img/art.jpg'
import cultural from './img/cultural-events.jpg'
import eventsCover from './img/events_cover.jpg'
import healthAndWellness from './img/health-and-wellness.jpg'
import professionalDev from './img/professional-development.jpg'
import social from './img/social-events.jpg'
import sports from './img/sports-events.jpg'
import tech from './img/tech.jpg'
import orientation from './img/orientation.png'

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

  return (
    <div className="slide-container">
      <Swiper
        className="slide-content"
        slidesPerView={6}
        spaceBetween={0}
        loop={true}
        centeredSlides={true}
        // pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        breakpoints={{
          0: { slidesPerView: 1 },
          520: { slidesPerView: 2 },
          950: { slidesPerView: 3 },
          1200: { slidesPerView: 6 }, // Ensure 4 slides per view on larger screens
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index } >
            <div
              className="category-item"
              onClick={() => handleCategoryClick(category.name)}
            >
              <img src={category.imageUrl} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CardSlider;
