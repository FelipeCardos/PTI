import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [myUserVariable, setMyUserVariable] = useState(null);

  useEffect(() => {
    const getUserDataApi = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/user",
          { withCredentials: true }
        );
        const data = response.data;
        setMyUserVariable(data.user);
      } catch (error) {
        // console.error(error);
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
