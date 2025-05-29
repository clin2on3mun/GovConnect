import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../hooks/AuthHooks";

type User = {
  _id: string;
  email: string;
  role: string;
  name: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  isLoading: boolean;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        withCredentials: true,
      });
      console.log(res.data.user);
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUser, checkAuth, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
