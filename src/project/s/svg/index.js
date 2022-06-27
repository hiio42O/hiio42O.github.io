import React from "react";

import Layout from "@components/layout";
import { SvgWrapper, Text, Arc } from "@project/s/svg/components";

import styled from "styled-components";
const SvgPractice = () => {
  return (
    <Layout>
      <StyledSvgWrapper>
        <SvgWrapper>
          <Arc
            cx={150}
            cy={150}
            r={100}
            startDeg={0}
            endDeg={280}
            className="arc"
            id="arc#1"
          />
          <Text x={150} y={150}>
            Test
          </Text>
        </SvgWrapper>
      </StyledSvgWrapper>
    </Layout>
  );
};

export default SvgPractice;

const StyledSvgWrapper = styled.div`
  width: 300px;
  height: 300px;
  svg > path {
    stroke-dashoffset: 0;
    stroke-dasharray: 1000;
    animation: svgStrokeProgress 3s;
  }
  svg > text {
    font-size: 1.2em;
    fill: #f1c164;
    animation: svgTextOpacity 3s;
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
`;
