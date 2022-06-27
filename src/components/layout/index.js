// src/components/layout/index.js

// modules
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// components
import Header from "@components/header";

const Section = styled.section`
  width: 100%;
  height: calc(100% - ${(props) => props.padding + "px"});
  padding: ${(props) => props.padding + "px"} 0 0 0;
  margin: 0;
`;

const Layout = ({ children }) => {
  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    const resizeSectionHeight = () => {
      const header = document.querySelector("header");
      const headerH = header.clientHeight;
      setSectionHeight(headerH);
    };
    resizeSectionHeight();
    window.addEventListener("resize", resizeSectionHeight);
    return () => {
      window.removeEventListener("resize", resizeSectionHeight);
    };
  }, []);
  return (
    <>
      <Header />
      <Section padding={sectionHeight}>{children}</Section>
    </>
  );
};

export default Layout;
