import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const SESSION_KEY = "ticketapp_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(SESSION_KEY);
    if (token) setUser({ token });
  }, []);

  const login = ({ username }) => {
    const token = `${username}-${Date.now()}`;
    localStorage.setItem(SESSION_KEY, token);
    setUser({ username, token });
    return token;
  };

  const signup = ({ username }) => {
    // for demo: signup simply logs in user
    return login({ username });
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
