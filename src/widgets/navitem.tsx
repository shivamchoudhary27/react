import React from 'react';
export default function NavLinkItem(props) {
  return (
    <>
      <i className={props.iconClass} />
      <span className={props.itemNameClass}>{props.itemName}</span>
    </>
  );
}
