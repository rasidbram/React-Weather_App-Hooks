import React, { useState } from "react";
import "../Styles/Weather.css";
import { MdWbSunny } from "react-icons/md";
import WeatherInfo from "./WeatherInfo";

const WeatherContainer = () => {
  const API_KEY = "0ce1097ce0f77a8295ecd440f624cd01";
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState({
    temp: null,
    humidity: null,
    desc: null,
    city: null
  });

  let type = [];

  if (weatherData.desc === "Clouds") {
    type.push("Clouds");
  }
  if (weatherData.desc === "Rain") {
    type.push("Rain");
  }
  if (weatherData.desc === "Clear") {
    type.push("Clear");
  }
  if (weatherData.desc === "Mist") {
    type.push("Mist");
  }
  if (weatherData.desc === "Drizzle") {
    type.push("Drizzle");
  }

  const [isValidCityName, setIsValidCityName] = useState(true);

  function validateCityName(CityName) {
    let regex = /[A-Za-z0-9]/;
    return regex.test(CityName);
  }

  function handleSearchCode(e) {
    let isValid = validateCityName(e.target.value);
    setSearchQuery(e.target.value);

    if (isValid || e.target.value === "") {
      setIsValidCityName(true);
    } else {
      setIsValidCityName(false);
    }
  }

  function getWeatherData() {
    if (!isValidCityName || searchQuery === "") {
      return setIsValidCityName(false);
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery},uk&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then(data =>
        setWeatherData({
          temp: convertToCelcius(data.main.temp),
          humidity: data.main.humidity,
          desc: data.weather[0].main,
          city: data.name
        })
      );
  }
  function convertToCelcius(temp) {
    return (temp - 273.15).toFixed(0);
  }

  return (
    <div className={`weather-container weather-${type}`}>
      <header className="weather-header">
        <h3>Forecast UK</h3>
        <div>
          <input
            className="search-input"
            onChange={handleSearchCode}
            placeholder="City Name"
            value={searchQuery}
          />
          <button onClick={getWeatherData} className="material-icons">
            search
          </button>
        </div>
      </header>
      <p className="error">{isValidCityName ? null : "Invalid Post Code!"}</p>
      <div className="weather-info">
        {weatherData.temp === null ? (
          <p>
            No weather to display
            <MdWbSunny className="sun-icon" />
          </p>
        ) : (
          <WeatherInfo data={weatherData} />
        )}
      </div>
    </div>
  );
};

export default WeatherContainer;
