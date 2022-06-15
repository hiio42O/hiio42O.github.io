// src/components/layout/index.js

// modules
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// components
import Header from "@components/header";

const Section = styled.section`
  width: 100%;
  height: ${(props) =>
    props.height ? `calc(100% - ${props.height}px)` : "100%"};
`;

const Layout = ({ children }) => {
  const [sectionHeight, setSectionHeight] = useState(96);
  useEffect(() => {
    const resizeSectionHeight = () => {
      const header = document.querySelector("header");
      const headerH = header.clientHeight;
      setSectionHeight(headerH);
    };
    window.addEventListener("resize", resizeSectionHeight);
    return () => {
      window.removeEventListener("resize", resizeSectionHeight);
    };
  }, []);
  return (
    <>
      <Header />
      <Section height={sectionHeight}>{children}</Section>
    </>
  );
};

export default Layout;
