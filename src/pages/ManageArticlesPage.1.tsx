import { Loader2, SquarePen, Trash2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useGetUserArticles } from "../api/ArticleApi";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../components/ui/button";
import { useGetCurrentUser } from "../api/UserApi";
import NewArticleButton from "../components/NewArticleButton";
import PaginationControl from "../components/PaginationControl";
import { useState } from "react";

export default function ManageArticlesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const { currentUser } = useGetCurrentUser();
  const { data, isLoading } = useGetUserArticles(
    currentUser?._id as string,
    pageNumber,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const { articles, pagingInfo } = data;

  if (articles.length === 0)
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">
          No article yet. Start with your first article here
        </h2>
        <NewArticleButton />
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Manage Articles</h2>
        <p className="text-[0.8rem] text-muted-foreground">
          Edit and Delete your articles
        </p>
      </div>

      <Table>
        <TableCaption>A list of articles written by you.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article, index) => (
            <TableRow key={article._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{article.title}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    to={`/edit-article/${article._id}`}
                    className={`${buttonVariants({ variant: "ghost" })} rounded-3xl bg-gray-200 px-[0.4rem] hover:bg-gray-300`}
                  >
                    <SquarePen size={16} className="mr-1" />{" "}
                    <p className="text-xs">Edit</p>
                  </Link>
                  <Button
                    type="button"
                    onClick={() => {}}
                    className="max-h-fit bg-red-500"
                  >
                    <Trash2Icon width={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControl
        page={pagingInfo.page}
        pages={pagingInfo.pages}
        onPageChange={setPageNumber}
      />
    </div>
  );
}
