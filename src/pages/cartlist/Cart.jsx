import React from 'react'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

    // Navigate to cart page === >>
  const handleCartNavigate = () => {
    navigate("/cart");
  }
  return (
    <>
        <li>
            <i className="fa-solid fa-cart-plus search-icon" onClick={handleCartNavigate}></i><sup>0</sup>
        </li>
    </>
  )
}

  export default Cart;