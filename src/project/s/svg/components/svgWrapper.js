import React, { useRef, useEffect } from "react";

const SvgWrapper = ({ children }) => {
  const svgRef = useRef();
  useEffect(() => {
    const setViewBox = () => {
      const w = svgRef.current.getBoundingClientRect().width;
      const h = svgRef.current.clientHeight;
      svgRef.current.setAttribute(
        "viewBox",
        `0 0 ${parseFloat(w)} ${parseFloat(h)}`
      );
    };
    setViewBox();
    window.addEventListener("resize", setViewBox);

    return () => {
      window.removeEventListener("resize", setViewBox);
    };
  }, [children]);
  return (
    <svg width="100%" height="100%" ref={svgRef}>
      {children}
    </svg>
  );
};

export default SvgWrapper;
