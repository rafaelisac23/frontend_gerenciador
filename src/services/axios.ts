import { parseCookies } from "nookies";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type dataError =
  | {
      message: string;
    }
  | {};

export const getApiClient = (ctx?: any) => {
  const { "nextauth.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    timeout: 10000,
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<dataError>) => {
      let Toastmessage = "Not found Error";

      if (axios.isAxiosError(error) && error.response) {
        let data = error.response?.data;

        if ("message" in data && error.response.status === 401) {
          Toastmessage = data.message;
        }

        if ("message" in data && error.response.status === 409) {
          Toastmessage = data.message;
        }

        if (error.response.status === 404) {
          Toastmessage = "Not Found Data";
        }

        if (error.response.status >= 500) {
          Toastmessage = "Server Error";
        }
      }

      //erro conexao
      if (error.message === "Network Error" && !error.response) {
        Toastmessage = "Not connected";
      }

      toast.error(Toastmessage);

      return Promise.reject(error);
    }
  );

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
};
