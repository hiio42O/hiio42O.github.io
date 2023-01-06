import React, { useState, Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import "./widget.css";

const Widget = () => {
  const itemRef = useRef([]);
  useEffect(() => {
    const setHeight = () => {
      itemRef.current.map((el) => {
        el.style.height = el.clientWidth + "px";
      });
    };
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, []);
  return (
    <div id="widget">
      <div className="widget-item" ref={(el) => (itemRef.current[0] = el)}>
        <Link to="/widget/weather">
          <Weather />
        </Link>
      </div>
      <div className="widget-item" ref={(el) => (itemRef.current[1] = el)}>
        g
      </div>
    </div>
  );
};

export default Widget;
