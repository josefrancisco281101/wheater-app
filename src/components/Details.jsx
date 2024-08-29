import React, { useEffect, useState } from "react";

const Details = ({ selectedCity }) => {
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const [windDirectionAbbr, setWindDirectionAbbr] = useState("");
  const [visibility, setVisibility] = useState(0);
  const [pressure, setPressure] = useState(0);

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const fetchWeatherData = (city) => {
    const API_KEY = "ee9f0e9a792c840e961da85a9d78a840";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const humidityData = data.main.humidity;
        const windSpeedData = data.wind.speed;
        const windSpeedMph = (windSpeedData * 3.6).toFixed(2);
        const windDirectionData = data.wind.deg;
        const visibilityData = (data.visibility / 1609.34).toFixed(2);
        const pressureData = data.main.pressure;
        setHumidity(humidityData);
        setWindSpeed(windSpeedMph);
        setWindDirection(windDirectionData);
        setWindDirectionAbbr(getWindDirectionAbbr(windDirectionData));
        setVisibility(visibilityData);
        setVisibility(visibilityData);
        setPressure(pressureData);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  };

  const getWindDirectionAbbr = (deg) => {
    if (deg > 337.5 || deg <= 22.5) return "N";
    if (deg > 22.5 && deg <= 67.5) return "NE";
    if (deg > 67.5 && deg <= 112.5) return "E";
    if (deg > 112.5 && deg <= 157.5) return "SE";
    if (deg > 157.5 && deg <= 202.5) return "S";
    if (deg > 202.5 && deg <= 247.5) return "SW";
    if (deg > 247.5 && deg <= 292.5) return "W";
    if (deg > 292.5 && deg <= 337.5) return "NW";
    return "";
  };

  return (
    <>
      <div className="">
        <div className="text-white mb-4 text-center flex justify-between mx-[65px]">
          <div className="bg-[#1e213a] p-4 px-5 pb-8 w-[300px]">
            <h4>Wind Status</h4>
            <div className="flex justify-center mt-2 items-center text-2xl">
              <div
                className="text-4xl font-bold relative"
                style={{ top: "-4px" }}
              >
                {windSpeed}
              </div>
              <span>mph</span>
            </div>
            <div className="flex justify-center mt-4">
              <img
                className="w-[24px] transform"
                src="/brujula-norte.png"
                alt="Wind Direction"
                style={{ transform: `rotate(${windDirection}deg)` }}
              />
              <h3 className="ml-2">{windDirectionAbbr}</h3>
            </div>
          </div>

          <div className="bg-[#1e213a] p-4 px-5 pb-8 w-[300px]">
            <h4>Humidity</h4>
            <div className="flex justify-center mt-2 items-center text-2xl">
              <div
                className="text-4xl font-bold relative"
                style={{ top: "-4px" }}
              >
                {humidity}
              </div>
              <span>%</span>
            </div>
            <div className="flex justify-between mt-4">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <div className="w-full bg-white h-2 rounded-lg">
              <div
                className="bg-[#ffec65] h-2 rounded-lg"
                style={{ width: `${humidity}%` }}
              ></div>
              <span className="flex justify-end opacity-70">%</span>
            </div>
          </div>
        </div>
        <div className="text-white mb-4 text-center flex justify-between mx-[65px]">
          <div className="bg-[#1e213a] p-4 px-5 pb-8 w-[300px]">
            <h4>Visibility</h4>
            <div className="flex justify-center mt-2 items-center text-2xl">
              <div
                className="text-4xl font-bold relative"
                style={{ top: "-4px" }}
              >
                {visibility}
              </div>
              <span>miles</span>
            </div>
          </div>

          <div className="bg-[#1e213a] p-4 px-5 pb-8 w-[300px] ">
            <h4>Air Pressure</h4>
            <div className="flex justify-center mt-2 items-center text-2xl">
              <div
                className="text-4xl font-bold relative"
                style={{ top: "-4px" }}
              >
                {pressure}
              </div>
              <span>mb</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
