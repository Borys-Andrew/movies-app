import React, { createContext, ReactNode, useState } from "react";
import { useAuth } from "../hooks/useAuth";

type AuthContextTypes = {
  userName: string | undefined;
  userId: string | undefined;
  isAuth: boolean;
  setUser: React.Dispatch<
    React.SetStateAction<{
      userName: string | undefined;
      userId: string | undefined;
      isAuth: boolean;
    }>
  >;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextTypes>({
  userName: undefined,
  userId: undefined,
  isAuth: false,
  setUser: () => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, setUser, logout } = useAuth();

  const value = {
    ...user,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
