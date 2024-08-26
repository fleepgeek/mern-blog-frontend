import { useGetAllCategories, useGetArticles } from "../api/ArticleApi";
import InfiniteArticleList from "../components/InfiniteArticleList";
import CategoryList from "../components/CategoryList";

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
        <InfiniteArticleList
          data={data}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      </div>
      <div className="mt-8 md:mt-0">
        <h2 className="mb-4 text-xl font-bold">Browse Categories</h2>
        <CategoryList categories={categories || []} />
      </div>
    </div>
  );
}
