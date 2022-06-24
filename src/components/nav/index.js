// src/pages/main/index.js

// modules
import React, { Fragment, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// SVG
import HIIO420 from "@resources/images/common/HIIO420.svg";
import ABOUT from "@resources/images/common/ABOUT.svg";
import WORK from "@resources/images/common/WORK.svg";
import BLOG from "@resources/images/common/BLOG.svg";
import GITHUB from "@resources/images/common/GITHUB.svg";

import { FlexLayout, svgHover } from "@resources/globalStyle";

const SvgWrapper = styled(FlexLayout)`
  ${svgHover}
  a,
  div,
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Nav = () => {
  const { pathname } = window.location;
  const logoRef = useRef();
  const menuRef = useRef();
  useEffect(() => {
    const svgs = document.querySelectorAll("svg");
    svgs.forEach((svg, i) => {
      const width = svg.getAttribute("width");
      const height = svg.getAttribute("height");
      svg.setAttribute(
        "viewBox",
        `0 0 ${parseFloat(width)} ${parseFloat(height)}`
      );
    });
    if (pathname !== "/") {
      const logo = logoRef.current;
      menuRef.current.insertBefore(logo, menuRef.current.firstChild);
    }
  }, []);
  return (
    <Fragment>
      <SvgWrapper ref={logoRef}>
        <Link to="/">
          <HIIO420 />
        </Link>
      </SvgWrapper>
      <FlexLayout gap="32px" ref={menuRef}>
        <SvgWrapper>
          <Link to="/about">
            <ABOUT />
          </Link>
        </SvgWrapper>
        <SvgWrapper justifyContent="center">
          <Link to="/work">
            <WORK />
          </Link>
        </SvgWrapper>
        <SvgWrapper justifyContent="center">
          {/* <a href="https://twentytwentyone.tistory.com" target="_blank"> */}
          <a href="/project/linechart" target="_blank">
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
      </FlexLayout>
    </Fragment>
  );
};

export default Nav;
