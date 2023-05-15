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
          "http://localhost:3000/api/v1/auth/user",
          { withCredentials: true }
        );
        const response2 = await axios.get(
          "http://localhost:3000/api/v1/users/" +
            response.data.user.id +
            "/credentials",
          { withCredentials: true }
        );
        data = {
          ...response.data.user,
          ["provider"]: response2.data.credentials.provider
            ? response2.data.credentials.provider
            : "local",
        };
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
