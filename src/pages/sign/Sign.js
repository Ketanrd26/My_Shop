import React, { useState } from "react";
import "./sign.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import cartoon from "../../assest/cartoon face.png";
import cartoonHide from "../../assest/cartoon hide face.png";
const Sign = () => {
  const navgiation = useNavigate();
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [hidePass, setHidePass] = useState(false);
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT_BACKEND}/auth/register`,
        {
          ...signUpData,
        }
      );
      if (response.data.message === "register successfully") {
        setSignUpData({
          username: "",
          email: "",
          password: "",
        });

        navgiation("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(process.env.REACT_APP_PORT_BACKEND);
  console.log(signUpData);
  return (
    <>
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
                <h4>Create an account</h4>
                <p>Enter your details below</p>
              </div>
              <form action="" onSubmit={signUp}>
               <div className="input-box">
               <input
                  type="text"
                  placeholder="username"
                  value={signUpData.username}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      username: e.target.value,
                    })
                  }

                  
                />
               </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      email: e.target.value,
                    })
                  }
                />
                <div className="password">
                  <input
                    type={!hidePass ? "password" : "text"}
                    placeholder="Password"
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        password: e.target.value,
                      })
                    }
                  />

                  <span className="eye" onClick={() => setHidePass(!hidePass)}>
                    {hidePass ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <button type="submit">Create An Account</button>
              </form>

              <p>
                Already have account?{" "}
                <span>
                  <Link to="/login">Log in</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign;
