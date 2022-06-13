// globalStyle.js

// modules
import styled from "styled-components";

export const FlexLayout = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
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
  row-gap: 16px;
`;
