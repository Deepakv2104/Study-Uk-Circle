import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../styles/UserDashboard.css";
import EventCard from './EventCard';
import {  CircularProgress } from '@mui/material';
import { firestore } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardSlider from './CardSlider';
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
  

const EventsPage = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredEvents = eventData.filter(event => {
    const matchesSearchTerm = event.eventName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? event.eventCategory === selectedCategory : true;
    return matchesSearchTerm && matchesCategory;
  });


  
  const fetchEventData = async () => {
    try {
      const eventsCollectionRef = collection(firestore, "events");
      const eventsQuerySnapshot = await getDocs(eventsCollectionRef);

      if (!eventsQuerySnapshot.empty) {
        const data = eventsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEventData(data);
      } else {
        console.log("No events found");
      }
    } catch (error) {
      console.error("Error fetching events data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventData.length === 0) {
      fetchEventData();
    }
  }, [eventData]);


  const handleCategoryClick = (categoryName) => {
    navigate(`all-events/${categoryName}`);
  };
  const handleBannerClick = ()=>{
    navigate('all-events')
  };



  return (
    <div className='events-page'>
    <div className="_discover_wz3ty0">
      <div className="_container_wz3ty0">
        <h1 className="_discover-title_wz3ty0">Find something great to do.</h1>
        <div className="_discover-container_wz3ty0">
          <div className="_discover-button_wz3ty0" onClick={handleBannerClick}>
            Find an event
          </div>
        </div>
      </div>
    </div>
  
    <h1>Popular Categories</h1>
    <CardSlider/>
  
    <div className="upcoming-events relative">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
        <div className="event-container grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
          {loading ? (
            <div className="flex justify-center items-center h-60">
              <CircularProgress />
            </div>
          ) : (
            filteredEvents.slice(0, 4).map((event, index) => (
              <div key={index} className="card-container">
                <EventCard eventData={event} />
              </div>
            ))
          )}
          <button onClick={() => navigate("all-events")} className="see-more-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded absolute top-1/2 transform -translate-y-1/2 right-0">
            See More
          </button>
        </div>
      </div>
    </div>
  
    {categories.map((category, index) => (
      <div className="upcoming-events" key={index}>
        <h1>{category.name}</h1>
        <div className="event-container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
              <CircularProgress />
            </div>
          ) : (
            eventData.filter(event => event.eventCategory === category.name).slice(0, 4).map((event, index) => (
              <div key={index} className="card-container">
                <EventCard eventData={event} />
              </div>
            ))
          )}
        </div>
      </div>
    ))}
  </div>
  
  );
  
};

export default EventsPage;
