import { Loader2, MessageCircle } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import CommentForm from "../forms/CommentForm";
import {
  useDeleteUserComment,
  useGetArticleComments,
  usePostComment,
} from "../api/CommentApi";
import { useState } from "react";
import CommentList from "./CommentList";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import CommentDeleteOverlay from "./CommentDeleteOverlay";
import { useTrackScreenWidth } from "../lib/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useSearchParams } from "react-router-dom";
import CommentItem, { PublicCommentItem } from "./CommentItem";

type CommentsSheetProps = {
  articleId: string;
};

export default function CommentsSheet({ articleId }: CommentsSheetProps) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();
  const [searchParam] = useSearchParams();

  const [isCommentsSheetOpen, setIsCommentsSheetOpen] = useState(() =>
    searchParam.get("open_comments_sheet") === "true" ? true : false,
  );

  const { postComment, isLoading: isPostingComment } =
    usePostComment(articleId);
  const { comments, isLoading: isArticleCommentsLoading } =
    useGetArticleComments(articleId);
  const {
    deleteComment,
    isLoading: isDeletingComment,
    reset,
  } = useDeleteUserComment(articleId);

  const { screenWidth } = useTrackScreenWidth();

  const [commentToDelete, setCommentToDelete] = useState("");

  const handleSetCommentToDelete = (id: string) => {
    setCommentToDelete(id);
  };

  const handleDeleteComment = async () => {
    const data = await deleteComment(commentToDelete);
    if (data) {
      handleSetCommentToDelete("");
      reset();
    }
  };

  return (
    <section>
      <Sheet
        onOpenChange={() => {
          setIsCommentsSheetOpen((prev) => !prev);
          handleSetCommentToDelete("");
        }}
        open={isCommentsSheetOpen}
      >
        <SheetTrigger>
          <div className="flex">
            <MessageCircle className="mr-1" /> {comments?.length}
          </div>
        </SheetTrigger>
        <SheetContent
          side={`${screenWidth < 768 ? "bottom" : "right"}`}
          className="h-[95vh] rounded-t-3xl md:h-screen md:rounded-none"
        >
          <CommentDeleteOverlay
            open={!!commentToDelete}
            onCancel={() => handleSetCommentToDelete("")}
            onDelete={handleDeleteComment}
            isDeleting={isDeletingComment}
          />

          <ScrollArea className="h-full">
            <SheetHeader className="mb-6 text-left">
              <SheetTitle>Comments ({comments?.length})</SheetTitle>
              <VisuallyHidden.Root>
                <SheetDescription>Article Comments</SheetDescription>
              </VisuallyHidden.Root>
            </SheetHeader>

            {isArticleCommentsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <div className="space-y-10">
                {isAuthenticated ? (
                  <CommentForm
                    isLoading={isPostingComment}
                    onSave={postComment}
                  />
                ) : (
                  <div
                    className="cursor-pointer rounded-md border p-4 shadow-md"
                    onClick={() =>
                      loginWithRedirect({
                        appState: {
                          returnTo: `${pathname}?open_comments_sheet=true`,
                        },
                      })
                    }
                  >
                    <span className="text-sm text-gray-500">
                      What are your thoughts?
                    </span>
                  </div>
                )}

                <Separator />

                <CommentList
                  comments={comments || []}
                  render={(comment) => (
                    <>
                      {isAuthenticated ? (
                        <CommentItem
                          comment={comment}
                          onSetCommentToDelete={handleSetCommentToDelete}
                        />
                      ) : (
                        <PublicCommentItem comment={comment} />
                      )}
                    </>
                  )}
                />
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </section>
  );
}
