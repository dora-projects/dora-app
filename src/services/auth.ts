import { axios } from "@/common/axios";

export const getLoginUserInfo = () => {
  return axios.get("/api/auth/me");
};

export const loginWithEmailAndPassword = (data: { email: string; password: string }) => {
  return axios.post("/api/auth/login", data);
};

export const registerUser = (data: { username: string; email: string; password: string }) => {
  return axios.post("/api/auth/register", data);
};
