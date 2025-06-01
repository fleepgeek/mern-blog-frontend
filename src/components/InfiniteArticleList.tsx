import { Fragment } from "react";
import ArticleItem from "./ArticleItem";
import { InfiniteData } from "@tanstack/react-query";
import { ArticleApiResponse } from "../lib/types";
import { Button } from "./ui/button";

type InfiniteArticleListProps = {
  data: InfiniteData<ArticleApiResponse, unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
};

export default function InfiniteArticleList({
  data,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: InfiniteArticleListProps) {
  if (data.pages[0].articles.length < 1) {
    return <p>No articles Posted.</p>;
  }
  return (
    <div>
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

      {hasNextPage && (
        <Button
          variant={"outline"}
          className="mt-4"
          onClick={() => onLoadMore()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </Button>
      )}
    </div>
  );
}
