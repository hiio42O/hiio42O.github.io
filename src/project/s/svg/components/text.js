import React from "react";

const Text = ({
  x,
  y,
  textAnchor = "middle",
  alignmentBaseline = "middle",
  children,
}) => {
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      alignmentBaseline={alignmentBaseline}
    >
      {children}
    </text>
  );
};

export default Text;
