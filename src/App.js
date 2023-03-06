import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./utils/fcm";
import { getToken } from "firebase/messaging";
import messaging from "./utils/fcm";
function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    getToken(messaging, {
      vapidKey:
        "BD8mJ8xCqap4NyEeS6Ft_NAhyEaMQ4fM9gr6fcGHDOtGV5Q68MUhzdfybGzEF8N61qrpel_CSfO7Cm7nF6kUeDw",
    }).then((r) => setToken(r));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{token}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
