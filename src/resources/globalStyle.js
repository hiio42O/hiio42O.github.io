// globalStyle.js

// modules
import styled, { css } from "styled-components";

export const FlexLayout = styled.div`
  display: flex;
  flex-direction:${(props) => (props.direction ? props.direction : "row")}
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  gap: ${(props) => (props.gap ? props.gap : "0")};
`;

export const FlexCenterLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GridColumnLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const svgHover = css`
  svg:hover path {
    fill: red;
    stroke: red;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "2.4rem")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "700")};
`;

export const HLine = styled.div`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "1px")};
  background-color: ${(props) => (props.color ? props.color : "black")};
`;
