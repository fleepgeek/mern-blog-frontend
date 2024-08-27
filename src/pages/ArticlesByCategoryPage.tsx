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
    <>
      <h1 className="mb-10 hidden text-center text-5xl font-bold md:block">
        {categoryName}
      </h1>
      <h1 className="mb-8 block text-center text-3xl font-bold md:hidden md:text-5xl">
        {categoryName}
      </h1>
      <div className="flex flex-col-reverse gap-16 md:grid md:grid-cols-3">
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
        <div className="sticky top-0 border-b bg-white pb-4 md:top-16 md:h-[100dvh] md:border-b-0">
          <h2 className="mb-4 text-xl font-bold">Browse Categories</h2>
          <CategoryList categories={categories || []} />
        </div>
      </div>
    </>
  );
}
