import React from "react";
import { Link } from "react-router-dom";

const Courses = () => {

  return (
    <>
      <div className="text-center">
        <h1>Welcome to Course Page</h1>
        <Link to="/dashboard">Go back to dashboard</Link>
      </div>
    </>
  );
};

export default Courses;
