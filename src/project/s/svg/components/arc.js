import React, { useRef, useEffect } from "react";

const Arc = ({
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
}) => {
  const pathRef = useRef();

  return (
    <path
      className={className}
      id={id}
      ref={pathRef}
      d={getAttrD(cx, cy, r, startDeg, endDeg)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      // strokeDashoffset={strokeDashoffset}
      // strokeDasharray={strokeDasharray}
    >
      {/* {animate && (
        <animate
          attributeName="stroke-dashoffset"
          values={`${1 * Math.PI * r * 2};${(1 * Math.PI * r * 2) / 2};0`}
          dur="1s"
          repeatCount="indefinite"
        />
      )} */}
    </path>
  );
};

export default Arc;

function getPoint(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180.0;

  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function getAttrD(cx, cy, r, startDeg, endDeg) {
  const startPos = getPoint(cx, cy, r, startDeg);
  const endPos = getPoint(cx, cy, r, endDeg);
  const largeArcFlag = endDeg - startDeg > 180 ? 1 : 0;
  return `M${startPos.x},${startPos.y}A${r},${r},0,${largeArcFlag},1,${endPos.x},${endPos.y}`;
}
