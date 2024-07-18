import { useGetAllCategories, useGetArticles } from "../api/ArticleApi";
import ArticleList from "../components/ArticleList";
import CategoryList from "../components/CategoryList";

export default function HomePage() {
  const { articles, isLoading } = useGetArticles();
  const { categories, isLoading: isCategoryLoading } = useGetAllCategories();

  if (isLoading || isCategoryLoading) {
    return <p>Loading Articles...</p>;
  }

  return (
    <div className="grid-cols-3 gap-16 md:grid">
      <div className="col-span-2">
        <ArticleList articles={articles || []} />
      </div>
      <div className="mt-8 md:mt-0">
        <h2 className="mb-4 text-xl font-bold">Browse Categories</h2>
        <CategoryList categories={categories || []} />
      </div>
    </div>
  );
}
