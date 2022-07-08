// src\project\s\svg\components\arc.js
// modules
import React, { useRef, useEffect, useState, forwardRef } from "react";

const Arc = forwardRef(
  (
    {
      className = "",
      id = "",
      cx,
      cy,
      r,
      startDeg,
      endDeg,
      fill = "none",
      stroke = "#446688",
      strokeWidth = "2",
    },
    ref
  ) => {
    const pathRef = ref || useRef();
    const [d, setD] = useState("");
    useEffect(() => {
      setD(getAttrD(cx, cy, r, startDeg, endDeg));
    }, [cx, cy, r, startDeg, endDeg]);
    return (
      <path
        className={className}
        id={id}
        ref={pathRef}
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      ></path>
    );
  }
);

export default Arc;

const getPoint = (cx, cy, r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180.0;

  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const getAttrD = (cx, cy, r, startDeg, endDeg) => {
  const startPos = getPoint(cx, cy, r, startDeg);
  const endPos = getPoint(cx, cy, r, endDeg);
  const largeArcFlag = endDeg - startDeg > 180 ? 1 : 0;
  return `M${startPos.x},${startPos.y}A${r},${r},0,${largeArcFlag},1,${endPos.x},${endPos.y}`;
};
