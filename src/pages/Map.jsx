// src/pages/Map.jsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import '../styles/Map.css';

const orsApiKey = "YOUR_ORS_API_KEY_HERE";

const Map = () => {
  const [route, setRoute] = useState([]);

  const start = [28.6139, 77.2090]; // New Delhi
  const end = [28.7041, 77.1025];   // Delhi outskirts

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.post(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            coordinates: [ [start[1], start[0]], [end[1], end[0]] ]
          },
          {
            headers: {
              Authorization: orsApiKey,
              "Content-Type": "application/json"
            }
          }
        );

        const coords = response.data.features[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng]
        );
        setRoute(coords);
      } catch (err) {
        console.error("Error fetching route:", err);
      }
    };

    fetchRoute();
  });

  return (
    <MapContainer className="MapContainer" center={start} zoom={11} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={start} />
      <Marker position={end} />
      {route.length > 0 && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
};

export default Map;
