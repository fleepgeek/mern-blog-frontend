import { CircleUserRound, Ellipsis } from "lucide-react";
import { Comment } from "../types";
import { formatDistance } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useGetCurrentUser } from "../api/UserApi";
import { useState } from "react";
import CommentForm from "../forms/CommentForm";
import { useUpdateUserComment } from "../api/CommentApi";
import { useParams } from "react-router-dom";

type CommentItemProps = {
  comment: Comment;
  onSetCommentToDelete: (id: string) => void;
};

export default function CommentItem({
  comment,
  onSetCommentToDelete,
}: CommentItemProps) {
  const { id } = useParams();

  const { currentUser } = useGetCurrentUser();
  const { updateComment, isLoading } = useUpdateUserComment(id as string);

  const [popOverVisible, setPopOverVisible] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState<string | null>();
  const isEditing = comment._id === editingCommentId;

  const handleSetEditingComment = (commentId: string | null) => {
    setEditingCommentId(commentId);
    setPopOverVisible(false);
  };

  if (isEditing) {
    return (
      <div className="my-4">
        <CommentForm
          isLoading={isLoading}
          onSave={updateComment}
          buttonText="Update"
          comment={comment}
          onCancel={() => handleSetEditingComment(null)}
        />
      </div>
    );
  }

  return (
    <section className="my-8 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <CircleUserRound className="text-gray-500" size={40} />
          <div className="flex flex-col">
            <p>
              {comment.user.name || comment.user.email}{" "}
              {currentUser?._id === comment.user._id && (
                <span className="rounded-sm bg-gray-200 p-[1.5px] text-xs text-gray-500">
                  You
                </span>
              )}
            </p>
            <span className="text-sm tracking-tight text-gray-500">
              {formatDistance(new Date(comment.createdAt), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        {currentUser?._id === comment.user._id && (
          <Popover open={popOverVisible} onOpenChange={setPopOverVisible}>
            <PopoverTrigger asChild>
              <Ellipsis
                className="cursor-pointer"
                onClick={() => setPopOverVisible((prev) => !prev)}
              />
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <div className="flex flex-col gap-4 text-sm *:text-gray-500">
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => handleSetEditingComment(comment._id)}
                >
                  Edit this comment
                </p>
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => {
                    setPopOverVisible(false);
                    onSetCommentToDelete(comment._id);
                  }}
                >
                  Delete
                </p>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <p>{comment.content}</p>
    </section>
  );
}

type PublicCommentItemProps = {
  comment: Comment;
};

export function PublicCommentItem({ comment }: PublicCommentItemProps) {
  return (
    <section className="my-8 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <CircleUserRound className="text-gray-500" size={40} />
          <div className="flex flex-col">
            <p>{comment.user.name || comment.user.email} </p>
            <span className="text-sm tracking-tight text-gray-500">
              {formatDistance(new Date(comment.createdAt), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>

      <p>{comment.content}</p>
    </section>
  );
}
