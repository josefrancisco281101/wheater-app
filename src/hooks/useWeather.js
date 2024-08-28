// useWeather.js
import { useState, useEffect } from "react";

const API_KEY = "ee9f0e9a792c840e961da85a9d78a840";

const useWeather = (initialCity) => {
  const [locationData, setLocationData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(initialCity);

  useEffect(() => {
    fetchWeatherByCity(selectedCity);
  }, [selectedCity]);

  const fetchWeatherByCity = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.error("Error al obtener la ubicación:", error));
  };

  const fetchWeatherByLocation = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data);
        setSelectedCity(data.name); // Actualizar ciudad seleccionada
      })
      .catch((error) => console.error("Error al obtener el clima:", error));
  };

  return { locationData, fetchWeatherByCity, fetchWeatherByLocation, setSelectedCity };
};

export default useWeather;
