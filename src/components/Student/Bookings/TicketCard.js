import React from 'react';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const TicketCard = ({ date, month, eventName, eventDay, eventTime, location }) => {
  const day = date ? date.match(/\d+/)[0] : 'N/A';
  return (
    <div className="flex max-w-md mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      {/* Left section - Date */}
      <div className="w-1/4 bg-gray-700 p-4 flex flex-col items-center justify-center border-r border-gray-600">
        <span className="text-4xl font-bold text-white">{day}</span>
        <span className="text-xl uppercase text-gray-300">{month}</span>
      </div>
      
      {/* Right section - Event details */}
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-semibold mb-2 text-white">{eventName}</h2>
        <div className="text-sm text-gray-300 mb-2">
          <FaClock className="inline mr-1" />
          {eventDay} {eventTime}
        </div>
        <div className="text-sm text-gray-300 mb-4">
          <FaMapMarkerAlt className="inline mr-1" />
          {location}
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm transition duration-300">
          Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketCard;