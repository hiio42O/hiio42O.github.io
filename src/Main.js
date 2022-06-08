// src/Main.js
// modules
import React, { useEffect } from "react";

// SVG
import HIIO420 from "./resources/images/common/HIIO420.svg";
import ABOUT from "./resources/images/common/ABOUT.svg";
import WORK from "./resources/images/common/WORK.svg";
import BLOG from "./resources/images/common/BLOG.svg";
import GITHUB from "./resources/images/common/GITHUB.svg";

const Main = () => {
  return (
    <>
      <HIIO420 />
      <ABOUT />
      <WORK />
      <BLOG />
      <GITHUB />
    </>
  );
};

export default Main;
