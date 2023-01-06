// src/pages/about/index.js

// modules
import React from "react";

// components
import styled from "styled-components";
import SkillSetItem from "@components/about/skillSet";
import Meta from "@components/meta/Meta";
// img
import AboutImg from "@resources/images/about/Aboutimg.jpg";

// meta
import {  meta } from "@pages/about/meta";
import "./about.css"
const About = () => {
  return (
    <div id="about">
      <Meta data={meta} />
      <div className="space-img">
        <img src={AboutImg} alt="about image" />
      </div>
      <div className="space-desc">
        <div id="about-name">조훈창 : Cho Hun Chang</div>
        <div id="about-slogan">"AweSome Things with My Ideas"</div>
      </div>
    </div>
  );
};

export default About;