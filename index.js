// index.js
// modules
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

// Elements
const rootDomElement = document.getElementById("App");
const rootRenderElement = createRoot(rootDomElement);
const rootJsxElement = (
  <BrowserRouter>
    <div>test</div>
  </BrowserRouter>
);

// Rendering

if (rootDomElement.hasChildNodes()) {
  ReactDOM.hydrate(rootJsxElement, rootDomElement);
} else {
  rootRenderElement.render(rootJsxElement);
}
