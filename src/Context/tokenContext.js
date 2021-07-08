import { useState } from "react";
import { createContext } from "react";

export const TokenContext = createContext("");

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
