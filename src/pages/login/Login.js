import React, { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context";

const Login = () => {
  const navigate = useNavigate();

  const { setUserData } = useContext(UserContext);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

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
        setUserData(response.data.user.username);
        const accessToken = response.data.accessToken;
        localStorage.setItem("sessionobject", `Bearer ${accessToken}`);

        navigate("/");
      }
      console.log(response.data.messgae, "userLogin");
    } catch (error) {
      console.log(error, "error");
    }
  };
  console.log(loginDetails);

  console.log(process.env.REACT_APP_PORT_BACKEND);
  return (
    <div>
      <div className="signup">
        <div className="signup-parent parent">
          <div className="signup-cont">
            <div className="left bg-img-contain"></div>
            <div className="right">
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

                <input
                  type="password"
                  placeholder="Password"
                  value={loginDetails.password}
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    })
                  }
                />

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
