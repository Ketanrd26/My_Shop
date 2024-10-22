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

  const [productId, setProductId] = useState([]);
  const [filterProduct, setFilterProduct] = useState(null);





  // Handle increasing the quantity
  const increaseQuantity = (id) => {
    setFilterProduct((prevState) =>
      prevState.map((product) =>
        product._id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Handle decreasing the quantity, ensuring it doesn't go below 1
  const decreaseQuantity = (id) => {
    setFilterProduct((prevState) =>
      prevState.map((product) =>
        product._id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  console.log(productId);






  const deleteCart = async (id)=>{
  try {
    const resposne = await axios.delete(`${process.env.REACT_APP_PORT_BACKEND}/cart/deleteCart/${id}`,{
      
      headers:{
        sessionobject:`${token}`
      }
    },
  );

    console.log("sucess", resposne)
  } catch (error) {
    console.log(error)
  }
  }

  return (
    <>
      <div className="cart-parent parent">
        <div className="cart-cont cont">
          <div className="menu">
            <p>Product</p>
            <p>Price</p>
            <p>Qantity</p>
            <p>Subtotal</p>
            <p>Delete Cart</p>
          </div>
          {filterProduct &&
            filterProduct.map((item, index) => (
              <div className="items menu" key={index}>
                <div className="fristcol">
                  <img
                    src={`${item.img}`}
                    alt=""
                  />
                  <p>{item.title}</p>
                </div>
                <p className="price">$ {item.price}</p>
                <div className="qantity">
                  <div className="input">
                    <div className="text">
                      <p>{item.quantity}</p> {/* Use the quantity here */}
                    </div>
                    <div className="arrow">
                      <span className="top">
                        <IoIosArrowUp
                          onClick={() => increaseQuantity(item._id)}
                        />
                      </span>
                      <span className="down">
                        <IoIosArrowUp
                          onClick={() => decreaseQuantity(item._id)}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <p className="fullamount">${item.price * item.quantity}


               
                </p>
                <span className="deleticon" onClick={()=>deleteCart(item._id)} >
                  <MdDeleteOutline />
                  </span>
              </div>
            ))}
        </div>

        <div className="bottom-cont cont">
          <div className="left"></div>
          <div className="right">
            <h5>Card total</h5>

            <div className="subtotal">
              <p>subtotal</p>
              <p>$750</p>
            </div>
            <div className="subtotal">
              <p>shipping</p>
              <p>free</p>
            </div>
            <div className="subtotal">
              <p>total</p>
              <p>$750</p>
            </div>
            <div className="btn">
              Procces To Checkout
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
