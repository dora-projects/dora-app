import { axios } from "@/common/axios";

export const getLoginUserInfo = () => {
  return axios.get("/manager/auth/me");
};

export const loginWithEmailAndPassword = (data: { email: string; password: string }) => {
  return axios.post("/manager/auth/login", data);
};

export const registerUser = (data: { username: string; email: string; password: string }) => {
  return axios.post("/manager/auth/register", data);
};
