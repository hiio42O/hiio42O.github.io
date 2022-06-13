// src/Main.js
// modules
import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// SVG
import HIIO420 from "./resources/images/common/HIIO420.svg";
import ABOUT from "./resources/images/common/ABOUT.svg";
import WORK from "./resources/images/common/WORK.svg";
import BLOG from "./resources/images/common/BLOG.svg";
import GITHUB from "./resources/images/common/GITHUB.svg";

import {
  FlexCenterLayout,
  FlexLayout,
  GridColumnLayout,
} from "./resources/globalStyle";
const MainWrapper = styled(FlexCenterLayout)`
  svg:hover path {
    fill: red;
  }
  @media screen and (max-width: 660px) {
    padding: 0 20px;
    width: calc(100% - 40px);
  }
`;
const Logo = styled(FlexCenterLayout)`
  grid-column: 1/5;

  @media screen and (max-width: 660px) {
    a,
    svg,
    div {
      width: 100%;
      height: 100%;
    }
  }
`;

const SvgWrapper = styled(FlexLayout)`
  @media screen and (max-width: 660px) {
    a {
      height: 65%;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const Main = () => {
  useEffect(() => {
    const svgs = document.querySelectorAll("svg");
    svgs.forEach((svg, i) => {
      svg.setAttribute(
        "viewBox",
        `0 0 ${svg.getAttribute("width")} ${svg.getAttribute("height")}`
      );
    });
  }, []);
  return (
    <MainWrapper>
      <GridColumnLayout>
        <Logo>
          <Link to="/">
            <HIIO420 />
          </Link>
        </Logo>
        <SvgWrapper>
          <Link to="/">
            <ABOUT />
          </Link>
        </SvgWrapper>
        <SvgWrapper justifyContent="center">
          <Link to="/">
            <WORK />
          </Link>
        </SvgWrapper>
        <SvgWrapper justifyContent="center">
          <a href="https://twentytwentyone.tistory.com" target="_blank">
            <BLOG />
          </a>
        </SvgWrapper>
        <SvgWrapper justifyContent="flex-end">
          <a
            href="https://github.com/hiio42O/hiio42O.github.io.git"
            target="_blank"
          >
            <GITHUB />
          </a>
        </SvgWrapper>
      </GridColumnLayout>
    </MainWrapper>
  );
};

export default Main;
