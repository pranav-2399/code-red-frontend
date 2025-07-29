// components/Home.jsx
import { useState } from 'react';
import '../styles/Home.css';
import Map from './Map';
import LocationSearch from './LocationSearch';

export default function Home() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [submitted, setSubmitted] = useState(false);

    const handleShowOnMap = async () => {
    if (!source || !destination) {
        alert("Please select both locations.");
        return;
    }

    setSubmitted(true);

    const data = {
        source,
        destination,
        timestamp: new Date().toISOString()
    };

    // 1️⃣ POST to backend
    try {
        const response = await fetch("http://localhost:8000/transit/locations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        });

        if (!response.ok) {
        throw new Error("Failed to send data");
        }

        console.log("✅ Data successfully sent to backend!");
    } catch (err) {
        console.error("❌ Error sending data:", err);
    }

    // 2️⃣ Optional: Download JSON file locally
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'route_data.json';
    a.click();
    URL.revokeObjectURL(url);
    };

  return (
    
    <div className="home-container">
      <h1>PHEIDIPPIDES</h1>
      <div className="two-columns">
        <Map
          source={submitted ? source : null}
          destination={submitted ? destination : null}
        />
        <div className="home-features">
          <h2 className="home-features-heading">Inputs</h2>
          <div className="features-inputs">
            <LocationSearch label="Source" onSelect={setSource} />
            <LocationSearch label="Destination" onSelect={setDestination} />
            <button onClick={handleShowOnMap}>Show on Map</button>
          </div>
        </div>
      </div>
    </div>
  );
}
