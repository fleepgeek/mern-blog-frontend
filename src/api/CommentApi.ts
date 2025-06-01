import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Comment } from "../lib/types";
import { toast } from "sonner";
import { CommentFormData } from "../forms/CommentForm";

const COMMENT_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL + "/api/articles";

export const useGetArticleComments = (articleId: string) => {
  const getArticleCommentsRequest = async (): Promise<Comment[]> => {
    const response = await fetch(
      `${COMMENT_API_BASE_URL}/${articleId}/comments`,
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Failed to get comments");
    }

    return response.json();
  };

  const { data: comments, isLoading } = useQuery({
    queryKey: ["fetch-article-comments", articleId],
    queryFn: getArticleCommentsRequest,
    enabled: !!articleId,
  });

  return { comments, isLoading };
};

export type CommentRequestData = CommentFormData & {
  commentId?: string;
};

export const usePostComment = (articleId: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const postCommentRequest = async (
    commentData: CommentRequestData,
  ): Promise<Comment> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${COMMENT_API_BASE_URL}/${articleId}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentData.content }),
      },
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Failed to post comment");
    }

    return response.json();
  };

  const queryClient = useQueryClient();

  const {
    mutateAsync: postComment,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: postCommentRequest,
    onSuccess: () => {
      toast.success("Comment Added");
      queryClient.invalidateQueries({
        queryKey: ["fetch-article-comments", articleId],
      });
      // queryClient.invalidateQueries({ queryKey: [articleId] })
    },
  });

  return { postComment, isLoading, data };
};

export const useUpdateUserComment = (articleId: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const updateUserCommentRequest = async (
    updateCommentData: CommentRequestData,
  ): Promise<Comment> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${COMMENT_API_BASE_URL}/${articleId}/comments/${updateCommentData.commentId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: updateCommentData.content }),
      },
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Error updating comment");
    }

    return response.json();
  };

  const queryClient = useQueryClient();

  const { mutateAsync: updateComment, isPending: isLoading } = useMutation({
    mutationFn: updateUserCommentRequest,
    onSuccess: () => {
      toast.success("Comment Updated");
      queryClient.invalidateQueries({
        queryKey: ["fetch-article-comments", articleId],
      });
    },
  });

  return { updateComment, isLoading };
};

type DeleteCommentResponse = {
  message: string;
};

export const useDeleteUserComment = (articleId: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const deleteUserComment = async (
    commentId: string,
  ): Promise<DeleteCommentResponse> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${COMMENT_API_BASE_URL}/${articleId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Error deleting comment");
    }

    return response.json();
  };

  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteComment,
    isPending: isLoading,
    reset,
  } = useMutation({
    mutationFn: deleteUserComment,
    onSuccess: () => {
      toast.success("Comment Deleted");
      queryClient.invalidateQueries({
        queryKey: ["fetch-article-comments", articleId],
      });
    },
  });

  return { deleteComment, isLoading, reset };
};
