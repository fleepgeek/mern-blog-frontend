import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthVerifyCallbackPage from "./pages/AuthVerifyCallbackPage";
import MainLayout from "./layouts/MainLayout";
import UserProfilePage from "./pages/UserProfilePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <UserProfilePage />
          </MainLayout>
        }
      />
      <Route path="/auth-verify" element={<AuthVerifyCallbackPage />} />
    </Routes>
  );
}
