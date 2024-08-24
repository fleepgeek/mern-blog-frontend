import { Comment } from "../types";
import { Separator } from "./ui/separator";

type CommentListProps = {
  comments: Comment[];
  render: (comment: Comment) => React.ReactNode;
};

export default function CommentList({ comments, render }: CommentListProps) {
  return (
    <>
      {comments.length ? (
        <ul>
          {comments?.map((comment, index) => (
            <li key={comment._id}>
              {render(comment)}

              {index + 1 !== comments.length && <Separator />}
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-bold">No comment yet</p>
      )}
    </>
  );
}
