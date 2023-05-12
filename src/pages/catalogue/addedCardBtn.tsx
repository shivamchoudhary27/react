import React from "react";

const AddedCardBtn = ({ handleCartNavigate, counter }: any) => {
  return (
    <React.Fragment>
      <div onClick={handleCartNavigate}>
        <span className="cart-txt">Cart Added</span>
        <span className="fa-solid fa-cart-plus">
          <sup>{counter}</sup>
        </span>
      </div>
    </React.Fragment>
  );
};

export default AddedCardBtn;
