import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tab,
  Tabs,
} from "@mui/material";

import EventList from "./EventList"; // Assuming you have a component to list events

const EventsExplore = () => {
  const { eventCategory } = useParams();
  const [value, setValue] = useState("All Events");
  const [searchTerm, setSearchTerm] = useState("");
console.log(eventCategory)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ mb: 2, color: "white" }}>
            Explore Events
          </Typography>
          <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
            <TextField
              label="Search Events"
              variant="outlined"
              
             size='small' 
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
            />
<FormControl variant="outlined"              size='small' 
 sx={{display:'flex',
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
  <InputLabel  sx={{ color: "white" }}>Event Type</InputLabel>
  <Select
    value={value}
    onChange={(e) => handleChange(e, e.target.value)}
    label="Event Type"
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white !important", // Add !important to override default styles
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
      },
      "& .MuiInputLabel-root": {
        color: "white",
      },
      "& .MuiInputBase-input": {
        color: "white",
      },
      "& .MuiSelect-icon": {
        color: "white",
      },
      "& .MuiPaper-root": {
        backgroundColor: "#424242",
        color: "white",
      },
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          backgroundColor: "#424242",
          "& .MuiMenuItem-root": {
            color: "white",
          },
          "& .MuiMenuItem-root.Mui-selected": {
            backgroundColor: "#616161",
          },
        },
      },
    }}
  >
    <MenuItem value="All Events">All Events</MenuItem>
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

          </Box>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              overflowX: "auto",
              maxWidth: "100%",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "white",
              },
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTab-root": {
                  color: "white",
                },
                "& .Mui-selected": {
                  color: "white",
                },
              }}
            >
              <Tab label="All Events" value="All Events" />
              <Tab label="Academic Events" value="Academic Events" />
              <Tab label="Cultural Events" value="Cultural Events" />
              <Tab label="Social Events" value="Social Events" />
              <Tab label="Sports and Recreation" value="Sports and Recreation" />
              <Tab label="Professional Development" value="Professional Development" />
              <Tab label="Health and Wellness" value="Health and Wellness" />
              <Tab label="Volunteer and Community Service" value="Volunteer and Community Service" />
              <Tab label="Orientation and Information Sessions" value="Orientation and Information Sessions" />
              <Tab label="Arts and Entertainment" value="Arts and Entertainment" />
              <Tab label="Technology and Innovation" value="Technology and Innovation" />
            </Tabs>
          </Box>
          <Box>
            <EventList searchTerm={searchTerm} eventType={value}  />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventsExplore;
