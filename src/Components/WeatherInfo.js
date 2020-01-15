import React from "react";
import "../Styles/Weather.css";
import {WiCelsius} from 'react-icons/wi';

export default function WeatherInfo(props) {
  const { temp, humidity, desc, city } = props.data;
  return (
    <div>
      <React.Fragment>
        <h3 className='header-desc'>{desc}</h3>
        <div className="weather-data-flex">
        <div className="header-desc">
          <h4>City</h4>
          <p>{city}</p>
        </div>
        <div className="header-desc">
          <h4>Temparature</h4>
          <p>{temp}<WiCelsius/></p>
        </div>
        <div className="header-desc">
          <h4>Humidity</h4>
          <p>{humidity}%</p>
        </div>
        </div>
        
      </React.Fragment>
    </div>
  );
}
