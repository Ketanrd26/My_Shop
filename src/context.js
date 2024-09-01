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

 
  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  }, [userData]); 

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
