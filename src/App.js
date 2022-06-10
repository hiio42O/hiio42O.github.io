// App.js

// modules
import React from "react";
import { Routes, Route } from "react-router";

// css
import "./resources/css/app.css";

// Pages
import Main from "./Main";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Main />}></Route>
    </Routes>
  );
};

export default App;
