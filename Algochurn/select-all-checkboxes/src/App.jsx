import React, { useState } from "react";

function App() {
  const cities = ["Ujjain", "Indore", "Bangalore", "Dubai", "America", "Delhi"];
  const [selectedCities, setSelectedCities] = useState([]);

  const handleSelectAll = () => {
    if (selectedCities.length === cities.length) {
      setSelectedCities([]); // Uncheck all
    } else {
      setSelectedCities([...cities]); // Check all
    }
  };

  const handleCityChange = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city)); // Uncheck specific city
    } else {
      setSelectedCities([...selectedCities, city]); // Check specific city
    }
  };

  return (
    <div className="container">
      <h2>Select Your Cities</h2>
      
      {/* Select All Checkbox */}
      <label className="select-all">
        <input
          type="checkbox"
          checked={selectedCities.length === cities.length}
          onChange={handleSelectAll}
        />
        Select All Cities
      </label>

      {/* List of Cities */}
      <div className="cities-list">
        {cities.map((city, idx) => (
          <label key={idx} className="city-item">
            <input
              type="checkbox"
              checked={selectedCities.includes(city)}
              onChange={() => handleCityChange(city)}
            />
            {city}
          </label>
        ))}
      </div>
    </div>
  );
}

export default App;
