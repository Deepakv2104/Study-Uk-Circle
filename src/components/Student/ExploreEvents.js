import React, { useState, useEffect } from 'react';
import "./UserDashboard.css";
import EventCard from './EventCard';
import { Grid, CircularProgress, TextField, MenuItem, Select, InputLabel, FormControl, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaStar, FaStarHalf } from "react-icons/fa";

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

const ExploreEvents = () => {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = () => {
    console.log("Search term:", searchTerm);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
  };

  return (
    <div className='explore-events'>
    <div className="search-filter-container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <TextField
            label="Search Events"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
              sx: {
                '& .MuiIconButton-root': {
                  color: 'white',
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiOutlinedInput-input': {
                color: 'white',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <FormControl fullWidth variant="outlined" sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiSelect-select': {
              color: 'white',
            },
          }}>
            <InputLabel sx={{ color: 'white' }}>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: '#333', // Background color of dropdown
                    color: 'white', // Text color of dropdown
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              <MenuItem value="Academic Events">Academic Events</MenuItem>
              <MenuItem value="Cultural Events">Cultural Events</MenuItem>
              <MenuItem value="Social Events">Social Events</MenuItem>
              <MenuItem value="Sports and Recreation">Sports and Recreation</MenuItem>
              <MenuItem value="Professional Development">Professional Development</MenuItem>
              <MenuItem value="Health and Wellness">Health and Wellness</MenuItem>
              <MenuItem value="Volunteer and Community Service">Volunteer and Community Service</MenuItem>
              <MenuItem value="Orientation and Information Sessions">Orientation and Information Sessions</MenuItem>
              <MenuItem value="Arts and Entertainment">Arts and Entertainment</MenuItem>
              <MenuItem value="Technology and Innovation">Technology and Innovation</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
    <h1>Popular Categories</h1>

<div className="carousel-container">
        <IconButton onClick={handlePrev} className="carousel-btn" sx={{ color: 'white' }}>
          &lt;
        </IconButton>
        <div className="category-slider">
          {/* Render category cards */}
          {categories.map((category, index) => (
            <div key={index} className={`category-item ${currentIndex === index ? "active" : ""}`}>
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
  </div>
  
    );
  };
  
  export default ExploreEvents;
  