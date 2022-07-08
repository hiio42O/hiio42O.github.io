// src\project\s\svg\components\text.js

// modules
import React, { useRef, forwardRef, useEffect, useState } from "react";

const Text = forwardRef(({ x, y, children, config = {} }, ref) => {
  const textRef = ref || useRef();
  const [options, setOptions] = useState({
    textAnchor: "middle",
    alignmentBaseline: "middle",
  });
  useEffect(() => {
    setOptions((p) => ({ ...p, ...config }));
  }, [config]);
  return (
    <text x={x} y={y} {...options} ref={textRef}>
      {children}
    </text>
  );
});

export default Text;
