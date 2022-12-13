import React from "react";

export default function ErrorBox(props: {
  style: string | undefined;
  msg:
    | string
}) {
  return (
    <div className={props.style} role="alert">
      {props.msg}
    </div>
  );
}
