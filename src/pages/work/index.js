// src/pages/work/index.js

// modules
import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

// project
import Project from "@project";
import styled from "styled-components";

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
                <span>{key}</span>
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
    font-size: 1.8rme;
    font-weight: 600;
    padding: 4px 8px;
  }
  .project-list-item {
    font-size: 1.6rme;
    font-weight: 400;
    padding: 0 24px 24px 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .selected {
    background-color: rgba(150, 150, 150, 0.1);
  }
`;
