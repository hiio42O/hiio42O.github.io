// src/App.js

// modules
import React, { Fragment } from "react";
import { Routes, Route } from "react-router";

// css
import "@resources/css/app.css";

// Pages
import Main from "@pages/main";
import About from "@pages/about";
import Work from "@pages/work";

// components
import Layout from "@components/layout";

// project
import Project from "@project";
// Widget
import Widget from "@Widget";
import Weather from "@Widget/Weather";
import WeatherDisplay from "@Widget/Weather/WeatherDisplay";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Main />}></Route>
      <Route
        exact
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      ></Route>
      <Route
        exact
        path="/work"
        element={
          <Layout>
            <Work />
          </Layout>
        }
      ></Route>

      {Object.keys(Project).map((alphabet) => {
        let path = `/work/${alphabet}`;
        const components = Project[alphabet];
        if (Object.keys(Project[alphabet]).includes("default")) return null;
        return (
          <Fragment key={Math.random()}>
            {Object.keys(components).map((name) => {
              const ProjectComponent = components[name];
              path += `/${name.toLowerCase()}`;
              return (
                <Route
                  key={Math.random()}
                  exact
                  path={path}
                  element={
                    <Layout>
                      <ProjectComponent />
                    </Layout>
                  }
                />
              );
            })}
          </Fragment>
        );
      })}
      <Route
        path="/widget"
        element={
          <Layout>
            <Widget />
          </Layout>
        }
      ></Route>
      <Route
        path="/widget/weather"
        element={
          <Layout>
            <Weather />
          </Layout>
        }
      ></Route>
      <Route
        path="/widget/weather/display"
        element={<WeatherDisplay />}
      ></Route>
    </Routes>
  );
};

export default App;
