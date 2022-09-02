import React from 'react';

export default function ErrorBox(props) {
  return (
    <div className={props.style} role="alert">
      {props.msg}
    </div>
  );
}
