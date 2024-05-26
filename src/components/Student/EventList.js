import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const EventList = ({ searchTerm, eventType, universityId }) => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


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
    navigate(`${eventId}`);
  };
  return (
    <Box>
      {filteredEvents.length > 0 ? (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ backgroundColor: "rgba(230, 231, 247, 0.1)", color: "white", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", position: "relative" }}>
              <Card sx={{ backgroundColor: "rgba(230, 231, 247, 0.1)", color: "white", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", position: "relative" }}>
  <CardMedia
    component="img"
    height="140"
    image={event.eventImage || "https://via.placeholder.com/345x140"}
    alt={event.eventName}
    sx={{ position: "relative" }}
  />
  <Typography
    variant="body2"
    color="white"
    sx={{
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: "8px"
    }}
  >
    {event.TimeAndDate.toDate().toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
  </Typography>
</Card>

             
                <IconButton
                  aria-label="favorite"
                  sx={{ position: "absolute", top: 5, right: 5, color: event.favorite ? "red" : "white", transition: "color 0.3s ease" }}
                  onClick={() => handleFavoriteClick(event.id)}
                >
                  {event.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                    {event.eventName}
                  </Typography>
                  <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                    {event.eventCategory}
                  </Typography>
                  <Typography variant="body2" color="white" sx={{ lineHeight: 1.5 }}>
                    {event.eventDescription}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
                  <Button variant="outlined" color="secondary" startIcon={<ShareIcon />}>Share</Button>
                  <Button variant="contained" color="primary" onClick={() => handleBuyClick(event.eventId)}>Buy Ticket</Button>
                </Box>
              </Card>
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
