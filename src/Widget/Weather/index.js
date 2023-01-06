import React from "react";
import WeatherDisplay from "@Widget/Weather/WeatherDisplay";
const Weather = () => {
  return (
    <div className="widget-item">
      <div>
        <WeatherDisplay />
      </div>
    </div>
  );
};

export default Weather;
