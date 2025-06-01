import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { Textarea } from "../components/ui/textarea";
import LoadingButton from "../components/LoadingButton";
import { Comment } from "../lib/types";
import { Button } from "../components/ui/button";
import { CommentRequestData } from "../api/CommentApi";

const formSchema = z.object({
  content: z.string().trim().min(1, "content is required"),
});

export type CommentFormData = z.infer<typeof formSchema>;

type CommentFormProps = {
  isLoading: boolean;
  onSave: (commentData: CommentRequestData) => Promise<Comment>;
  comment?: Comment;
  buttonText?: string;
  onCancel?: () => void;
};

export default function CommentForm({
  onSave,
  isLoading,
  comment,
  buttonText,
  onCancel,
}: CommentFormProps) {
  const form = useForm<CommentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: comment?.content || "",
    },
  });

  const submitHandler = async (commentData: CommentRequestData) => {
    let savedComment;
    if (comment) {
      savedComment = await onSave({
        content: commentData.content,
        commentId: comment._id,
      });
    } else {
      savedComment = await onSave(commentData);
    }
    if (savedComment) {
      form.reset();
      onCancel && onCancel();
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex flex-col space-y-4"
        >
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder="Enter comment" autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="self-end">
            {comment && onCancel && (
              <Button
                type="button"
                variant="ghost"
                className="hover:bg-transparent"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            )}
            <LoadingButton
              isLoading={isLoading}
              loadingText={comment ? "Updating" : "Posting"}
            >
              {buttonText || "Post"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
