// App.js

// modules
import React from "react";
import { Routes, Route } from "react-router";

// css
import "@resources/css/app.css";

// Pages
import Main from "@pages/main";
import About from "@pages/about";
import Work from "@pages/work";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Main />}></Route>
      <Route exact path="/about" element={<About />}></Route>
      <Route exact path="/work" element={<Work />}></Route>
    </Routes>
  );
};

export default App;
