import React, { useState, useEffect } from "react";
import Search from "./Search";

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

const CurrentDefault = ({ onCitySelect, selectedCity, units, toggleUnits }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    fetchWeatherByCity(selectedCity);
  }, [selectedCity, units]);

  const fetchWeatherByCity = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.error("Error al obtener la ubicación:", error));
  };

  const fetchWeatherByLocation = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data);
        onCitySelect(data.name);
      })
      .catch((error) => console.error("Error al obtener el clima:", error));
  };

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
    onCitySelect(city);
    setShowSearch(false);
  };

  const getUnitSymbol = () => (units === "metric" ? "°C" : "°F");

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
    <div className="ml-3 h-full w-full ">
      {showSearch ? (
        <Search
          onClose={() => setShowSearch(false)}
          onCitySelect={handleCitySelect}
        />
      ) : (
        <>
          <div className="flex flex-col h-full">
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
            <div className="flex flex-col justify-center items-center ">
              <div className="flex mt-4 relative justify-center items-center flex-grow">
                <figure className="relative">
                  <img
                    src="/Cloud-background.png"
                    alt=""
                    className="w-full h-auto opacity-30 "
                    style={{ filter: "invert(50%) brightness(70%)" }}
                  />
                </figure>

                <section className="absolute inset-0 flex justify-center items-center ">
                  {weatherIcon && (
                    <img
                      src={weatherIcon}
                      alt={weatherDescription}
                      className="w-40"
                    />
                  )}
                </section>
              </div>

              <section className="flex flex-col justify-center items-center">
                <h2 className="text-6xl mt-8 ml-[12px] xl:ml-3 ">
                  {temperature}
                  <span className="text-[#88869d]">{getUnitSymbol()}</span>
                </h2>
                <h3 className="text-3xl capitalize mt-6 mb-4 text-[#88869d] sm:px-[5px] ">
                  {weatherDescription}
                </h3>
              </section>

              <div className="mt-8 text-center mb-6">
                <span className="block text-[#88869d]">{`Today - ${date}`}</span>
                <div className="flex justify-center items-center text-[#88869d] mt-4">
                  <img src="/ubicacion.png" alt="" className="w-7 mr-2" />
                  {location}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentDefault;
