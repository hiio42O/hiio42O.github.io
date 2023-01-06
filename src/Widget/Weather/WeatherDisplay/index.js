import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Icon from "./icon";
import "./weatherdisplay.css";
import { useWeather } from "./hooks.js";
const WeatherDisplay = () => {
  const itemRef = useRef();
  const [date, data] = useWeather({ day: 1 });
  useEffect(() => {
    const setWidth = () => {
      const p = itemRef.current.parentNode;
      const { clientWidth, clientHeight } = p;
      console.log(clientHeight,clientWidth)
      const size = clientHeight < clientWidth ? clientHeight : clientWidth;
      itemRef.current.width = size;
      itemRef.current.height = size;
    };
    setWidth();
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  useEffect(() => {
    console.log(data[date.DATE + date.CURTIME]);
  }, [data, date]);
  return (
    <div className="weather-display">
      <img src={Icon.cloudy} ref={itemRef}></img>
      <div style={{ fontSize: "10vw" }}>
        {`${String(date.y)}년 ${String(date.m)}월 ${String(date.d)}일`}
      </div>
      {data[date.DATE + date.CURTIME] !== undefined ? (
        <div style={{ fontSize: "10vw" }}>{`${
          data[date.DATE + date.CURTIME].TMP
        }℃`}</div>
      ) : null}
    </div>
  );
};

export default WeatherDisplay;
