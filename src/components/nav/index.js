// modules
import React, { useState, Fragment, useEffect } from "react";

import "./nav.css";

const Nav = () => {
  const { pathname } = window.location;
  const [githubURL, setGithubURL] = useState(
    "https://github.com/hiio42O/hiio42O.github.io.git"
  );

  useEffect(() => {
    const matchedPathName = pathname.match(/\/work\/[\w]+\/[\w]+/g);
    if (matchedPathName && matchedPathName.length > 0) {
      setGithubURL(
        `https://github.com/hiio42O/hiio42O.github.io/tree/main/src/project/${matchedPathName[0].slice(
          6
        )}`
      );
    } else {
      setGithubURL("https://github.com/hiio42O/hiio42O.github.io.git");
    }
    return () => {
      setGithubURL("https://github.com/hiio42O/hiio42O.github.io.git");
    };
  }, [pathname]);
  return (
    <Fragment>
      <nav>
        <div>
          <a href="/">HIIO420</a>
        </div>
        <ul>
          <li>
            <a href="/about">ABOUT</a>
          </li>
          <li>
            <a href="/work">WORK</a>
          </li>
          <li>
            <a href="/widget">WIDGET</a>
          </li>
          <li>
            <a href="https://twentytwentyone.tistory.com" target="_blank">
              BLOG
            </a>
          </li>
          <li>
            <a id="github-link" href={githubURL} target="_blank">
              GITHUB
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Nav;
