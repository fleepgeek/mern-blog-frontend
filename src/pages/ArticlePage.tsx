import { useParams } from "react-router-dom";
import { useGetSingleArticle } from "../api/ArticleApi";
import { Loader2 } from "lucide-react";
import CategoryChip from "../components/CategoryChip";
import { createPortal } from "react-dom";
import { intlFormat } from "date-fns";
import { cn } from "../lib/utils";

export default function ArticlePage() {
  const { id } = useParams();
  const { article, isLoading } = useGetSingleArticle(id);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (article) {
    return (
      <>
        {article.coverImageUrl &&
          createPortal(
            <div className="absolute left-0 top-0 -z-10 h-[500px] w-full bg-gray-400"></div>,
            document.body,
          )}
        <div
          className={cn(
            "space-y-8",
            "text-center",
            !article.coverImageUrl && "md:text-left",
          )}
        >
          <CategoryChip category={article.category} />
          <h1 className="text-6xl font-bold">{article.title}</h1>
          {article.coverImageUrl && (
            <div className="h-[400px]">
              <img
                className="h-full w-full object-cover"
                src={article.coverImageUrl}
                alt="Article cover image"
              />
            </div>
          )}
          <p className="font-bold">
            Written By {article.author.name} on{" "}
            {intlFormat(
              new Date(article.createdAt),
              { dateStyle: "medium" },
              { locale: "en-US" },
            )}
          </p>
        </div>

        <div className="mt-8 grid-cols-3 gap-36 md:grid">
          <div className="col-span-2 mb-8">
            {article.content}
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              beatae pariatur quam aperiam porro error nisi est culpa officia
              facilis sed aut, molestiae deserunt nemo mollitia. Facere
              accusamus quod odit.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              possimus praesentium magnam, blanditiis rem rerum quasi
              perferendis nemo harum autem quia ipsum consequatur voluptatem
              animi maxime optio, illum beatae ex.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Author</h4>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-400"></div>
              <div>
                <p className="font-bold">{article.author.name}</p>
                <p className="text-gray-400">Content Writer</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <h3>No article to display</h3>
    </div>
  );
}
