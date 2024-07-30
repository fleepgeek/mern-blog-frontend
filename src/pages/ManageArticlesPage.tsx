import { Loader2 } from "lucide-react";

import { useGetUserArticles } from "../api/ArticleApi";

import { useGetCurrentUser } from "../api/UserApi";
import NewArticleButton from "../components/NewArticleButton";
import PaginationControl from "../components/PaginationControl";
import { useState } from "react";
import ArticleTable from "../components/ArticleTable";

export default function ManageArticlesPage() {
  const [page, setPage] = useState(1);
  const { currentUser } = useGetCurrentUser();
  const { data, isLoading } = useGetUserArticles(
    currentUser?._id as string,
    page,
  );

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
