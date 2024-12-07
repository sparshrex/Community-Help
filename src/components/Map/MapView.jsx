import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Custom marker icon using Lucide React
const createMarkerIcon = () => {
  return L.divIcon({
    html: `<div class="text-red-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

function MapView({ posts, onMarkerClick }) {
  const markerIcon = createMarkerIcon();

  return (
    <MapContainer
      center={[40.7128, -74.0060]}
      zoom={11}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {posts.map((post) => (
        <Marker
          key={post.id}
          position={[post.latitude, post.longitude]}
          icon={markerIcon}
          eventHandlers={{
            click: () => onMarkerClick(post.id),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;