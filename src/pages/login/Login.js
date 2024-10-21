import React, { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import cartoon from "../../assest/cartoon face.png";
import cartoonHide from "../../assest/cartoon hide face.png";
const Login = () => {
  const navigate = useNavigate();

  const [hidePass, setHidePass] = useState(false);
  const { setUserData } = useContext(UserContext);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

const token = localStorage.getItem("sessionobject")
  const loginUser = async (e) => {
    e.preventDefault();
    console.log("click");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT_BACKEND}/auth/login`,
        {
          ...loginDetails,
        }
      );
      if (response.data.messgae === "login succesfully") {
        setLoginDetails({
          username: "",
          password: "",
        });
        setUserData(response.data.user);
        const accessToken = response.data.accessToken;
        localStorage.setItem("sessionobject", `Bearer ${accessToken}`);

        navigate("/");
      }

      setTimeout(() => {
        localStorage.removeItem("sessionobject", `Bearer ${token}`);
      }, 60 * 60 * 1000);
      console.log(response.data.messgae, "userLogin");
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <div>
      <div className="signup">
        <div className="signup-parent parent">
          <div className="signup-cont">
            <div className="left bg-img-contain"></div>
            <div className="right">
            <div className="top">
                {hidePass ? (
                  <img src={cartoon} alt="" />
                ) : (
                  <img src={cartoonHide} alt="" />
                )}
              </div>
              <div className="top">
                <h4>Log in to Exclusive</h4>
                <p>Enter your details below</p>
              </div>
              <form action="" onSubmit={loginUser}>
                <input
                  type="text"
                  placeholder="username"
                  value={loginDetails.username}
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      username: e.target.value,
                    })
                  }
                />

<div className="password">
                  <input
                    type={!hidePass ? "password" : "text"}
                    placeholder="Password"
                    value={loginDetails.password}
                    onChange={(e) =>
                      setLoginDetails({
                        ...loginDetails,
                        password: e.target.value,
                      })
                    }
                  />

                  <span className="eye" onClick={() => setHidePass(!hidePass)}>
                    {hidePass ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <div className="bottom">
                  <button type="submit">Log in</button>
                  <Link>Forgot Password ?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
