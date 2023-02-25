import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Administration</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, velit.
      </p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
  );
}

export default HomePage;
