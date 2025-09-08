import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { FormData, User } from "@/types/auth";
import { getUserSignUp, recoverUserInformation } from "@/services/auth";
import { api } from "@/services/api";

type ProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signUp: (data: FormData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      recoverUserInformation(token).then((response) => setUser(response));
    }
  }, []);

  const signUp = async ({ email, password }: FormData) => {
    const { token, user } = await getUserSignUp(email, password);

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1, //1 hora cookie salvo
    });

    api.defaults.headers["Authorization"] = `Bearer ${token} `;
    setUser(user);
    Router.push("/menu");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
