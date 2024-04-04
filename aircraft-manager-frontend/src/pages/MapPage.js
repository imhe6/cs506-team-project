import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import starIconUrl from '../images/starIcon.png';
import { Box } from '@chakra-ui/react';

// Define a custom icon using the Leaflet icon method
const starIcon = new L.Icon({
  iconUrl: starIconUrl,
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [1, -34],
});

const airports = [
  { name: 'LAX', position: [33.9416, -118.4085] },
  { name: 'O\'Hare', position: [41.9742, -87.9073] },
  { name: 'JFK', position: [40.6413, -73.7781] },
];

function MapPage() {
    return (
      <Box p={5}>
        <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: '600px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {airports.map(airport => (
            <Marker key={airport.name} position={airport.position} icon={starIcon}>
              <Popup>{airport.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    );
}

export default MapPage;
