import React from 'react';

export default function NavLinkItem (props) {
  return (
    <>
      <i className={props.iconClass}></i>
      <span className={props.itemNameClass}>{props.itemName}</span>
    </>
  );
}