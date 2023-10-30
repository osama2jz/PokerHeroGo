import { createContext, useState } from "react";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  let userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({
    name: userData?.name,
    id: userData?.userId,
    email: userData?.email,
    accessToken: userData?.accessToken || true,
  });
  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
