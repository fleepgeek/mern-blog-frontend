import { Loader2 } from "lucide-react";
import { useGetUserArticles } from "../api/ArticleApi";
import { useSearchParams } from "react-router-dom";
import { useGetCurrentUser } from "../api/UserApi";
import NewArticleButton from "../components/NewArticleButton";
import PaginationControl from "../components/PaginationControl";
import ArticleTable from "../components/ArticleTable";

export default function ManageArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const { currentUser } = useGetCurrentUser();
  const queryObject = {
    page: parseInt(searchParams.get("page") as string),
  };
  const { data, isLoading } = useGetUserArticles(
    queryObject,
    currentUser?._id as string,
  );

  const setPage = (page: number) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("page", page.toString());
      return prevSearchParams;
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const { articles, pagingInfo } = data;

  if (articles.length === 0)
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">
          No article yet. Start with your first article here
        </h2>
        <NewArticleButton />
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Manage Articles</h2>
        <p className="text-[0.8rem] text-muted-foreground">
          Edit and Delete your articles
        </p>
      </div>

      <ArticleTable articles={articles} />

      <PaginationControl
        page={pagingInfo.page}
        pages={pagingInfo.pages}
        onPageChange={setPage}
      />
    </div>
  );
}
