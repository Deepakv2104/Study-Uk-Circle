import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./UserDashboard.css";
import EventCard from './EventCard';
import {  CircularProgress } from '@mui/material';
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
