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
    }
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        cartLengthCount,
        setCartLengthCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
