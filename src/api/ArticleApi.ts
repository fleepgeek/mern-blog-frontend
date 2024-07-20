import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Article, Category } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import { ArticleFormObject } from "../forms/SaveArticleForm";
import { toast } from "sonner";

const ARTICLE_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL + "/api/articles";

export const useGetAllCategories = () => {
  const getAllCategoriesRequest = async (): Promise<Category[]> => {
    const response = await fetch(`${ARTICLE_API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error("Failed to get categories");
    }

    return response.json();
  };

  const { data: categories, isLoading } = useQuery({
    queryKey: ["fetch-categories"],
    queryFn: getAllCategoriesRequest,
    staleTime: 1000 * 60 * 10, // 10 mins
  });

  return { categories, isLoading };
};

export const useCreateArticle = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createArticleRequest = async (
    articleData: ArticleFormObject,
  ): Promise<Article> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(ARTICLE_API_BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error("Failed to create article!");
    }

    return response.json();
  };

  const queryClient = useQueryClient();

  const {
    mutate: createArticle,
    data,
    isPending: isLoading,
  } = useMutation({
    mutationFn: createArticleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-articles"] });
      queryClient.invalidateQueries({ queryKey: ["fetch-user-articles"] });
      toast.success("Article successfully created.");
    },
  });

  return { createArticle, isLoading, data };
};

export const useUploadImage = () => {
  const { getAccessTokenSilently } = useAuth0();

  const uploadImageRequest = async (formData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(ARTICLE_API_BASE_URL + "/upload-image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    return response.json();
  };

  const {
    mutate: uploadImage,
    data: imageUrl,
    isPending: isLoading,
  } = useMutation({ mutationFn: uploadImageRequest });

  return { uploadImage, imageUrl, isLoading };
};

export const useGetArticles = () => {
  const getArticlesRequest = async (): Promise<Article[]> => {
    const response = await fetch(ARTICLE_API_BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get articles");
    }

    return response.json();
  };

  const { data: articles, isLoading } = useQuery({
    queryKey: ["fetch-articles"],
    queryFn: getArticlesRequest,
    staleTime: 1000 * 60 * 10, // 10 mins
  });

  return { articles, isLoading };
};

export const useGetUserArticles = (userId: string) => {
  const getUserArticlesRequest = async (): Promise<Article[]> => {
    const response = await fetch(`${ARTICLE_API_BASE_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user articles");
    }

    return response.json();
  };

  const { data: articles, isLoading } = useQuery({
    queryKey: ["fetch-user-articles", userId],
    queryFn: getUserArticlesRequest,
    staleTime: 1000 * 60 * 10, // 10 mins
  });

  return { articles, isLoading };
};

export const useGetSingleArticle = (articleId: string) => {
  const getSingleArticleRequest = async (): Promise<Article> => {
    // const getSingleArticleRequest = async () => {
    const response = await fetch(`${ARTICLE_API_BASE_URL}/${articleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get article");
    }

    return response.json();
  };

  const {
    data: article,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetch-single-article", articleId],
    // queryFn: () => (articleId ? getSingleArticleRequest : null),
    queryFn: getSingleArticleRequest,
    staleTime: 1000 * 60 * 10, // 10 mins
    retry: false,
    enabled: !!articleId,
  });

  return { article, isLoading, refetch };
};

export const useUpdateArticle = (articleId: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const updateArticleRequest = async (
    articleData: ArticleFormObject,
  ): Promise<Article> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${ARTICLE_API_BASE_URL}/${articleId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const responseText = await response.text();
      const message = JSON.parse(responseText).message;
      throw new Error(`Failed to update article. ${message && message}`);
    }

    return response.json();
  };

  const queryClient = useQueryClient();

  const { mutate: updateArticle, isPending: isLoading } = useMutation({
    mutationKey: [articleId],
    mutationFn: updateArticleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch-articles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetch-single-article", articleId],
      });
      queryClient.invalidateQueries({ queryKey: ["fetch-user-articles"] });
      toast.success("Article successfully updated.");
    },
  });

  return { updateArticle, isLoading };
};
