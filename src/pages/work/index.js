// src/pages/work/index.js

// modules
import React, { Fragment } from "react";
// components
import Layout from "@components/layout";

import projectModule from "@project";
import { Link } from "react-router-dom";

const ProjectList = Object.keys(projectModule).map((alpha) => {
  let path = `/work/${alpha}`;
  return (
    <Fragment key={Math.random()}>
      <div>
        <span>{alpha.toUpperCase()}</span>
      </div>
      {Object.keys(projectModule[alpha]).map((key) => {
        if (key === "default") return <span key={Math.random()}>{key}</span>;
        return (
          <Link to={`${path}/${key.toLowerCase()}`} key={Math.random()}>
            <span>{key}</span>
          </Link>
        );
      })}
    </Fragment>
  );
});
const Work = () => {
  return <Layout>{ProjectList}</Layout>;
};

export default Work;
