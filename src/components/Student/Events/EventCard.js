import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShare, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
} from "@mui/material";

const EventCard = ({ eventData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleBuyClick = (eventId) => {
    navigate(`/user-dashboard/eventDetails/${eventId}`);
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
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg" style={{ maxWidth: '250px' }}             onClick={() => handleBuyClick(eventData.eventId)}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img src={eventData.eventImage || 'NA'} alt={eventData.eventName} className="w-full h-full object-cover" />
      </div>
      <div className="p-2">
        <h2 className="text-lg font-semibold mb-1">{eventData.eventName}</h2>
        <p className="text-sm text-white-600 mb-1">{eventData.location}</p>
        <p className="text-xs text-white-500 mb-1">{formatTimestamp(eventData.TimeAndDate)}</p>
        <p className="text-xs text-white-500 mb-2">{eventData.eventCategory}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleBuyClick(eventData.eventId)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 text-xs"
          >
            Buy Ticket
          </button>
          <IconButton onClick={handleDialogOpen} className="text-white hover:text-gray-700 p-1">
  <FaShare />
</IconButton>

        </div>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Share Event</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <IconButton style={{ color: "rgb(79, 153, 213)" }}>
                  <FaTwitter />
                </IconButton>
                <IconButton style={{ color: "rgb(34, 173, 34)" }}>
                  <FaWhatsapp />
                </IconButton>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default EventCard;
