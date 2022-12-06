import React from "react";
// import { propTypes } from 'react-bootstrap/esm/Image';
function CourseCat(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h3>{`${props.title} ${props.count}`}</h3>
      </div>
    </div>
  );
}
export default CourseCat;
