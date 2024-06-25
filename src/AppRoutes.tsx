import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthVerifyCallbackPage from "./pages/AuthVerifyCallbackPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-verify" element={<AuthVerifyCallbackPage />} />
    </Routes>
  );
}
