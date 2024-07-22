// Slider1.js
import React from 'react';
import Slider from 'react-slick'; // Make sure this is installed
import EventCard from './EventCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider1.css'; // Make sure to include your styles

const Slider1 = ({ events }) => {
  const settings = {
    dots: events.length > 1, // Show dots only if more than one event
    infinite: events.length > 1, // Enable infinite scrolling only if more than one event
    speed: 500,
    slidesToShow: Math.min(events.length, 4), // Show fewer slides if there are fewer events
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(events.length, 4),
          slidesToScroll: 1,
          infinite: events.length > 1,
          dots: events.length > 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(events.length, 2.5),
          slidesToScroll: 1,
          infinite: events.length > 1,
          dots: events.length > 1,
        },
      },
    ],
  };

  return (
    
    <Slider {...settings}>
      {events.length === 0 ? (
        <div className="p-2">
          <p>No events available</p>
        </div>
      ) : (
        events.map((event) => (
          <div key={event.id} className="p-2">
            <EventCard eventData={event} />
          </div>
        ))
      )}
    </Slider>
  );
};

export default Slider1;
