import React, { useState } from "react";
import CurrentDefault from "./components/CurrentDafault";
import FiveDays from "./components/FiveDays";

const App = () => {
  const [selectedCity, setSelectedCity] = useState("London");

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="flex">
      <div className="justify-between bg-[#1e213a] h-screen w-[360px] text-white ">
        <CurrentDefault
          onCitySelect={handleCityChange}
          selectedCity={selectedCity}
        />
      </div>
      <div className="flex  h-[50%] w-[70%] justify-center">
        <FiveDays selectedCity={selectedCity} />
      </div>
    </div>
  );
};

export default App;
