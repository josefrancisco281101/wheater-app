import React, { useState } from "react";
import CurrentDefault from "./components/CurrentDafault";
import FiveDays from "./components/FiveDays";
import Details from "./components/Details";

const App = () => {
  const [selectedCity, setSelectedCity] = useState("London");

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="  bg-[#100e1d]  ">
      <div className=" bg-[#1e213a]   text-white ">
        <CurrentDefault
          onCitySelect={handleCityChange}
          selectedCity={selectedCity}
        />
      </div>

      <div className="   ">
        <div className=" ">
          <FiveDays selectedCity={selectedCity} />
          <div className="  ">
            <Details selectedCity={selectedCity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
