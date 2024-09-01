import React, { useState } from "react";
import "./sign.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Sign = () => {
  const navgiation = useNavigate();
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
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
                <h4>Create an account</h4>
                <p>Enter your details below</p>
              </div>
              <form action="" onSubmit={signUp}>
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
                <input
                  type="password"
                  placeholder="Password"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      password: e.target.value,
                    })
                  }
                />
          
                
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
