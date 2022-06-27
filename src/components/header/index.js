// src/components/header/index.js

// modules
import React from "react";
import styled from "styled-components";

// components
import Nav from "@components/nav";
import { FlexLayout } from "@resources/globalStyle";

const Header = () => {
  return (
    <HeaderLayout>
      <Nav />
    </HeaderLayout>
  );
};

export default Header;
const HeaderLayout = styled(FlexLayout).attrs({
  as: "header",
})`
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  backdrop-filter: blur(5px);
  @media screen and (max-width: 660px) {
    padding: 10px 20px;
  }
`;
