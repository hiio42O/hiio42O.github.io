// App.js

// modules
import React, { Component, Fragment } from "react";
import { Routes, Route, useRoutes } from "react-router";

// css
import "@resources/css/app.css";

// Pages
import Main from "@pages/main";
import About from "@pages/about";
import Work from "@pages/work";
import projectModule from "@project";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Main />}></Route>
      <Route exact path="/about" element={<About />}></Route>
      <Route exact path="/work" element={<Work />}></Route>

      {Object.keys(projectModule).map((char) => {
        let path = `/work/${char}`;
        // let path = `/project/${char}/${key.toLowerCase()}`;
        const components = projectModule[char];
        return (
          <Fragment key={Math.random()}>
            {Object.keys(components).map((key) => {
              const ProjectComponent = components[key];
              path += `/${key.toLowerCase()}`;
              return (
                <Route
                  key={Math.random()}
                  exact
                  path={path}
                  element={<ProjectComponent />}
                />
              );
            })}
          </Fragment>
        );
      })}
    </Routes>
  );
};

export default App;
