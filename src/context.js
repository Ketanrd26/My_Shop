import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userSet = localStorage.getItem("user");
    if (userSet) {
      setUserData(JSON.parse(userSet));
    }
  }, []);

  const userId = userData && userData._id;
  const token = localStorage.getItem("sessionobject");
  const [cartLengthCount, setCartLengthCount] = useState(null);

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

      if (response.data.cartItemLength > 0) {
        setCartLengthCount(response.data.cartItemLength);
      } else {
        setCartLengthCount(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cartLength) {
      localStorage.setItem("cartItem", JSON.stringify(cartLength));
    }
  }, [cartLength]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        cartLengthCount,
        setCartLengthCount,
        cartLength,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
