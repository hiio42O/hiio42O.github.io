// src/components/header/index.js

// modules
import React from "react";
import styled from "styled-components";

// components
import Nav from "@components/nav";
import { FlexLayout } from "@resources/globalStyle";

const HeaderLayout = styled(FlexLayout).attrs({
  as: "header",
})`
  padding: 20px;
  @media screen and (max-width: 660px) {
    padding: 10px 20px;
  }
`;

const Header = () => {
  return (
    <HeaderLayout>
      <Nav />
    </HeaderLayout>
  );
};

export default Header;
