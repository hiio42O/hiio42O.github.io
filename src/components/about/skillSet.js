// src>components/abpit/skillSet.js

// modules
import React, { useEffect, useState, useRef } from "react";
import { Arc, Text, SvgWrapper } from "@project/s/svg/components";

// components
import styled from "styled-components";

const SkillSetItem = ({ children, per, color }) => {
  const arcRef = useRef();
  const [arcProps, setArcProps] = useState({
    cx: 0,
    cy: 0,
    r: 0,
    startDeg: 0,
    endDeg: (359 * per) / 100 || 180,
    fill: "none",
    stroke: color || "#446688",
    strokeWidth: 6,
  });
  useEffect(() => {
    const init = () => {
      const { current } = arcRef;
      const target = current.parentNode;
      const w = target.clientWidth;
      const h = target.clientHeight;
      const r = w > h ? h / 2 - 10 : w / 2 - 10;

      setArcProps((p) => {
        return { ...p, cx: w / 2, cy: h / 2, r: r };
      });
    };
    init();
    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
    };
  }, []);
  return (
    <StyledSvgWrapper textColor={arcProps.stroke}>
      <SvgWrapper>
        <Arc
          cx={arcProps.cx}
          cy={arcProps.cy}
          r={arcProps.r}
          startDeg={arcProps.startDeg}
          endDeg={arcProps.endDeg}
          fill={arcProps.fill}
          stroke={arcProps.stroke}
          strokeWidth={arcProps.strokeWidth}
          ref={arcRef}
        ></Arc>
        <Text x={arcProps.cx} y={arcProps.cy}>
          {children}
        </Text>
      </SvgWrapper>
    </StyledSvgWrapper>
  );
};
export default SkillSetItem;

const StyledSvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  diplay: flex;
  justify-content: center;
  align-items: center;
  svg > path {
    stroke-dashoffset: 0;
    stroke-dasharray: 1000;
    animation: svgStrokeProgress 3s;
  }
  svg > text {
    font-size: 1.6rem;
    fill: ${(props) => (props.textColor ? props.textColor : "black")};
    animation: svgTextOpacity 4s;
  }

  svg:hover path {
    stroke-width: 8;
  }
  svg:hover text {
    animation: svgTextOpacity 4s;
  }

  @keyframes svgTextOpacity {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 1;
    }
  }
  @keyframes svgStrokeProgress {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  @media screen and (max-width: 560px) {
    svg > text {
      font-size: 1.2rem;
    }
  }
`;
