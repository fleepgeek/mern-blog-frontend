import { useParams } from "react-router-dom";
import { useGetUser } from "../api/UserApi";
import UserProfileInfo from "../components/UserProfileInfo";
import { useGetArticlesByUser } from "../api/ArticleApi";
import InfiniteArticleList from "../components/InfiniteArticleList";

export default function UserProfilePage() {
  const { id } = useParams();
  const { user, isLoading } = useGetUser(id);
  const {
    data,
    isLoading: isLoadingArticles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetArticlesByUser(id);

  if (isLoading) return <h2>Loading user profile...</h2>;

  if (!user) return <h2>No user</h2>;

  return (
    <div className="flex flex-col-reverse gap-16 md:grid md:grid-cols-3 md:gap-8">
      <div className="md:col-span-2">
        <h1 className="mb-16 hidden text-3xl font-bold md:block">
          {user.name}
        </h1>
        {isLoadingArticles && <p>Loading user articles</p>}
        {data && (
          <InfiniteArticleList
            data={data}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
          />
        )}
      </div>

      <div className="md:sticky md:top-16 md:h-[100dvh] md:border-l md:pl-8">
        <UserProfileInfo user={user} />
      </div>
    </div>
  );
}
