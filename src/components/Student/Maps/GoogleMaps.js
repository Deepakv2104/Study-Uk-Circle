// src/components/Map.tsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const locations = [
    { lat: -3.745, lng: -38.523 },
    { lat: -3.735, lng: -38.533 },
    // Add more restaurant locations here
];

const GoogleMaps = () => {
    return (
        <LoadScript googleMapsApiKey="AIzaSyCTZK8tPL3ATp9QjeGUZpc7eFPnnB3pv9s">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                {locations.map((location, index) => (
                    <Marker key={index} position={location} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMaps;

