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

  const [cartLengthCount, setCartLengthCount] = useState(null);

  
  const userId = userData && userData._id;

  const token = localStorage.getItem("sessionobject");

  
  const cartLength = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT_BACKEND}/cart/userCartLength`,
        {
          userId: userId,
        },
        {
          headers: {
            sessionobject: `${token}`, // Use token from userData
          },
        }
      );

      setCartLengthCount(response.data.cartItemLength);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(()=>{
    if(userId)
    {
      cartLength()
    }
  },[userId])

  useEffect(() => {
    if (cartLengthCount) {
      localStorage.setItem("cartlength", JSON.stringify(cartLengthCount))
    }else{
      localStorage.removeItem("cartlength");
    }
  },[cartLengthCount]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }else{
      localStorage.removeItem("user")
    }
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        cartLengthCount,
        setCartLengthCount,
        cartLength
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
