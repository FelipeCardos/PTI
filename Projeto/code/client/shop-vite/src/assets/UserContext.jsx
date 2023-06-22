import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [myUserVariable, setMyUserVariable] = useState(null);

  useEffect(() => {
    const getUserDataApi = async () => {
      try {
        let data = null;
        const response = await axios.get(
          "http://yourlocalshop.pt:3000/api/v1/auth/user",
          { withCredentials: true }
        );
        data = response.data;
        setMyUserVariable(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!myUserVariable) getUserDataApi();
  }, []);

  return (
    <UserContext.Provider value={{ myUserVariable, setMyUserVariable }}>
      {children}
    </UserContext.Provider>
  );
};
