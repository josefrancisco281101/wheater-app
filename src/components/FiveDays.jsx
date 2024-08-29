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

const FiveDays = ({ selectedCity }) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (selectedCity) {
      fetchFiveDayForecast(selectedCity);
    }
  }, [selectedCity]);

  const fetchFiveDayForecast = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
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

  return (
    <div className="flex justify-center mt-2 mb-[150px] gap-3 ">
      {forecastData.map((day, index) => {
        const weatherDescription = day.weather[0].description;
        const weatherState = mapDescriptionToState(weatherDescription);
        const weatherImage = stateOptions.find(
          (option) => option.state === weatherState
        )?.img;

        return (
          <>
            <div
              className="
              text-white mt-20 
            "
            >
              <div
                key={index}
                className="bg-[#1e213a]  pt-4 px-5 mx-2  w-[120px] h-40 max-h-40 text-center  "
              >
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
                  className="mt-2 pr-1 "
                />
                <div className="flex justify-between mt-4">
                  <p className="text-sm mt-2">
                    {Math.round(day.main.temp_max)}°C
                  </p>
                  <p className="text-sm mt-2 opacity-50 text-center ">
                    {Math.round(day.main.temp_min)}°C
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default FiveDays;
