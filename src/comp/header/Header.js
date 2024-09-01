import React, { useContext } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
// icons

import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import  { UserContext } from "../../context";
const Header = () => {
  const { userData } = useContext(UserContext);
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
            <div className="cart">
              <FaShoppingCart />
            </div>
            <div className="profile">
              {/* <span>
                <IoMdPerson />
              </span> */}
              <h4>{userData}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
