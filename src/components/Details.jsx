import React, { useEffect, useState } from "react";

const Details = ({ selectedCity }) => {
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    fetchHumidity(selectedCity);
  }, [selectedCity]);

  const fetchHumidity = (city) => {
    const API_KEY = "ee9f0e9a792c840e961da85a9d78a840";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const humidityData = data.main.humidity;
        setHumidity(humidityData);
      })
      .catch((error) => console.error("Error al obtener la humedad:", error));
  };

  return (
    <div className="text-white  bg-[#1e213a] p-3 px-[50px] pb-8 w-[300px] text-center ">
      <h4 className="">Humidity</h4>
      <div className="text-4xl mt-2">{humidity}%</div>
      <div className="flex justify-between mt-4">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <div className="w-full bg-white h-3 rounded-lg ">
        <div
          className="bg-[#ffec65] h-3 rounded-lg"
          style={{ width: `${humidity}%` }}
        ></div>
        <span className="flex justify-end">%</span>
      </div>
    </div>
  );
};

export default Details;
