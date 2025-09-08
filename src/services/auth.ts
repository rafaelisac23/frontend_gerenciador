import { FetchUser, User } from "@/types/auth";

export const getUserSignUp = async (
  email: string,
  password: string
): Promise<FetchUser> => {
  const response = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  return data;
};

export const recoverUserInformation = async (token: string): Promise<User> => {
  const response = await fetch("http://localhost:3000/api/auth/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível recuperar informações do usuário");
  }

  const data = await response.json();

  return data;
};
