// index.js
// modules
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
// components
import App from "./src/App";
import rootReducer from "@Redux";
// Elements
const persistedState = window.localStorage.getItem("reduxState")
  ? JSON.parse(window.localStorage.getItem("reduxState"))
  : {};
const store = createStore(rootReducer, composeWithDevTools());
// store.subscribe(() => {
//   localStorage.setItem("reduxState", JSON.stringify(store.getState()));
// });
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
