import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // this will import the minified version of css. we have confiured webpack to handle css also so this will bundle up the css also.
//web pack will bundle this css and inject the reference of this bundled css into our index.html file.

import App from "./components/App";
import "./index.css";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
