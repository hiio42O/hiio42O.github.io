// src/pages/main/index.js

// modules
import React from "react";
import styled from "styled-components";
import Nav from "@components/nav";
// SVG

import { FlexCenterLayout, GridColumnLayout } from "@resources/globalStyle";

const MainWrapper = styled(FlexCenterLayout)`
  > div {
    width: 100%;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  @media screen and (max-width: 660px) {
    padding: 0 20px;
    width: calc(100% - 40px);
  }
`;

const Main = () => {
  return (
    <MainWrapper>
      <div>
        <Nav />
      </div>
    </MainWrapper>
  );
};

export default Main;
