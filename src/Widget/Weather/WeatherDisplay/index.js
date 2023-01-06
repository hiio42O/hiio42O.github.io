import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Icon from "./icon";
import "./weatherdisplay.css";
import {useWeather} from './hooks.js';
const WeatherDisplay = () => {
  const itemRef = useRef();
  const [date,data]= useWeather();
  useEffect(() => {
    const setWidth = () => {
      const p = itemRef.current.parentNode;
      const { clientWidth, clientHeight } = p;
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

  useEffect(()=>{
    console.log(data[date.DATE+date.CURTIME])
  },[data,date])
  return (
    <div className="weather-display">
      <img src={Icon.cloudy} ref={itemRef}></img>
    </div>
  );
};


export default WeatherDisplay;
