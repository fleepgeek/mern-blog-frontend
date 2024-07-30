import { useGetAllCategories, useGetArticles } from "../api/ArticleApi";
import ArticleList from "../components/ArticleList";
import CategoryList from "../components/CategoryList";
import { Button } from "../components/ui/button";

export default function HomePage() {
  const { categories, isLoading: isCategoryLoading } = useGetAllCategories();
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetArticles();

  if (isLoading || isCategoryLoading) {
    return <p>Loading Articles...</p>;
  }

  if (!data) {
    return <h2>No article data</h2>;
  }

  return (
    <div className="grid-cols-3 gap-16 md:grid">
      <div className="col-span-2">
        <ArticleList data={data} />
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
      <div className="mt-8 md:mt-0">
        <h2 className="mb-4 text-xl font-bold">Browse Categories</h2>
        <CategoryList categories={categories || []} />
      </div>
    </div>
  );
}
