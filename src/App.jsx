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
    <div className="  bg-[#100e1d] flex flex-col sm:flex-row h-screen w-screen">
      <div className=" bg-[#1e213a] w-full sm:w-[30%] text-white sm:block  ">
        <CurrentDefault
          onCitySelect={handleCityChange}
          selectedCity={selectedCity}
          units={units}
          toggleUnits={toggleUnits}
        />
      </div>

      <div className="  flex h-full w-2/3 justify-center ">
        <div className=" ">
          <FiveDays
            selectedCity={selectedCity}
            units={units}
            toggleUnits={toggleUnits}
          />
          <div className=" sm:block ">
            <Details selectedCity={selectedCity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
