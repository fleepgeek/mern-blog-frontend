import { useParams } from "react-router-dom";
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

  return (
    <div className="grid-cols-3 gap-16 md:grid">
      <div className="col-span-2">
        {isLoading && <p>Loading Articles...</p>}
        {!isLoading && !data && (
          <h2 className="text-2xl font-bold">No article for this category</h2>
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
      <div className="mt-8 md:mt-0">
        <h2 className="mb-4 text-xl font-bold">Browse Categories</h2>
        <CategoryList categories={categories || []} />
      </div>
    </div>
  );
}
