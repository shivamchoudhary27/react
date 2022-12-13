import React from "react";

export default function NavLinkItem(props: {
  iconClass: string | undefined;
  itemNameClass: string | undefined;
  itemName:
    | string
    | number
    | null
    | undefined;
}) {
  return (
    <>
      <i className={props.iconClass} />
      <span className={props.itemNameClass}>{props.itemName}</span>
    </>
  );
}
