import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CardSlider.css';

const categories = [
  { name: "Academic Events", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Facademic%20events.jpg?alt=media&token=6ac2e42d-daac-4470-a1b0-c0db106ea740" },
  { name: "Cultural Events", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fcultural%20events.jpg?alt=media&token=25640cc9-35ac-497f-a115-954ca7cccdb9" },
  { name: "Social Events", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fsocial%20events.jpg?alt=media&token=85df17bb-62c1-43b5-bca3-11c0205849e4" },
  { name: "Sports and Recreation", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fsports%20events.jpg?alt=media&token=95a6345e-400d-4c8a-bea6-f95d8e85570a" },
  { name: "Professional Development", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fprofessional%20development.jpg?alt=media&token=7c741c38-9383-48d2-b375-028145949f81" },
  { name: "Health and Wellness", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fhealth%20and%20wellness.jpg?alt=media&token=0ddf4b74-35d9-4e34-a7c2-8171f89f5fb1" },
  { name: "Orientation and Information Sessions", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-comedy-fc098385c6204c4abf2ced0b1d397725.jpg" },
  { name: "Arts and Entertainment", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fart.jpg?alt=media&token=42108d75-b8bf-4856-b592-23f51c5e1b24" },
  { name: "Technology and Innovation", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Ftech.jpg?alt=media&token=e5a71b37-b49b-4d97-9026-8f79a9e2c0e4" }
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
