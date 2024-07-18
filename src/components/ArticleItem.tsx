import { formatDistance } from "date-fns";
import { Article } from "../types";
import { Link } from "react-router-dom";

type ArticleItemProps = {
  article: Article;
};
export default function ArticleItem({ article }: ArticleItemProps) {
  return (
    <Link to={`/articles/${article._id}`}>
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gray-400"></div>
          <span>{article.author.name}</span>
        </div>
        <div className="flex w-full items-stretch gap-4 border-b pb-8">
          <div className="flex flex-1 flex-col">
            <div className="flex-1">
              <h3 className="mb-2 text-2xl font-bold">{article.title}</h3>
              <p className="mb-2 line-clamp-1 text-gray-600">
                {article.content}
              </p>
              {/* <p className="mb-2 text-gray-600">{`${article.content.substring(0, 40)}...`}</p> */}
            </div>
            <div className="flex">
              <span className="text-gray-600">
                {formatDistance(new Date(article.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <div className={`h-[120px] w-[120px] bg-gray-400 md:w-[200px]`}>
            {article.coverImageUrl && (
              <img
                className="h-full w-full object-cover"
                src={article.coverImageUrl}
                alt="Article cover image"
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
