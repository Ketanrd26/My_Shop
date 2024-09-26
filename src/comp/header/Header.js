import React, { useContext } from "react";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
// icons

import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
// import { IoMdPerson } from "react-icons/io";
import { UserContext } from "../../context";
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
      href: "/",
    },
    {
      path: "about",
      href: "/",
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

    // const logoutClass = document.getElementsByClassName("logout");

    // if (logoutClass) {
    //   logoutClass.style.display = "none";
    // }
  };

  const goToCart = () => {
    if (!userData) {
      alert("Please login first to access the cart");
    } 
      else{
        navigate("/cart");
      }
    
  };

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
              <FaHeart />
            </div>
            <div className="cart" onClick={goToCart}>
              <FaShoppingCart />
            </div>
            <div className="profile">
              {/* <span>
                <IoMdPerson />
              </span> */}
              <h4>{userData}</h4>

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
