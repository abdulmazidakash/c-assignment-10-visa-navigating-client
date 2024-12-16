import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className=" p-10 text-center">
      <h1 className="text-center text-2xl font-semibold">404 Page Not Found</h1>
      <Link to="/" className="btn btn-accent my-10">
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;