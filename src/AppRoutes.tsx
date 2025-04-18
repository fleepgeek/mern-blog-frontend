import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthVerifyCallbackPage from "./pages/AuthVerifyCallbackPage";
import MainLayout from "./layouts/MainLayout";
import ManageProfilePage from "./pages/ManageProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import SaveArticlePage from "./pages/SaveArticlePage";
import ArticlePage from "./pages/ArticlePage";
import DashboardLayout from "./layouts/DashboardLayout";
import ManageArticlesPage from "./pages/ManageArticlesPage";
import NotFoundPage from "./pages/NotFoundPage";
import ArticlesByCategoryPage from "./pages/ArticlesByCategoryPage";
import SearchPage from "./pages/SearchPage";
import UserBookmarks from "./pages/UserBookmarks";
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
        path="/articles/:id"
        element={
          <MainLayout>
            <ArticlePage />
          </MainLayout>
        }
      />
      <Route
        path="/category/:id"
        element={
          <MainLayout>
            <ArticlesByCategoryPage />
          </MainLayout>
        }
      />
      <Route
        path="/search"
        element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        }
      />
      <Route
        path="/users/:id"
        element={
          <MainLayout>
            <UserProfilePage />
          </MainLayout>
        }
      />

      <Route path="/auth-verify" element={<AuthVerifyCallbackPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/" element={<DashboardLayout />}>
          <Route path="profile" element={<ManageProfilePage />} />
          <Route path="manage-articles" element={<ManageArticlesPage />} />
        </Route>

        <Route
          path="/new-article"
          element={
            <MainLayout>
              <SaveArticlePage />
            </MainLayout>
          }
        />

        <Route
          path="/edit-article/:id"
          element={
            <MainLayout>
              <SaveArticlePage />
            </MainLayout>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <MainLayout>
              <UserBookmarks />
            </MainLayout>
          }
        />
      </Route>

      <Route
        path="/not-found"
        element={
          // <MainLayout>
          <NotFoundPage />
          // </MainLayout>
        }
      />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}
