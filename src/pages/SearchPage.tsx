import { useSearchParams } from "react-router-dom";
import { useGetAllCategories, useSearchArticles } from "../api/ArticleApi";
import CategoryList from "../components/CategoryList";
import SearchForm from "../forms/SearchForm";
import InfiniteArticleList from "../components/InfiniteArticleList";

export default function SearchPage() {
  const { categories } = useGetAllCategories();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSearchArticles(searchQuery || "");

  if (searchQuery === "") {
    return (
      <div className="md:hidden">
        <SearchForm />
      </div>
    );
  }

  return (
    <div className="flex grid-cols-3 flex-col gap-16 md:grid">
      <div className="md:hidden">
        <SearchForm searchQuery={searchQuery} />
      </div>
      <section className="col-span-2">
        {!isLoading && (
          <h1 className="mb-10 text-center text-3xl md:text-5xl">
            <span className="text-gray-400">{!data && "No"} Results for </span>
            {searchQuery}
          </h1>
        )}
        {isLoading && <p>Loading Articles...</p>}
        {data && (
          <InfiniteArticleList
            data={data}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
          />
        )}
      </section>
      <aside className="mt-8 md:sticky md:top-16 md:mt-0 md:h-[100dvh]">
        <h2 className="mb-4 text-xl font-bold">Browse Categories</h2>
        <CategoryList categories={categories || []} />
      </aside>
    </div>
  );
}
