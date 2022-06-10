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

const FlexLayout = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
`;

const FlexCenterLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridColumnLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const Logo = styled(FlexCenterLayout)`
  grid-column: 1/5;
`;

const Main = () => {
  return (
    <FlexCenterLayout>
      <GridColumnLayout>
        <Logo>
          <Link to="/">
            <HIIO420 />
          </Link>
        </Logo>
        <FlexLayout>
          <Link to="/">
            <ABOUT />
          </Link>
        </FlexLayout>
        <FlexLayout justifyContent="center">
          <Link to="/">
            <WORK />
          </Link>
        </FlexLayout>
        <FlexLayout justifyContent="center">
          <a href="https://twentytwentyone.tistory.com" target="_blank">
            <BLOG />
          </a>
        </FlexLayout>
        <FlexLayout justifyContent="flex-end">
          <a
            href="https://github.com/hiio42O/hiio42O.github.io.git"
            target="_blank"
          >
            <GITHUB />
          </a>
        </FlexLayout>
      </GridColumnLayout>
    </FlexCenterLayout>
  );
};

export default Main;
