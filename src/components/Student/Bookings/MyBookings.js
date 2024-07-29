import React from 'react';
import TicketCard from './TicketCard';

const MyBookings = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <TicketCard
        date="24"
        month="Jul"
        eventName="😍FRIDAY NIGHT PROJECT😍"
        eventDay="Wed 24th Jul 2024"
        eventTime="10:00AM & 11:00AM"
        location=" Proud Late, London"
      />
    </div>
  );
};

export default MyBookings;