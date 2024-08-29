import React, { useEffect, useState } from "react";

const API_KEY = "ee9f0e9a792c840e961da85a9d78a840";

const stateOptions = [
  { state: "HeavyCloud", img: "/HeavyCloud.png" },
  { state: "Clear", img: "/Clear.png" },
  { state: "Hail", img: "/Hail.png" },
  { state: "HeavyRain", img: "/HeavyRain.png" },
  { state: "LightCloud", img: "/LightCloud.png" },
  { state: "LightRain", img: "/LightRain.png" },
  { state: "Shower", img: "/Shower.png" },
  { state: "Sleet", img: "/Sleet.png" },
  { state: "Snow", img: "/Snow.png" },
];

const mapDescriptionToState = (description) => {
  const lowerCaseDescription = description.toLowerCase();
  if (lowerCaseDescription.includes("clear")) return "Clear";
  if (lowerCaseDescription.includes("cloud")) return "HeavyCloud";
  if (lowerCaseDescription.includes("rain")) return "LightRain";
  if (lowerCaseDescription.includes("shower")) return "Shower";
  if (lowerCaseDescription.includes("snow")) return "Snow";
  if (lowerCaseDescription.includes("sleet")) return "Sleet";
  if (lowerCaseDescription.includes("hail")) return "Hail";
  return "Clear";
};

const FiveDays = ({ selectedCity, units, toggleUnits }) => {
  const [forecastData, setForecastData] = useState([]);
  const [selectedButton, setSelectedButton] = useState("metric");

  useEffect(() => {
    if (selectedCity) {
      fetchFiveDayForecast(selectedCity);
    }
  }, [selectedCity, units]);

  const fetchFiveDayForecast = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        );
        setForecastData(dailyData);
      })
      .catch((error) =>
        console.error("Error al obtener el pronóstico:", error)
      );
  };

  const getUnitSymbol = () => (units === "metric" ? "°C" : "°F");

  const handleButtonClick = (unit) => {
    toggleUnits(unit);
    setSelectedButton(unit);
  };

  return (
    <div className="bg-[#100e1d]">
      <div className="flex justify-end color-white text-white text-center gap-2 mt-3 mx-2">
        <button
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
            selectedButton === "metric"
              ? "text-[#100e1d] bg-[#e7e7eb]"
              : "text-white bg-[#585676]"
          }`}
          onClick={() => handleButtonClick("metric")}
        >
          °C
        </button>
        <button
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
            selectedButton === "imperial"
              ? "text-[#100e1d] bg-[#e7e7eb]"
              : "text-white bg-[#585676]"
          }`}
          onClick={() => handleButtonClick("imperial")}
        >
          °F
        </button>
      </div>
      <div className="flex justify-center mb-8 items-center gap-2 sm:gap-0">
        {forecastData.map((day, index) => {
          const weatherDescription = day.weather[0].description;
          const weatherState = mapDescriptionToState(weatherDescription);
          const weatherImage = stateOptions.find(
            (option) => option.state === weatherState
          )?.img;

          return (
            <div key={index} className="text-white mt-8">
              <div className="bg-[#1e213a] pt-4 px-5 mx-2 w-[120px] h-40 max-h-40 text-center">
                <h3 className="text-sm">
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </h3>
                <img
                  src={weatherImage}
                  alt={weatherDescription}
                  className="mt-1 pr-1 max-h-[60px]"
                />
                <div className="flex justify-between mt-4 text-center  ">
                  <p className="text-sm mt-2">
                    {Math.round(day.main.temp_max)}
                    {getUnitSymbol()}
                  </p>
                  <p className="text-sm mt-2 opacity-50 text-center">
                    {Math.round(day.main.temp_min)}
                    {getUnitSymbol()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FiveDays;
