import React, { useContext, useEffect, useState } from "react";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
// icons
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
// import { IoMdPerson } from "react-icons/io";
import { UserContext } from "../../context";
import axios from "axios";

const Header = () => {
  const { userData } = useContext(UserContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  const navs = [
    {
      path: "home",
      href: "/",
    },
    {
      path: "contact",
      href: "/contact",
    },
    {
      path: "about",
      href: "/about",
    },
    {
      path: "Sign Up",
      href: "/signup",
    },
  ];

  const logoutUser = () => {
    localStorage.removeItem("sessionobject");
    setUserData("");
    navigate("/");
    setCartLengthCount(null)

    // const logoutClass = document.getElementsByClassName("logout");

    // if (logoutClass) {
    //   logoutClass.style.display = "none";
    // }
  };

  const goToCart = () => {
    if (!userData) {
      alert("Please login first to access the cart");
    } else {
      navigate("/cart");
    }
  };

  const userId = userData && userData._id;
  const token = localStorage.getItem("sessionobject");
  const [cartLengthCount, setCartLengthCount] = useState(null);
  // cart length api

  const cartLength = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT_BACKEND}/cart/userCartLength`,
        {
          userId: userId,
        },
        {
          headers: {
            sessionobject: `${token}`,
          },
        }
      );

      if(response.data.cartItemLength > 0){
        setCartLengthCount(response.data.cartItemLength);
      }else{
        setCartLengthCount(null)
      }
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cartLength();
  }, [userData]);

  const [quantity,setQantity] = useState(null)

  return (
    <>
      <div className="header-parent parent">
        <div className="header-cont cont">
          <div className="logo">
            <h5>Logo</h5>
          </div>
          <div className="navs">
            {navs.map((item, index) => (
              <Link key={index} to={item.href}>
                {item.path}
              </Link>
            ))}
          </div>
          <div className="cart-likes">
            <div className="like">
              <CiHeart />
            </div>
            <div className="cart" onClick={goToCart}>
              <IoCartOutline />

              {cartLengthCount && (
                <span className="cartCount">{cartLengthCount}</span>
              )}
            </div>
            <div className="profile">
              {/* <span>
                <IoMdPerson />
              </span> */}
              {/* <h4>{user}</h4> */}
              <h4>{userData && userData.username}</h4>

              <div className="logout" onClick={() => logoutUser()}>
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
