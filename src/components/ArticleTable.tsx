import { SquarePen, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../components/ui/button";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Article, PagingInfo } from "../types";
import PaginationControl from "./PaginationControl";
import { useDeleteArticle } from "../api/ArticleApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import LoadingButton from "./LoadingButton";
import { useEffect, useState } from "react";

type ArticleTableProps = {
  articles: Article[];
  pagingInfo: PagingInfo;
  setPage: (page: number) => void;
};

export default function ArticleTable({
  articles,
  pagingInfo,
  setPage,
}: ArticleTableProps) {
  const [deletingItem, setDeletingItem] = useState<string | null>();
  const { onDelete, isLoading } = useDeleteArticle();

  useEffect(() => {
    setDeletingItem(null);
    if (articles.length === 0 && pagingInfo.total > 0) {
      setPage(1);
    }
  }, [articles, pagingInfo.total, setPage]);

  return (
    <div className="flex flex-col gap-6">
      <Table>
        {/* <TableCaption>A list of articles written by you.</TableCaption> */}
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

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      {isLoading && article._id === deletingItem ? (
                        <LoadingButton />
                      ) : (
                        <Button type="button" className="max-h-fit bg-red-500">
                          <Trash2Icon width={16} />
                        </Button>
                      )}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this article?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the article.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              onDelete(article._id);
                              setDeletingItem(article._id);
                            }}
                          >
                            Delete
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControl
        page={pagingInfo.page}
        pages={pagingInfo.pages}
        onPageChange={setPage}
      />
    </div>
  );
}
