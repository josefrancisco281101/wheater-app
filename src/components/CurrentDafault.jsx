// CurrentDefault.js
import React, { useState } from "react";
import Search from "./Search";
import useWeather from "../hooks/useWeather";

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

const CurrentDefault = () => {
  const [showSearch, setShowSearch] = useState(false);
  const {
    locationData,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    setSelectedCity,
  } = useWeather("London");

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowSearch(false);
    fetchWeatherByCity(city);
  };

  if (!locationData) return <p>Loading...</p>;

  const temperature = locationData.main.temp;
  const weatherDescription = locationData.weather[0].description;
  const date = new Date(locationData.dt * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const location = `${locationData.name}, ${locationData.sys.country}`;

  const weatherState = mapDescriptionToState(weatherDescription);
  const weatherIcon = stateOptions.find(
    (option) => option.state === weatherState
  )?.img;

  return (
    <div className="ml-3">
      {showSearch ? (
        <Search
          onClose={() => setShowSearch(false)}
          onCitySelect={handleCitySelect}
        />
      ) : (
        <>
          <div>
            <label htmlFor="search" className="">
              <div className="flex justify-between mx-2 text-white ">
                <input
                  type="search"
                  id="search"
                  placeholder="Search for places"
                  className="bg-[#6e707a] text-white text-center mt-8"
                  onClick={() => setShowSearch(true)}
                />
                <button
                  className="color-white mt-8 mx-4 bg-slate-700 rounded-full "
                  onClick={handleGetLocation}
                >
                  <img
                    src="/objetivo.png"
                    alt=""
                    className="w-8"
                    style={{ filter: "invert(100%) brightness(90%)" }}
                  />
                </button>
              </div>
            </label>
            <div className="flex flex-col justify-center items-center">
              <div className="flex mt-6 ">
                <figure className="relative">
                  <img
                    src="/Cloud-background.png"
                    alt=""
                    className="w-full h-auto opacity-30"
                    style={{ filter: "invert(50%) brightness(70%)" }}
                  />
                </figure>

                <section className="absolute inset-20 flex justify-center items-center w-[120px] h-20 mt-12 ml-8">
                  {weatherIcon && (
                    <img src={weatherIcon} alt={weatherDescription} />
                  )}
                </section>
              </div>

              <section>
                <h2 className="text-6xl mt-10 ml-3">
                  {temperature} <span className="text-[#88869d]">°C</span>
                </h2>
              </section>
              <h3 className="text-2xl capitalize mt-[60px] text-[#88869d] ml-3">
                {weatherDescription}
              </h3>

              <span className="block mt-20 text-[#88869d] ml-3">
                Today - {date}
              </span>
              <span className="flex mt-2 justify-between text-[#88869d] ml-3">
                <img src="/ubicacion.png" alt="" className="w-7" />
                {location}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentDefault;
