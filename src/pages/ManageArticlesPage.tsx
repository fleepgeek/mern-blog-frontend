import { Loader2 } from "lucide-react";
import { useGetCurrentUserArticles } from "../api/ArticleApi";
import { useSearchParams } from "react-router-dom";
import NewArticleButton from "../components/NewArticleButton";
import ArticleTable from "../components/ArticleTable";
import { ArticleQueryObject } from "../types";
import { SearchData } from "../lib/validations";
import DataTableSearchBox from "../components/DataTableSearchBox";

export default function ManageArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const queryObject: ArticleQueryObject = {
    page: parseInt(searchParams.get("page") as string),
    searchQuery: searchParams.get("title") || "",
  };
  const { data, isLoading } = useGetCurrentUserArticles(queryObject);

  const setPage = (page: number) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("page", page.toString());
      return prevSearchParams;
    });
  };

  const handleSearch = (data: SearchData) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("title", data.searchQuery);
      prevSearchParams.set("page", "1");
      return prevSearchParams;
    });
  };

  const handleReset = () => {
    setSearchParams();
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

  if (
    !queryObject.searchQuery &&
    articles.length === 0 &&
    pagingInfo.total === 0
  )
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
      <section>
        <h2 className="text-2xl font-bold">Manage Articles</h2>
        <p className="text-[0.8rem] text-muted-foreground">
          Edit and Delete your articles
        </p>
      </section>

      <ArticleTable
        articles={articles}
        pagingInfo={pagingInfo}
        setPage={setPage}
      >
        <DataTableSearchBox
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </ArticleTable>
    </div>
  );
}
