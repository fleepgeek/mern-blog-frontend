import { Fragment } from "react";
import ArticleItem from "./ArticleItem";
import { InfiniteData } from "@tanstack/react-query";
import { ArticleApiResponse } from "../types";

type ArticleListProps = {
  data: InfiniteData<ArticleApiResponse, unknown>;
};

export default function ArticleList({ data }: ArticleListProps) {
  if (data.pages[0].articles.length < 1) {
    return <p>No articles Posted.</p>;
  }
  return (
    <ul className="space-y-4">
      {data.pages.map((page, i) => (
        <Fragment key={i}>
          {page.articles.map((article) => (
            <li key={article._id}>
              <ArticleItem article={article} />
            </li>
          ))}
        </Fragment>
      ))}
    </ul>
  );
}
