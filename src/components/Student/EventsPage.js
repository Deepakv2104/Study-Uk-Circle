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

const categories = [
  { name: "Academic Events", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-club-nights-156c2e26e09bbcb1def7873e179c6715.jpg" },
  { name: "Cultural Events", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-gigs-f071e499e930231fee8bc09de3495d1d.jpg" },
  { name: "Social Events", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-classes-a88385b6ee2ed458fd511c984ddb92c8.jpg" },
  { name: "Sports and Recreation", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-business-809788c128d481bae6d4a6e173dfc737.jpg" },
  { name: "Professional Development", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-arts-7116d71219f4332ae17a0c260cf43714.jpg" },
  { name: "Health and Wellness", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-food-and-drink-ceac1cd53584ba0c9c3100768db05896.jpg" },
  { name: "Volunteer and Community Service", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-festivals-966143a0ebbebe550ab712d30d11e5f6.jpg" },
  { name: "Orientation and Information Sessions", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-comedy-fc098385c6204c4abf2ced0b1d397725.jpg" },
  { name: "Arts and Entertainment", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-fitness-fed748a130a814b3c0efa422d4880b8d.jpg" },
  { name: "Technology and Innovation", imageUrl: "https://cdn-ember.fatsoma.com/assets/models/images/category/category-dating-67e882792b63608f6a889ecf1b3d2a0f.jpg" }
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
  const volunteerEvents = eventData.filter(event => event.eventCategory === "Volunteer and Community Service");
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

<div class="_discover_wz3ty0">
  <div class="_container_wz3ty0">
    <h1 class="_discover-title_wz3ty0">Find something great to do.</h1>

    <div class="_discover-container_wz3ty0">
      <div class="_discover-button_wz3ty0" onClick={handleBannerClick}>
        Find an event
      </div>
    </div>
  </div>
</div>
      <h1>Popular Categories</h1>
      <div className="carousel-container">
        <IconButton onClick={handlePrev} className="carousel-btn" sx={{ color: 'white' }}>
          &lt;
        </IconButton>
        <div className="category-slider">
          {/* Render category cards */}
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-item ${currentIndex === index ? "active" : ""}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <img src={category.imageUrl} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
        <IconButton onClick={handleNext} className="carousel-btn" sx={{ color: 'white' }}>
          &gt;
        </IconButton>
      </div>

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
      <h1>Volunteer and Community Service</h1>
      <div className="event-container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </div>
        ) : (
          volunteerEvents && volunteerEvents.length > 0 ? (
            volunteerEvents.map((event, index) => (
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
    </div>
  );
};

export default EventsPage;
