// components/Home.jsx
import { useState } from 'react';
import '../styles/Home.css';
import Map from './Map';
import LocationSearch from './LocationSearch';

export default function Home() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleShowOnMap = () => {
    if (source && destination) {
      setSubmitted(true);
    } else {
      alert("Please select both locations.");
    }
  };

  return (
    <div className="home-container">
      <h1>Hermes Signing Off</h1>
      <div className="two-columns">
        <Map
          source={submitted ? source : null}
          destination={submitted ? destination : null}
        />
        <div className="home-features check">
          <h2 className="home-features-heading check">Inputs</h2>
          <div className="features-inputs check">
            <LocationSearch label="Source" onSelect={setSource} />
            <LocationSearch label="Destination" onSelect={setDestination} />
            <button onClick={handleShowOnMap}>Show on Map</button>
          </div>
        </div>
      </div>
    </div>
  );
}
