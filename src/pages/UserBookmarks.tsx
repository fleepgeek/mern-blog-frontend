import { useGetBookmarks } from "../api/UserApi";
import ArticleItem from "../components/ArticleItem";

export default function UserBookmarks() {
  const { articles, isLoading } = useGetBookmarks();

  if (isLoading) return <p>Loading your bookmarks...</p>;

  if (articles && articles?.length === 0)
    return <h2 className="text-2xl font-bold">No bookmarks</h2>;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold">Your Bookmarks</h2>
        <p className="text-[0.8rem] text-muted-foreground">
          Manage your bookmarks
        </p>
      </section>

      <section className="grid lg:grid-cols-4">
        <ul className="flex flex-col gap-8 lg:col-span-2">
          {articles?.map((article) => (
            <li key={article._id}>
              <ArticleItem article={article} isMini />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
