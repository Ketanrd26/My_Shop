import React, { useContext, useEffect, useState } from "react";
import "./cart.scss";
import { IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import { UserContext } from "../../context";
const Cart = () => {
  const { userData } = useContext(UserContext);

  const userId = userData && userData._id;
  const token = localStorage.getItem("sessionobject");

  const [productId, setProductId] = useState([]);
  const [filterProduct, setFilterProduct] = useState(null);

  const userCartItem = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT_BACKEND}/cart/userCart/${userId}`,
        {
          headers: {
            sessionobject: `${token}`,
          },
        }
      );

      // Create an object to track product quantities
      const productQuantities = {};
      response.data.cartItem.forEach((item) => {
        const productId = item.products[0].productId;
        if (productQuantities[productId]) {
          productQuantities[productId] += 1;
        } else {
          productQuantities[productId] = 1;
        }
      });

      setProductId(productQuantities);
    } catch (error) {
      console.log(error);
    }
  };

  const cartproductFetch = async () => {
    try {
      const productResponse = await axios.get(
        `${process.env.REACT_APP_PORT_BACKEND}/product/productList`
      );

      const filteredProducts = productResponse.data.products
        .filter((item) => productId.hasOwnProperty(item._id))
        .map((item) => ({
          ...item,
          quantity: productId[item._id], 
        }));

      setFilterProduct(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };


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
  useEffect(() => {
    userCartItem();
  }, [userData]);

  useEffect(() => {
    cartproductFetch();
  }, [productId]);

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
          {filterProduct &&
            filterProduct.map((item, index) => (
              <div className="items menu" key={index}>
                <div className="fristcol">
                  <img
                    src={`${process.env.REACT_APP_PORT_BACKEND}/productImages/${item.img}`}
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
                        <IoIosArrowUp  onClick={() => increaseQuantity(item._id)}  />
                      </span>
                      <span className="down">
                        <IoIosArrowUp onClick={() => decreaseQuantity(item._id)} />
                      </span>
                    </div>
                  </div>
                </div>
                <p className="fullamount">${item.price * item.quantity}</p>
             
              </div>
            ))}
        </div>
      </div>
      
    </>
  );
};

export default Cart;
