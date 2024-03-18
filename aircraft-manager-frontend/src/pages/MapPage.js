import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import starIconUrl from '../images/starIcon.png'; // Make sure this path is correct

// Define a custom icon using the Leaflet icon method
const starIcon = new L.Icon({
  iconUrl: starIconUrl,
  iconSize: [25, 25], // Size of the icon in pixels
  iconAnchor: [12, 25], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

// Data for the airports
const airports = [
  { name: 'LAX', position: [33.9416, -118.4085] },
  { name: 'O\'Hare', position: [41.9742, -87.9073] },
  { name: 'JFK', position: [40.6413, -73.7781] },
];

function MapPage() {
    return (
      <div style={{ padding: '20px' }}> {/* Add padding around the map */}
        <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: '600px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {airports.map(airport => (
            <Marker key={airport.name} position={airport.position} icon={starIcon}>
              <Popup>{airport.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }
export default MapPage;
