import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function VisitorMap({ visitors }) {
  const defaultPosition = [20, 0]; // Centered view

  return (
    <MapContainer center={defaultPosition} zoom={2} scrollWheelZoom={false} className="h-full w-full rounded-md">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {visitors.map((visitor) => (
        <Marker
          key={visitor._id}
          position={[
            visitor.location.coordinates[1], // Latitude
            visitor.location.coordinates[0]  // Longitude
          ]}
        >
          <Popup>
            <div className="font-sans">
              <strong>IP:</strong> {visitor.ipAddress}<br/>
              <strong>Location:</strong> {visitor.city}, {visitor.country}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
export default VisitorMap;
