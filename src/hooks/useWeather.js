import { useState, useEffect } from "react";

const API_KEY = "ee9f0e9a792c840e961da85a9d78a840";

export const useWeather = (selectedCity) => {
  const [locationData, setLocationData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherByCity(selectedCity);
      fetchFiveDayForecast(selectedCity);
    }
  }, [selectedCity]);

  const fetchWeatherByCity = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.error("Error al obtener la ubicación:", error));
  };

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
        console.error("Error al obtener el pronóstico de 5 días:", error)
      );
  };

  return { locationData, forecastData };
};
