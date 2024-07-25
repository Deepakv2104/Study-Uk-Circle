import React from 'react';
import MapComponent from './MapComponent';

const Maps = () => {
    // Example restaurant locations
    const locations = [
        { name: 'Haute Dolci Manchester', address: '123 Main St, London', latitude: 51.57039346135882, longitude: -0.28479769609129724 },
        { name: 'Chaiiology Soho Rd', address: '456 Elm St, Birmingham', latitude: 52.4862, longitude: -1.8904 },
        { name: 'All Greek Street Food', address: '789 Oak St, Manchester', latitude: 53.4808, longitude: -2.2426 },
        { name: 'All Greek Street Food', address: '101 Pine St, Glasgow', latitude: 55.8642, longitude: -4.2518 },
        { name: 'Haute Dolci Manchester', address: '202 Maple St, Edinburgh', latitude: 55.9533, longitude: -3.1883 },
        { name: 'Lekker Cafe', address: '303 Birch St, Liverpool', latitude: 53.4084, longitude: -2.9916 },
        { name: 'Chaiiology Soho Rd', address: '404 Cedar St, Bristol', latitude: 51.4545, longitude: -2.5879 },
        { name: 'Tabule Kitchen', address: '505 Spruce St, Cardiff', latitude: 51.4816, longitude: -3.1791 },
        { name: 'Lekker Cafe', address: '606 Walnut St, Belfast', latitude: 54.5973, longitude: -5.9301 },
        { name: 'Chaiiology Soho Rd', address: '707 Cherry St, Leeds', latitude: 53.8008, longitude: -1.5491 },
        { name: 'Haute Dolci Manchester', address: '808 Willow St, Newcastle', latitude: 54.9783, longitude: -1.6175 },
        { name: 'Tabule Kitchen', address: '909 Ash St, Nottingham', latitude: 52.9548, longitude: -1.1581 },
    ];



    return (
        <div>
            <h1>Restaurant Locations</h1>
            <MapComponent locations={locations} />
        </div>
    );
};

export default Maps;
