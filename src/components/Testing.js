// Dashboard.js

import React from 'react';

const Dashboard = () => {
  // Hardcoded data
  const userData = {
    registeredStudents: 1500,
    activeUsersLastWeek: 800,
    activeUsersLastMonth: 1200,
    popularEvents: [
      { name: 'Event A', registrations: 200 },
      { name: 'Event B', registrations: 180 },
      // Add more events as needed
    ],
  };

  const trendsData = {
    demographics: [
      { label: '18-25', value: 600 },
      { label: '26-30', value: 400 },
      // Add more demographics as needed
    ],
    geographicDistribution: [
      { label: 'London', value: 600 },
      { label: 'Manchester', value: 300 },
      // Add more locations as needed
    ],
    popularTimePeriods: [
      { label: 'Morning', value: 400 },
      { label: 'Afternoon', value: 600 },
      // Add more time periods as needed
    ],
  };

  return (
    <div className="container mx-auto p-4">
      {/* User Engagement Stats */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">User Engagement</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <p className="text-xl font-bold">Registered Students</p>
            <p className="text-gray-700">{userData.registeredStudents}</p>
          </div>
          {/* Add similar components for other stats */}
        </div>
      </div>

      {/* Trends and Analytics Stats */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Trends and Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add components for demographic, geographic, and time period stats */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
