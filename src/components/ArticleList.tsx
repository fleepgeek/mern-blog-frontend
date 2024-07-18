import { Article } from "../types";
import ArticleItem from "./ArticleItem";

type ArticleListProps = {
  articles: Article[];
};
export default function ArticleList({ articles }: ArticleListProps) {
  if (articles.length < 1) {
    return <p>No articles Posted.</p>;
  }
  return (
    <ul className="space-y-4">
      {articles.map((article) => (
        <li key={article._id}>
          <ArticleItem article={article} />
        </li>
      ))}
    </ul>
  );
}
