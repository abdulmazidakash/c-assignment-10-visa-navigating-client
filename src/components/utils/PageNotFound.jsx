import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="card p-10">
      <h1>404 Page Not Found</h1>
      <Link to="/" className="btn btn-warning my-10">
        Go back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;