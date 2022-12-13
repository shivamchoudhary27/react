import React from "react";

function Cards(props: {
  icon: string | undefined;
  title:
    | string
    | number
    | null
    | undefined;
}) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <img src={props.icon} height="24" width="24" alt="img" />{" "}
          {props.title}
        </h5>
      </div>
    </div>
  );
}
export default Cards;
