// src/pages/about/index.js

// modules
import React from "react";

// components
import Layout from "@components/layout";
import styled from "styled-components";

// img
import AboutImg from "@resources/images/about/Aboutimg.jpg";

const About = () => {
  return (
    <Layout>
      <AboutWrapper>
        <ImgWrapper>
          <img src={AboutImg} alt="about image" />
        </ImgWrapper>
        <DescWrapper>
          <div id="about-name">조훈창 : Cho Hun Chang</div>
          <div id="about-slogan">AweSome Things with My Ideas</div>
          <div id="about-skill">
            스킬
            <hr />
            <ul>
              <li>Python</li>
              <li>JAVA</li>
              <li>Javascript</li>
              <li>Deep Learning</li>
              <li>React</li>
              <li>Rust</li>
            </ul>
          </div>
        </DescWrapper>
      </AboutWrapper>
    </Layout>
  );
};

export default About;

const AboutWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 16px;
  @media screen and (max-width: 560px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Space = styled.div`
  width: 50%;
  max-width: 560px;
  display: flex;
  @media screen and (max-width: 560px) {
    width: calc(100% - 32px);
    padding: 0 16px;
  }
`;

const ImgWrapper = styled(Space)`
  justify-content: end;
  > img {
    max-width: 100%;
    max-height: 540px;
  }
`;

const DescWrapper = styled(Space)`
  height: 100%;
  max-height: 540px;
  flex-direction: column;
  gap: 16px;
  #about-name {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0 auto;
  }
  #about-slogan {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0 auto;
  }
  #about-slogan:before {
    content: '"';
  }
  #about-slogan:after {
    content: '"';
  }
  #about-skill {
    height: 100%;
    font-size: 1.4rem;
    ul {
      height: 100%;
      display: grid;
      column-gap: 16px;
      grid-template-columns: repeat(3, 1fr);
      li {
        height: 50%;
        min-height: 100px;
      }
    }
  }
`;
