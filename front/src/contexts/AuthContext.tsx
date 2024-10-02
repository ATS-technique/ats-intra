// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  login: (newToken: string, is_dark: boolean, name: string, id: number) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = (newToken: string, is_dark: boolean, name: string, id: number) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("name", name);
    localStorage.setItem("loggedUser", id.toString());
    localStorage.setItem("screenMode", is_dark ? "dark" : "light");
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
  };

  const isAuthenticated = !!token;

  return <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
