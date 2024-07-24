import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import EventCard from './EventCard';
import { firestore } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Slider1 from './Slider';
import academicEvents from './img/academic-events.jpg';
import art from './img/art.jpg';
import cultural from './img/cultural-events.jpg';
import eventsCover from './img/events_cover.jpg';
import healthAndWellness from './img/health-and-wellness.jpg';
import professionalDev from './img/professional-development.jpg';
import social from './img/social-events.jpg';
import sports from './img/sports-events.jpg';
import tech from './img/tech.jpg';
import orientation from './img/orientation.png';
import CardSlider from  './CardSlider';
import './EventsPage.css'

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

  const filteredEvents = eventData.filter(event => {
    const matchesSearchTerm = event.eventName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
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

  const handleBannerClick = () => {
    navigate('all-events');
  };

  return (
    <div className="events-page">
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
      <h3>Popular Categories</h3>
      <CardSlider />
      <h3>upcoming events</h3>
      <Slider1 events={eventData} />

     

      {categories.map((category, index) => {
        // Filter events by category
        const categoryEvents = eventData.filter(event => event.category === category.name);

        return (
          <div key={index}>
            <h3>{category.name}</h3>
            <div>
              {loading ? (
                <div >
                  <CircularProgress />
                </div>
              ) : (
                <Slider1 events={categoryEvents} /> // Pass filtered events to Slider1
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventsPage;
