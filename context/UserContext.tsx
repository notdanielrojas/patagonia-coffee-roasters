"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  last_name: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split(".")[1])) as User;
        setUser(userInfo);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
