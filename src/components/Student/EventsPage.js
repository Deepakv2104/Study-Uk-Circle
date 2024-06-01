import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./UserDashboard.css";
import EventCard from './EventCard';
import { Grid, CircularProgress, IconButton } from '@mui/material';
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EventCover from '../../assets/img/events_cover.jpg'
import CardSlider from './CardSlider';

const categories = [
  { name: "Academic Events", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Facademic%20events.jpg?alt=media&token=6ac2e42d-daac-4470-a1b0-c0db106ea740" },
  { name: "Cultural Events", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fcultural%20events.jpg?alt=media&token=25640cc9-35ac-497f-a115-954ca7cccdb9" },
  { name: "Social Events", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fsocial%20events.jpg?alt=media&token=85df17bb-62c1-43b5-bca3-11c0205849e4" },
  { name: "Sports and Recreation", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fsports%20events.jpg?alt=media&token=95a6345e-400d-4c8a-bea6-f95d8e85570a" },
  { name: "Professional Development", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fprofessional%20development.jpg?alt=media&token=7c741c38-9383-48d2-b375-028145949f81" },
  { name: "Health and Wellness", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fhealth%20and%20wellness.jpg?alt=media&token=0ddf4b74-35d9-4e34-a7c2-8171f89f5fb1" },
  // { name: "Volunteer and Community Service", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-festivals-966143a0ebbebe550ab712d30d11e5f6.jpg" },
  { name: "Orientation and Information Sessions", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-comedy-fc098385c6204c4abf2ced0b1d397725.jpg" },
  { name: "Arts and Entertainment", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Fart.jpg?alt=media&token=42108d75-b8bf-4856-b592-23f51c5e1b24" },
  { name: "Technology and Innovation", imageUrl: "https://firebasestorage.googleapis.com/v0/b/worldlynk-97994.appspot.com/o/assets%2Ftech.jpg?alt=media&token=e5a71b37-b49b-4d97-9026-8f79a9e2c0e4" }
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

  const academicEvents = eventData.filter(event => event.eventCategory === "Academic Events");
  const culturalEvents = eventData.filter(event => event.eventCategory === "Cultural Events");
  const socialEvents = eventData.filter(event => event.eventCategory === "Social Events");
  const sportsEvents = eventData.filter(event => event.eventCategory === "Sports and Recreation");
  const professionalEvents = eventData.filter(event => event.eventCategory === "Professional Development");
  const healthEvents = eventData.filter(event => event.eventCategory === "Health and Wellness");
  const orientationEvents = eventData.filter(event => event.eventCategory === "Orientation and Information Sessions");
  const artsEvents = eventData.filter(event => event.eventCategory === "Arts and Entertainment");
  const techEvents = eventData.filter(event => event.eventCategory === "Technology and Innovation");
  

  const fetchEventData = async () => {
    try {
      const eventsCollectionRef = collection(firestore, "events");
      const eventsQuerySnapshot = await getDocs(eventsCollectionRef);

      if (!eventsQuerySnapshot.empty) {
        const data = [];
        eventsQuerySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setEventData(data);
      } else {
        console.log("No events found");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`all-events/${categoryName}`);
  };
  const handleBannerClick = ()=>{
    navigate('all-events')
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div className='explore-events'>

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

      <div className="upcoming-events">
        <h1>Upcoming Events</h1>
        <div className="event-container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
              <CircularProgress />
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <EventCard key={index} eventData={event} />
            ))
          )}
        </div>
      </div>
      <div className="upcoming-events">
        <h1>Academic Events</h1>
        <div className="event-container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
              <CircularProgress />
            </div>
          ) : (
            academicEvents.map((event, index) => (
              <EventCard key={index} eventData={event} />
            ))
          )}
        </div>
      </div>
      <div className="upcoming-events">
        <h1>Cultural Events</h1>
        <div className="event-container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
              <CircularProgress />
            </div>
          ) : (
            culturalEvents.map((event, index) => (
              <EventCard key={index} eventData={event} />
            ))
          )}
        </div>
      </div>
      <div className="upcoming-events">
        <h1>Social Events</h1>
        <div className="event-container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
              <CircularProgress />
            </div>
          ) : (
            socialEvents.map((event, index) => (
              <EventCard key={index} eventData={event} />
            ))
          )}
        </div>
      </div>
      <div className="upcoming-events">
      <h1>Sports and Recreation</h1>
      <div className="event-container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </div>
        ) : (
          sportsEvents && sportsEvents.length > 0 ? (
            sportsEvents.map((event, index) => (
              <EventCard key={index} eventData={event} />
            ))
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
              No data
            </div>
          )
        )}
      </div>
      
    </div>
    <div className="upcoming-events">
      <h1>Professional Development</h1>
      <div className="event-container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </div>
        ) : (
          professionalEvents && professionalEvents.length > 0 ? (
            professionalEvents.map((event, index) => (
              <EventCard key={index} eventData={event} />
            ))
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
              No data
            </div>
          )
        )}
      </div>
      
    </div>
    <div className="upcoming-events">
      <h1>Health and Wellness</h1>
      <div className="event-container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </div>
        ) : (
          healthEvents && healthEvents.length > 0 ? (
            healthEvents.map((event, index) => (
              <EventCard key={index} eventData={event} />
            ))
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
              No data
            </div>
          )
        )}
      </div>
      
    </div>
  
    <div className="upcoming-events">
      <h1>Orientation and Information Sessions</h1>
      <div className="event-container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </div>
        ) : (
          orientationEvents && orientationEvents.length > 0 ? (
            orientationEvents.map((event, index) => (
              <EventCard key={index} eventData={event} />
            ))
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
              No data
            </div>
          )
        )}
      </div>
      
    </div>
    <div className="upcoming-events">
      <h1>Arts and Entertainment</h1>
      <div className="event-container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </div>
        ) : (
          artsEvents && artsEvents.length > 0 ? (
            artsEvents.map((event, index) => (
              <EventCard key={index} eventData={event} />
            ))
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
              No data
            </div>
          )
        )}
      </div>
      
    </div>
    <div className="upcoming-events">
      <h1>Technology and Innovation</h1>
      <div className="event-container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </div>
        ) : (
          techEvents && techEvents.length > 0 ? (
            techEvents.map((event, index) => (
              <EventCard key={index} eventData={event} />
            ))
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
              No data
            </div>
          )
        )}
      </div>
      
    </div>
    {/* <CardSlider/> */}
    </div>
  );
};

export default EventsPage;
