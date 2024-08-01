import { useLocation, useParams } from "react-router-dom";
import {
  useGetAllCategories,
  useGetArticlesByCategory,
} from "../api/ArticleApi";
import ArticleList from "../components/ArticleList";
import CategoryList from "../components/CategoryList";
import { Button } from "../components/ui/button";

export default function ArticlesByCategoryPage() {
  const { categories } = useGetAllCategories();
  const { id } = useParams();
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetArticlesByCategory(id);
  const { state } = useLocation();

  return (
    <div>
      <h1 className="mb-10 hidden text-center text-5xl font-bold md:block">
        {state.categoryName}
      </h1>
      <div className="flex grid-cols-3 flex-col gap-16 md:grid">
        <h1 className="block text-center text-5xl font-bold md:hidden">
          {state.categoryName}
        </h1>
        <div className="col-span-2">
          {isLoading && <p>Loading Articles...</p>}
          {!isLoading && !data && (
            <h2 className="text-2xl font-bold">
              No article for the {state.categoryName} category
            </h2>
          )}
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
        <div className="order-first md:order-none md:mt-0">
          <h2 className="mb-4 text-xl font-bold">Browse Categories</h2>
          <CategoryList categories={categories || []} />
        </div>
      </div>
    </div>
  );
}
