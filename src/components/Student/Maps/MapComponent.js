import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for the markers
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [30, 46],
    iconAnchor: [12, 41],
});

const MapComponent = ({ locations }) => {
    const openGoogleMaps = (name, latitude, longitude) => {
        // const url = `https://www.google.com/maps?q=${name},${latitude},${longitude}`;
        const url = `https://www.google.com/maps?q=${encodeURIComponent(name)}`;
        window.open(url, '_blank');
    };


    return (
        <MapContainer center={[52.505, -1.2]} zoom={7.1} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
                <Marker key={index} position={[location.latitude, location.longitude]} icon={customIcon}>
                    <Popup>
                        <div>
                            <strong>{location.name}</strong><br />
                            {location.address}<br />
                            <button
                                className='text-blue-500'
                                // onClick={() => openGoogleMaps(location.name, location.latitude, location.longitude)}>
                                onClick={() => openGoogleMaps(location.name)}>
                                View on Google Maps
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;

