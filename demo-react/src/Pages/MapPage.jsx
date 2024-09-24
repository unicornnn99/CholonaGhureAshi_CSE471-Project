import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const locations = [
    { name: "Dhaka", coords: [23.8103, 90.4125] },
    { name: "Barisal", coords: [22.701, 90.3535] },
    { name: "Cox's Bazar", coords: [21.4272, 92.0058] },
    { name: "Chittagong", coords: [22.3569, 91.7832] },
    { name: "Sylhet", coords: [24.8949, 91.8687] },
    { name: "Rangamati", coords: [22.6379, 92.211] },
    { name: "Cumilla", coords: [23.4606, 91.1809] },
    { name: "Rajshahi", coords: [24.3745, 88.6042] },
    { name: "Khulna", coords: [22.8456, 89.5403] }, 
    { name: "Kolkata", coords: [22.5726, 88.3639] },
    { name: "Tripura", coords: [23.9408, 91.9882] }, 
  ];

const MapPage = () => {
  const [position, setPosition] = useState([23.8103, 90.4125]); // Default to Dhaka
  const [selectedLocation, setSelectedLocation] = useState("Dhaka");

  const handleLocationChange = (event) => {
    const selectedPlace = event.target.value;
    const location = locations.find((loc) => loc.name === selectedPlace);
    if (location) {
      setPosition(location.coords);
      setSelectedLocation(selectedPlace);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="row">
        <div className="col-md-6">
          <div style={{ padding: "10px" }}>
            <label htmlFor="">Please Select Your Destination</label>
            <select
              className="form-control"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              {locations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <MapContainer
        center={position}
        zoom={6}
        style={{ height: "90%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            {selectedLocation} <br /> A beautiful place to explore.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPage;
