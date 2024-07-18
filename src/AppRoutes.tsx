import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthVerifyCallbackPage from "./pages/AuthVerifyCallbackPage";
import MainLayout from "./layouts/MainLayout";
import UserProfilePage from "./pages/UserProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import CreateArticlePage from "./pages/CreateArticlePage";
import ArticlePage from "./pages/ArticlePage";

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
        path="/articles/:id"
        element={
          <MainLayout>
            <ArticlePage />
          </MainLayout>
        }
      />

      <Route path="/auth-verify" element={<AuthVerifyCallbackPage />} />

      <Route element={<PrivateRoute />}>
        <Route
          path="/profile"
          element={
            <MainLayout>
              <UserProfilePage />
            </MainLayout>
          }
        />
        <Route
          path="/new-article"
          element={
            <MainLayout>
              <CreateArticlePage />
            </MainLayout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
