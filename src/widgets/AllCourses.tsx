import React from "react";
function Allcoursecomp(props: { title: string; }) {
  return (
    <div className="card">
      <div className="card-body">
        <h3>{`${props.title}`}</h3>
      </div>
    </div>
  );
}
export default Allcoursecomp;
