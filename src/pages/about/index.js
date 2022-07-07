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
import { metaSkillSet, meta } from "@pages/about/meta";

const About = () => {
  return (
    <AboutWrapper>
      <Meta data={meta} />
      <ImgWrapper>
        <img src={AboutImg} alt="about image" />
      </ImgWrapper>
      <DescWrapper>
        <div id="about-name">조훈창 : Cho Hun Chang</div>
        <div id="about-slogan">AweSome Things with My Ideas</div>
        <div id="about-skill">
          <ul>
            {metaSkillSet.map((skill) => {
              return (
                <li key={Math.random()}>
                  <SkillSetItem color={skill.color} per={skill.per}>
                    {skill.text}
                  </SkillSetItem>
                </li>
              );
            })}
          </ul>
        </div>
      </DescWrapper>
    </AboutWrapper>
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
    font-weight: 400;
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
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    font-weight: 400;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: calc(100% / 3);
        height: 160px;
      }
    }
  }
  @media screen and (max-width: 560px) {
    #about-skill {
      ul {
        li {
          height: 120px;
        }
      }
    }
  }
`;
