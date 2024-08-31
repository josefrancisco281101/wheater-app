import React, { useState } from "react";
import CurrentDefault from "./components/CurrentDafault";
import FiveDays from "./components/FiveDays";
import Details from "./components/Details";

const App = () => {
  const [selectedCity, setSelectedCity] = useState("London");
  const [units, setUnits] = useState("metric");

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };
  const toggleUnits = (newUnits) => {
    setUnits(newUnits);
  };
  return (
    <div className="bg-[#100e1d] block md:flex h-screen w-screen overflow-auto  lg:overflow-hidden">
      <div className="bg-[#1e213a] w-full md:w-[30%] text-white">
        <CurrentDefault
          onCitySelect={handleCityChange}
          selectedCity={selectedCity}
          units={units}
          toggleUnits={toggleUnits}
        />
      </div>

      <div className="flex w-full justify-center">
        <div className="w-full md:w-[70%] ">
          <FiveDays
            selectedCity={selectedCity}
            units={units}
            toggleUnits={toggleUnits}
          />
          <div className="">
            <Details selectedCity={selectedCity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
