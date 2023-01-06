// src/pages/work/index.js

// modules
import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// project
import Project from "@project";

// components

import { meta } from "@pages/work/meta";
import Meta from "@components/meta/Meta";

const Work = () => {
  const FilterdProject = Object.keys(Project)
    .filter((k) => !Object.keys(Project[k]).includes("default"))
    .reduce((o, k) => {
      o[k] = Project[k];
      return o;
    }, {});
  const ProjectListItems = Object.keys(FilterdProject).map((alpha, i) => {
    let path = `/work/${alpha}`;
    if (Object.keys(Project[alpha]).includes("default")) return null;
    return (
      <div id={alpha} className={i === 0 ? "selected" : ""} key={Math.random()}>
        <div className="project-list-title">
          <span>{alpha.toUpperCase()}</span>
        </div>
        <hr />
        <div className="project-list-item">
          {Object.keys(Project[alpha]).map((key) => {
            return (
              <Link to={`${path}/${key.toLowerCase()}`} key={Math.random()}>
                <span
                  style={{
                    backgroundColor: `rgba(
    ${randint(80, 130)},
    ${randint(80, 130)},
    ${randint(80, 130)},
    ${Math.random()}
  )`,
                  }}
                >
                  {key}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  });
  const ProjectNavigationItems = Object.keys(FilterdProject).map((alpha) => {
    return (
      <div
        onClick={() => {
          const target = document.getElementById(alpha);
          document
            .querySelectorAll(".selected")
            .forEach((el) => el.classList.remove("selected"));
          target.classList.add("selected");
          window.scrollTo({
            top:
              target.offsetTop -
              parseFloat(
                window
                  .getComputedStyle(document.querySelector("section"))
                  .padding.split(" ")[0]
              ),
          });
        }}
        key={Math.random()}
      >
        {alpha.toUpperCase()}
      </div>
    );
  });
  return (
    <WorkWrapper>
      <Meta data={meta} />
      <ProjectNavigation>{ProjectNavigationItems}</ProjectNavigation>
      <Title>Projects List</Title>
      <ProjectList>{ProjectListItems}</ProjectList>
    </WorkWrapper>
  );
};

export default Work;

const WorkWrapper = styled.div`
  position: relative;
`;
const ProjectNavigation = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 16px;
  top: 50%;
  transform: translate(0, -50%);
  align-items: center;
  gap: 2px;
  border-radius: 8px;
  padding: 4px;
  background-color: rgba(180, 180, 180, 0.3);
  cursor: pointer;
`;
const Space = styled.div`
  width: calc(100% - 120px);
  padding: 0 60px;
`;
const Title = styled(Space)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
`;
const ProjectList = styled(Space)`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .project-list-title {
    font-size: 1.8rem;
    font-weight: 600;
    padding: 4px 8px;
  }
  .project-list-item {
    font-size: 1.6rem;
    font-weight: 400;
    padding: 0 24px 24px 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .project-list-item > a > span {
    display: inline-block;
    padding: 8px;
    border-radius: 8px;
    color: black;
  }
  .selected {
    background-color: rgba(200, 200, 200, 0.1);
  }
`;

const randint = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
