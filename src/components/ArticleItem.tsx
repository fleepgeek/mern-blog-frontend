import { format, formatDistance } from "date-fns";
import { Article } from "../types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import BookmarkToogle, { BookmarkButton } from "./BookmarkToggle";
import { Dot } from "lucide-react";

type ArticleItemProps = {
  article: Article;
  isMini?: boolean;
};
export default function ArticleItem({ article, isMini }: ArticleItemProps) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Link
      to={`/articles/${article._id}`}
      onClick={(e) => {
        if (e.defaultPrevented) return;
      }}
    >
      {isMini ? (
        <article className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="mt-1 h-8 w-8 rounded-full bg-gray-400">
              {article.coverImageUrl && (
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={article.coverImageUrl}
                  alt="Article cover image"
                />
              )}
            </div>
            <div>
              <h3 className="text-xl">{article.title}</h3>
              <div className="flex items-center text-sm">
                <span
                  className="hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/users/${article.author._id}`);
                  }}
                >
                  {article.author.name || "Author"}
                </span>
                <Dot />
                <span className="text-gray-600">
                  {format(new Date(article.createdAt), "MM LLL yy")}
                </span>
                <Dot />
                <span>{article.category.name}</span>
              </div>
            </div>
          </div>
          <BookmarkToogle articleId={article._id} />
        </article>
      ) : (
        <article className="flex flex-col gap-2 border-b pb-8">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-400"></div>
            <div className="flex gap-1 text-sm">
              <span
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/users/${article.author._id}`);
                }}
              >
                {article.author.name}
              </span>
              <span className="text-gray-500">in</span>
              <span
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/category/${article.category._id}`);
                }}
              >
                {article.category.name}
              </span>
            </div>
          </div>
          <div className="grid w-full grid-cols-3 gap-8">
            <div className="col-span-2 flex flex-col">
              <div className="flex-1">
                <h3 className="mb-2 line-clamp-3 text-2xl font-bold">
                  {article.title}
                </h3>
                <p className="mb-2 line-clamp-1 text-gray-600">
                  {article.content}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  {formatDistance(new Date(article.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </span>
                {isAuthenticated ? (
                  <BookmarkToogle articleId={article._id} />
                ) : (
                  <BookmarkButton
                    onToggle={() =>
                      loginWithRedirect({ appState: { returnTo: pathname } })
                    }
                  />
                )}
              </div>
            </div>
            <div className={`h-[120px] bg-gray-400`}>
              {article.coverImageUrl && (
                <img
                  className="h-full w-full object-cover"
                  src={article.coverImageUrl}
                  alt="Article cover image"
                />
              )}
            </div>
          </div>
        </article>
      )}
    </Link>
  );
}
