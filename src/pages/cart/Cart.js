import React from "react";
import "./cart.scss";
import { IoIosArrowUp } from "react-icons/io";
const Cart = () => {
  return (
    <>
      <div className="cart-parent parent">
        <div className="cart-cont cont">
          <div className="menu">
            <p>Product</p>
            <p>Price</p>
            <p>Qantity</p>
            <p>Subtotal</p>
          </div>
          <div className="items menu">
            <div className="fristcol">
              <img src="" alt="" />
              <p>LCD monitor</p>
            </div>
            <p>$220</p>
            <div className="qantity">
              <div className="input">
                <div className="text">
                  <p>2</p>
                </div>
                <div className="arrow">
                  <span className="top">
                  <IoIosArrowUp />
                  </span>
                  <span className="down">
                  <IoIosArrowUp />
                  </span>
                </div>
              </div>
            </div>
            <p>$220</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
