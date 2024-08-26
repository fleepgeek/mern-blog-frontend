import { useParams } from "react-router-dom";
import {
  useGetAllCategories,
  useGetArticlesByCategory,
} from "../api/ArticleApi";
import InfiniteArticleList from "../components/InfiniteArticleList";
import CategoryList from "../components/CategoryList";
import { useMemo } from "react";

export default function ArticlesByCategoryPage() {
  const { categories } = useGetAllCategories();
  const { id } = useParams();
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetArticlesByCategory(id);

  const categoryName = useMemo(
    () => categories?.find((category) => category._id === id)?.name,
    [categories, id],
  );

  return (
    <div>
      <h1 className="mb-10 hidden text-center text-5xl font-bold md:block">
        {categoryName}
      </h1>
      <div className="flex grid-cols-3 flex-col gap-16 md:grid">
        <h1 className="block text-center text-3xl font-bold md:hidden md:text-5xl">
          {categoryName}
        </h1>
        <div className="col-span-2">
          {isLoading && <p>Loading Articles...</p>}
          {!isLoading && !data && (
            <h2 className="text-2xl font-bold">
              No article for the {categoryName} category
            </h2>
          )}
          {data && (
            <InfiniteArticleList
              data={data}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onLoadMore={fetchNextPage}
            />
          )}
        </div>
        <div className="order-first md:order-none md:mt-0">
          <h2 className="mb-4 text-xl font-bold">Browse Categories</h2>
          <CategoryList categories={categories || []} />
        </div>
      </div>
    </div>
  );
}
