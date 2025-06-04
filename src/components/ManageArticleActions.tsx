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
import { SquarePen, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { buttonVariants, Button } from "./ui/button";
import { useDeleteArticle } from "../api/ArticleApi";
import { cn } from "../lib/utils";

type ManageArticleActionsProps = {
  id: string;
};

export default function ManageArticleActions({
  id,
}: ManageArticleActionsProps) {
  const { onDelete, isLoading: isDeleting } = useDeleteArticle();

  return (
    <div className="flex justify-end gap-2">
      <Link
        to={`/edit-article/${id}`}
        className={`${buttonVariants({ variant: "ghost" })} rounded-3xl bg-gray-200 px-[0.4rem] hover:bg-gray-300 ${cn(
          isDeleting && "pointer-events-none opacity-50",
        )}`}
      >
        <SquarePen size={16} className="mr-1" /> <p className="text-xs">Edit</p>
      </Link>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <LoadingButton
            type="button"
            isLoading={isDeleting}
            loadingText=""
            className="max-h-fit bg-red-500"
          >
            <Trash2Icon width={16} />
          </LoadingButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this article?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={() => onDelete(id)}>
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
