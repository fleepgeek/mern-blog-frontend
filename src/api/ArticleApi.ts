import { useMutation, useQuery } from "@tanstack/react-query";
import { Article, Category } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import { ArticleFormObject } from "../forms/ManageArticleForm";
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
    staleTime: 1000 * 60 * 5,
  });

  return { categories, isLoading };
};

export const useCreateArticle = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createArticleRequest = async (articleData: ArticleFormObject) => {
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

  const {
    mutate: createArticle,
    data,
    isPending: isLoading,
  } = useMutation({
    mutationFn: createArticleRequest,
    onSuccess: () => {
      toast.success("Article succefully created.");
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

  const { data: article, isLoading } = useQuery({
    queryKey: ["fetch-single-article", articleId],
    // queryFn: () => (articleId ? getSingleArticleRequest : null),
    queryFn: getSingleArticleRequest,
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: false,
    // enabled: !!articleId,
  });

  return { article, isLoading };
};
