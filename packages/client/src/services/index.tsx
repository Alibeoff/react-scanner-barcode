import { ITokens } from "@/types/tokens.interface";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { AuthService } from "./auth.instance";
export const baseURL = "http://localhost:3333";

export const Api = (accesstoken?: string, cookie?: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${
        accesstoken ? accesstoken : Cookies.get("accssesToken")
      }`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (!error.config) return Promise.reject(error);
      const status = error.response ? error.response.status : null;

      if (status !== 401) return Promise.reject(error);

      try {
        const { data } = await axios.get<ITokens>("/auth/tokens", {
          withCredentials: true,
          baseURL,
          headers: {
            Cookie: cookie,
          },
        });

        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return instance(error.config);
      } catch {
        return Promise.reject(error);
      }
    }
  );

  return { auth: AuthService(instance) };
};
