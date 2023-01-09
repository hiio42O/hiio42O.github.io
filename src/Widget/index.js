import React, { useState, Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import "./widget.css";
import WeatherDisplay from "./Weather/WeatherDisplay";

const Widget = () => {
  const itemRef = useRef([]);
  useEffect(() => {}, []);
  return (
    <div id="widget">
      <div className="widget-item" ref={(el) => (itemRef.current[0] = el)}>
        <Link to="/widget/weather">
          <WeatherDisplay />
        </Link>
      </div>
      <div
        className="widget-item"
        ref={(el) => (itemRef.current[1] = el)}
      ></div>
    </div>
  );
};

export default Widget;
