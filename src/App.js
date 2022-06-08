// App.js

// modules
import React from "react";
import { Routes, Route } from "react-router";

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
