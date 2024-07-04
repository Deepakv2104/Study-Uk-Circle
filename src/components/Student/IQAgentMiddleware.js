import React, { useState, useEffect } from 'react';
import HotelData1 from '../Data/HotelData';
import _ from 'lodash';
import room from './room.jpg';

const HotelBooking = () => {
  const [exportData, setExportData] = useState([]);
  const [filterCity, setFilterCity] = useState('Lincoln');
  const [filterAvailability, setFilterAvailability] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const itemsPerPage = 8;

  useEffect(() => {
    const loadData = async () => {
      try {
        const exportSheet = await HotelData1.Export;
        if (!exportSheet) {
          console.error('Export sheet is null or undefined');
          return;
        }

        // Filter out objects with any null values
        const filteredExportSheet = exportSheet.filter(obj =>
          Object.values(obj || {}).every(value => value !== null)
        );
        setExportData(filteredExportSheet);

        const sheet1 = await HotelData1.Sheet1;
        if (!sheet1) {
          console.error('Sheet1 is null or undefined');
          return;
        }

        // Filter out objects with any null values
        const filteredSheet1 = sheet1.filter(obj =>
          Object.values(obj || {}).every(value => value !== null)
        );
        const cities = _.uniq(filteredSheet1.map(item => item.City));
        setUniqueCities(cities);
      } catch (error) {
        console.error('Error loading data:', error);
        // Handle error loading data
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      try {
        let filtered = exportData || [];

        if (filterCity) {
          filtered = filtered.filter(item => item && item.City === filterCity);
        }

        if (filterAvailability) {
          filtered = filtered.filter(item => item && item['Session Booked Status'] === filterAvailability);
        }

        if (searchTerm) {
          filtered = filtered.filter(item =>
            Object.values(item).some(val =>
              val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }

        if (minPrice !== '' && maxPrice !== '') {
          filtered = filtered.filter(item =>
            item && item.Rate >= parseInt(minPrice) && item.Rate <= parseInt(maxPrice)
          );
        }

        setFilteredData(filtered);
      } catch (error) {
        console.error('Error applying filters:', error);
        // Handle error applying filters
      }
    };

    applyFilters();
  }, [exportData, filterCity, filterAvailability, searchTerm, minPrice, maxPrice]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleBuyClick = (eventId) => {
    // Placeholder function for handling buy click
    console.log(`Buy clicked for event ID ${eventId}`);
    // Implement your logic here, such as opening a modal, navigating to a different page, etc.
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="bg-gray-800 p-10 relative">
        <img
          src={room}
          alt="Hotel Room"
          className="absolute inset-0 w-full h-full object-cover h-120"
        />

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Ideal Hotel</h1>
          <p className="text-lg text-gray-300">Browse through a wide selection of hotels and book your stay with ease.</p>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="container mx-auto mt-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300 p-2 rounded mr-2"
            />
            <select
              onChange={e => setFilterCity(e.target.value)}
              className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300 p-2 rounded mr-2"
            >
              <option value="">All Cities</option>
              {uniqueCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <select
              onChange={e => setFilterAvailability(e.target.value)}
              className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300 p-2 rounded mr-2"
            >
              <option value="">All Availability</option>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
              {/* Add more options based on your data */}
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="maxPrice" className="text-gray-700 dark:text-gray-300 mr-2">
              Max Price: £{maxPrice}
            </label>
            <input
              type="range"
              id="maxPrice"
              min={0}
              max={300} // Adjust maximum range according to your data
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300 p-2 rounded"
            />
            <span className="ml-2">{maxPrice}</span>
          </div>
        </div>

        {/* Hotel Cards */}
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            <p>No rooms available matching your criteria.</p>
          </div>
        )}

        {filteredData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
            {currentItems.map((item, index) => (
              <div key={index} className="max-w-xs rounded-lg overflow-hidden shadow-lg" style={{ maxWidth: '300px' }}>
                <img
                  src={`https://via.placeholder.com/400x250.png?text=Hotel`}
                  alt="Hotel"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">Rate: £{item.Rate}</h2>
                  <p className="text-sm text-gray-600 mb-2">Location: {item.City}</p>
                  <p className="text-sm text-gray-600 mb-2">Room Type: {item['Room Type']}</p>
                  <div className="flex justify-between items-center">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 text-xs"
                      onClick={() => handleBuyClick(item.eventId)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-300 py-2 px-4 rounded-l disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-300 py-2 px-4 rounded-r disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="text-center mt-2">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
