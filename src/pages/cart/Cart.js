import React, { useContext, useEffect, useState } from "react";
import "./cart.scss";
import { IoIosArrowUp } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { UserContext } from "../../context";

const Cart = () => {
  const { userData } = useContext(UserContext);

  const userId = userData && userData._id;
  const token = localStorage.getItem("sessionobject");

  const [cartItem, setCartItem] = useState([]);

  // Fetch cart items from the backend
  const cartItemList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT_BACKEND}/cart/userCart/${userId}`,
        {
          headers: {
            sessionobject: `${token}`,
          },
        }
      );

      // Add quantity to each cart item (default to 1)
      const updatedCartItems = response.data.cartItem[0].products.map((item) => ({
        ...item,
        quantity: 1,
      }));

      setCartItem(updatedCartItems);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle increasing the quantity for a specific item
  const incrementQuantity = (index) => {
    const updatedItems = cartItem.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItem(updatedItems);
  };

  // Handle decreasing the quantity for a specific item (ensure it doesn't go below 1)
  const decrementQuantity = (index) => {
    const updatedItems = cartItem.map((item, i) =>
      i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItem(updatedItems);
  };

  useEffect(() => {
    cartItemList();
  }, [userId]);

  // Delete a cart item
  

  return (
    <>
      <div className="cart-parent parent">
        <div className="cart-cont cont">
          <div className="menu">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
            <p>Delete Cart</p>
          </div>
          {cartItem &&
            cartItem.map((item, index) => (
              <div className="items menu" key={index}>
                <div className="fristcol">
                  <img src={`${item.img}`} alt="" />
                  <p>{item.title}</p>
                </div>
                <p className="price">$ {item.price}</p>
                <div className="qantity">
                  <div className="input">
                    <div className="text">
                      <p>{item.quantity}</p>
                    </div>
                    <div className="arrow">
                      <span className="top">
                        <IoIosArrowUp onClick={() => incrementQuantity(index)} />
                      </span>
                      <span className="down">
                        <IoIosArrowUp onClick={() => decrementQuantity(index)} />
                      </span>
                    </div>
                  </div>
                </div>
                <p className="fullamount">${item.price * item.quantity}</p>
                <span className="deleticon" >
                  <MdDeleteOutline />
                </span>
              </div>
            ))}
        </div>

        <div className="bottom-cont cont">
          <div className="left"></div>
          <div className="right">
            <h5>Cart total</h5>
            <div className="subtotal">
              <p>Subtotal</p>
              <p>${cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            </div>
            <div className="subtotal">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="subtotal">
              <p>Total</p>
              <p>${cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            </div>
            <div className="btn">Proceed To Checkout</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
