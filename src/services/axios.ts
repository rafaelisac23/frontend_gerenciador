import { parseCookies } from "nookies";
import axios from "axios";

export const getApiClient = (ctx?: any) => {
  const { "nextauth.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  });

  api.interceptors.request.use((config) => {
    //console.log(config);
    return config;
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
};
