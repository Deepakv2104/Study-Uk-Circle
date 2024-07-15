import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import { firestore } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const EventList = ({ searchTerm, eventType, universityId }) => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const fetchEventData = async () => {
    try {
      const eventsCollectionRef = collection(firestore, "events");
      const eventsQuerySnapshot = await getDocs(eventsCollectionRef);

      if (!eventsQuerySnapshot.empty) {
        const data = [];
        eventsQuerySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data(), favorite: false });
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

  const handleFavoriteClick = (eventId) => {
    setEventData((prevData) =>
      prevData.map((event) =>
        event.id === eventId ? { ...event, favorite: !event.favorite } : event
      )
    );
  };

  const filteredEvents = eventData.filter((event) => {
    return (
      (eventType === "All Events" || event.eventCategory === eventType) &&
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleBuyClick = (eventId) => {
    navigate(`/user-dashboard/eventDetails/${eventId}`);
  };
  
  const handleReadMoreClick = (eventId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    } else {
      return "Invalid Date";
    }
  };

  return (
    <Box>
    {filteredEvents.length > 0 ? (
      <Grid container spacing={2}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={3} key={event.id}>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-gray-900 text-white">
              <div className="aspect-w-16 aspect-h-9">
                <img src={event.eventImage || 'NA'} alt={event.eventName} className="w-full h-full object-cover" />
              </div>
              <div className="p-2 sm:p-3"> {/* Adjusted padding */}
                <h2 className="text-base font-semibold mb-1 sm:mb-2">{event.eventName}</h2> {/* Adjusted font size */}
                <p className="text-white-600 mb-1 sm:mb-2">{event.location}</p> 
                <p className="text-white-500 mb-1 sm:mb-2">{formatTimestamp(event.TimeAndDate)}</p> 
                <p className="text-white-500 mb-2 sm:mb-3">{event.eventCategory}</p> {/* Adjusted margin bottom */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleBuyClick(event.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 text-xs sm:text-sm" 
                  >
                    Buy Ticket
                  </button>
                  <IconButton aria-label="share" className="text-gray-500 hover:text-gray-700">
                    <ShareIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography variant="body1" color="white">No events found.</Typography>
    )}
  </Box>
  
  );
};

export default EventList;
