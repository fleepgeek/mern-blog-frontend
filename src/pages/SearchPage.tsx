import { useSearchParams } from "react-router-dom";
import { useGetAllCategories, useSearchArticles } from "../api/ArticleApi";
import ArticleList from "../components/ArticleList";
import CategoryList from "../components/CategoryList";
import { Button } from "../components/ui/button";
import SearchBox from "../components/SearchBox";

export default function SearchPage() {
  const { categories } = useGetAllCategories();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSearchArticles(searchQuery || "");

  if (searchQuery === "") {
    return (
      <div className="md:hidden">
        <SearchBox />
      </div>
    );
  }

  console.log(hasNextPage);

  return (
    <div>
      <div className="flex grid-cols-3 flex-col gap-16 md:grid">
        <div className="md:hidden">
          <SearchBox searchQuery={searchQuery} />
        </div>
        <div className="col-span-2">
          {!isLoading && (
            <h1 className="mb-10 text-center text-3xl md:text-5xl">
              <span className="text-gray-400">
                {!data && "No"} Results for{" "}
              </span>
              {searchQuery}
            </h1>
          )}
          {isLoading && <p>Loading Articles...</p>}
          {data && <ArticleList data={data} />}
          {hasNextPage && (
            <Button
              variant={"outline"}
              className="mt-4"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </Button>
          )}
        </div>
        <div className="md:mt-0">
          <h2 className="mb-4 text-xl font-bold">Browse Categories</h2>
          <CategoryList categories={categories || []} />
        </div>
      </div>
    </div>
  );
}
