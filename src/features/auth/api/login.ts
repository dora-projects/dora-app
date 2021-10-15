import { axios } from "@/lib/axios";
import { useMutation } from "react-query";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO) => {
  return axios.post("/api/auth/login", data);
};

export const useLogin = () => {
  return useMutation((data: LoginCredentialsDTO) => loginWithEmailAndPassword(data));
};
