import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "./weatherdisplay.css";
import { useWeather } from "./hooks.js";

const WeatherDisplay = ({ propPlaceNm }) => {
  const itemRef = useRef();
  const textRef = useRef();
  const [date, data, Icon, wString, placeNm, setPlaceNm] = useWeather({
    day: 1,
  });
  useEffect(() => {
    const setWidth = () => {
      let target = itemRef.current;
      const p = target.parentNode;
      const { clientWidth, clientHeight } = p;
      const size = clientHeight < clientWidth ? clientHeight : clientWidth;
      target.style.width = size + "px";
      target.style.height = size + "px";
      textRef.current.style.bottom = "10vh";
      const per = parseInt(target.style.width) / window.innerWidth;
      textRef.current.style.fontSize = per * 5 + "vw";
    };
    setWidth();
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  useEffect(() => {
    if (
      propPlaceNm !== undefined &&
      typeof propPlaceNm === "string" &&
      propPlaceNm.replace(/[\s]+/gi, "").length > 0
    ) {
      setPlaceNm(propPlaceNm);
    }
  }, [propPlaceNm]);
  useEffect(() => {}, [data, date]);
  return (
    <div className="weather-display">
      <div className="img-wrap">
        <img src={Icon} ref={itemRef}></img>
      </div>

      <div className="text-f" ref={textRef}>
        {placeNm}
        <br />
        {wString}
      </div>
    </div>
  );
};

export default WeatherDisplay;
