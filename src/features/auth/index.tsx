import { Route, Routes, Navigate } from "react-router-dom";

import { Login } from "./routes/Login";
import { Register } from "./routes/Register";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};
