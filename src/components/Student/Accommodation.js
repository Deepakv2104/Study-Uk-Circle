import React, { useState } from 'react';
import './Accommodation.css'; // Import the CSS file for styling

const Accommodation = () => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Here you would perform an API call to fetch hotel results based on the selected filters
    // For demonstration purposes, I'm just updating the state with dummy data
    const dummyResults = [
      { name: 'Hotel A', price: '$100', rating: '4.5/5' },
      { name: 'Hotel B', price: '$120', rating: '4.3/5' },
      { name: 'Hotel C', price: '$90', rating: '4.7/5' },
    ];
    setResults(dummyResults);
  };

  return (
    <div className="hotel-booking-container">
      <h1 className="hotel-booking-title">Accommodation</h1>
      <div className="filter-row">
        <div className="filter-item">
          <label>
            Location:
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Check-in Date:
            <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Check-out Date:
            <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
          </label>
        </div>
        <div className="filter-item">
          <label>
            Guests:
            <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} />
          </label>
        </div>
        <div className="filter-item">
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="search-results">
        <h2>Search Results</h2>
        <ul>
          {results.map((hotel, index) => (
            <li key={index} className="hotel-item">
              <p>Name: {hotel.name}</p>
              <p>Price: {hotel.price}</p>
              <p>Rating: {hotel.rating}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accommodation;
