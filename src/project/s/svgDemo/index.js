// modules
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { SvgWrapper, Text, Arc } from "@project/s/svgDemo/components";
import Meta from "@components/meta/Meta.js";
import { meta } from "@project/s/svgDemo/meta.js";
const SvgPractice = () => {
  const [strokeDashOffset, setStrokeDashOffset] = useState(0);
  const [strokeDashArray, setStrokeDashArray] = useState(1000);
  const [animate, setAnimate] = useState(true);
  const [text, setText] = useState({
    x: 0,
    y: 0,
    text: "test",
    options: {
      textAnchor: "middle",
      alignmentBaseline: "middle",
      fill: "black",
      fontSize: "18",
    },
  });
  const [arc, setArc] = useState({
    cx: 0,
    cy: 0,
    r: 0,
    startDeg: 0,
    endDeg: 270,
  });
  useEffect(() => {
    const init = () => {
      const target = document.querySelector("#arc1").parentNode;
      setArc((p) => {
        return {
          ...p,
          cx: target.clientWidth / 2,
          cy: target.clientHeight / 2,
          r:
            target.clientWidth > target.clientHeight
              ? target.clientHeight / 3
              : target.clientWidth / 3,
        };
      });
      setText((p) => {
        return {
          ...p,
          x: target.clientWidth / 2,
          y: target.clientHeight / 2,
        };
      });
    };
    init();
    window.addEventListener("resize", init);
  }, []);
  return (
    <>
      <Meta data={meta} />
      <StyledSvgWrapper
        strokeDashOffset={strokeDashOffset}
        strokeDashArray={strokeDashArray}
        animate={animate}
      >
        <SvgWrapper>
          <Arc
            cx={arc.cx}
            cy={arc.cy}
            r={arc.r}
            startDeg={arc.startDeg}
            endDeg={arc.endDeg}
            className="arc"
            id="arc1"
          />
        </SvgWrapper>
        <InputWrapper>
          <div className="content-title">Arc 그리기</div>
          <div>
            <label>시작 각도 </label>
            <input
              type="range"
              min="0"
              max={arc.endDeg}
              value={arc.startDeg}
              onChange={(e) =>
                setArc((p) => ({ ...p, startDeg: e.target.value }))
              }
            />
            <label>값:{arc.startDeg}</label>
          </div>
          <div>
            <label>끝 각도 </label>
            <input
              type="range"
              min={arc.startDeg}
              max="359"
              value={arc.endDeg}
              onChange={(e) =>
                setArc((p) => ({ ...p, endDeg: e.target.value }))
              }
            />
            <label>값:{arc.endDeg}</label>
          </div>
          <div>
            <label>Stroke-dashoffset </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={strokeDashOffset}
              onChange={(e) => setStrokeDashOffset(e.target.value)}
            />
            <label>값:{strokeDashOffset}</label>
          </div>
          <div>
            <label>Stroke-dasharray </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={strokeDashArray}
              onChange={(e) => setStrokeDashArray(e.target.value)}
            />
            <label>값:{strokeDashArray}</label>
          </div>
        </InputWrapper>
      </StyledSvgWrapper>
      <StyledSvgWrapper
        strokeDashOffset={strokeDashOffset}
        strokeDashArray={strokeDashArray}
        animate={animate}
      >
        <SvgWrapper>
          <Text x={text.x} y={text.y} config={text.options}>
            {text.text}
          </Text>
          <rect x={text.x} y={0} width={1} height={300} fill="#aaa" />
          <rect x={0} y={text.y} width={"100%"} height={1} fill="#aaa" />
        </SvgWrapper>
        <InputWrapper>
          <div className="content-title">Text 그리기</div>

          <div>
            <label>Text 변경 </label>
            <textarea
              value={text.text}
              onChange={(e) => setText((p) => ({ ...p, text: e.target.value }))}
            />
          </div>
          <div>
            <label>Text Font Size</label>
            <input
              type="range"
              min="10"
              max="300"
              value={text.options.fontSize}
              onChange={(e) =>
                setText((p) => ({
                  ...p,
                  options: { ...p.options, fontSize: e.target.value },
                }))
              }
            />
            <label>값:{text.options.fontSize}</label>
          </div>
          <div>
            <label>Text Anchor</label>
            <div className="button-wrapper">
              <button
                onClick={(e) =>
                  setText((p) => ({
                    ...p,
                    options: { ...p.options, textAnchor: e.target.innerText },
                  }))
                }
              >
                start
              </button>
              <button
                onClick={(e) =>
                  setText((p) => ({
                    ...p,
                    options: { ...p.options, textAnchor: e.target.innerText },
                  }))
                }
              >
                middle
              </button>
              <button
                onClick={(e) =>
                  setText((p) => ({
                    ...p,
                    options: { ...p.options, textAnchor: e.target.innerText },
                  }))
                }
              >
                end
              </button>
            </div>
          </div>
          <div>
            <label>Alignment Baseline</label>
            <div className="button-wrapper">
              <button
                onClick={(e) =>
                  setText((p) => ({
                    ...p,
                    options: {
                      ...p.options,
                      alignmentBaseline: e.target.innerText,
                    },
                  }))
                }
              >
                hanging
              </button>
              <button
                onClick={(e) =>
                  setText((p) => ({
                    ...p,
                    options: {
                      ...p.options,
                      alignmentBaseline: e.target.innerText,
                    },
                  }))
                }
              >
                middle
              </button>
              <button
                onClick={(e) =>
                  setText((p) => ({
                    ...p,
                    options: {
                      ...p.options,
                      alignmentBaseline: e.target.innerText,
                    },
                  }))
                }
              >
                baseline
              </button>
            </div>
          </div>
        </InputWrapper>
      </StyledSvgWrapper>
    </>
  );
};

export default SvgPractice;

const StyledSvgWrapper = styled.div`
  width: calc(100% - 32px);
  padding: 0 16px;
  height: 300px;
  display: flex;
  svg > path {
    stroke-dashoffset: ${(props) => {
      return props.strokeDashOffset ? props.strokeDashOffset : 0;
    }};
    stroke-dasharray: ${(props) => {
      return props.strokeDashArray ? props.strokeDashArray : 1000;
    }};
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
      stroke-dasharray: 0;
    }
    to {
      stroke-dashoffset: 0;
      stroke-dasharray: 1000;
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-right: 10%;
  // height: 300px;
  gap: 16px;
  justify-content: center;
  > div {
    width: calc(100% - 16px);
    margin-right: 16px;
    > label {
      font-size: 1.4rem;
    }
    > input,
    > textarea {
      padding: 0;
      margin: 0;
      width: 100%;
    }
  }
  > .content-title {
    font-size: 2rem;
    font-weight: 700;
  }
  > div > .button-wrapper {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
    > button {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 560px) {
    width: 50%;
    margin: 0;
  }
`;
