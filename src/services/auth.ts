import { User } from "@/types/auth";
import { getApiClient } from "./axios";

const api = getApiClient();

export const getUserSignUp = async (email: string, password: string) => {
  const response = await api.post("/auth/signup", {
    email,
    password,
  });

  return response.data;
};

export const recoverUserInformation = async (token: string): Promise<User> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/validate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Não foi possível recuperar informações do usuário");
  }

  const data = await response.json();

  return data;
};
