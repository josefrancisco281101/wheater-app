import React, { useState } from "react";
import CurrentDefault from "./components/CurrentDafault";
import FiveDays from "./components/FiveDays";

const App = () => {
  const [selectedCity, setSelectedCity] = useState("London");

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="flex h-screen w-screen ]">
      <div className="justify-between bg-[#1e213a] h-screen w-[350px] text-white ">
        <CurrentDefault
          onCitySelect={handleCityChange}
          selectedCity={selectedCity}
        />
      </div>

      <div className="flex  h-[70%] w-[75%] justify-center bg-[#100e1d]">
        <FiveDays selectedCity={selectedCity} />
      </div>
    </div>
  );
};

export default App;
