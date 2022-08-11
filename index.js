// index.js
// modules
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

// components
import App from "./src/App";
import rootReducer from "@project/t/TodoList/components/reduxContainer";

// Elements
const store = createStore(rootReducer, composeWithDevTools());
const rootDomElement = document.getElementById("App");
const rootRenderElement = createRoot(rootDomElement);
const rootJsxElement = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// Rendering

if (rootDomElement.hasChildNodes()) {
  ReactDOM.hydrate(rootJsxElement, rootDomElement);
} else {
  rootRenderElement.render(rootJsxElement);
}
