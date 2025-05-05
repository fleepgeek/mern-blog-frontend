import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Article,
  ArticleApiResponse,
  ArticleQueryObject,
  Category,
} from "../types";
import { useAuth0 } from "@auth0/auth0-react";
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
    staleTime: Infinity,
    // staleTime: 1000 * 60 * 10, // 10 mins
  });

  return { categories, isLoading };
};

export const useCreateArticle = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createArticleRequest = async (
    articleFormData: FormData,
  ): Promise<Article> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(ARTICLE_API_BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: articleFormData,
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
    reset,
  } = useMutation({
    mutationFn: createArticleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-articles"] });
      queryClient.invalidateQueries({ queryKey: ["fetch-user-articles"] });
      queryClient.invalidateQueries({
        queryKey: ["fetch-articles-by-category"],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetch-current-user-articles"],
      });
      toast.success("Article successfully created.");
    },
  });

  return { createArticle, isLoading, data, reset };
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

type ArticleRequestParams = {
  pageParam: number;
  categoryId?: string;
  searchQuery?: string;
  userId?: string;
};

const getArticlesRequest = async ({
  pageParam,
  categoryId,
  searchQuery,
  userId,
}: ArticleRequestParams): Promise<ArticleApiResponse> => {
  let url = "";

  if (categoryId) {
    url = `${ARTICLE_API_BASE_URL}/category/${categoryId}?page=${pageParam}`;
  } else if (searchQuery) {
    url = `${ARTICLE_API_BASE_URL}/search?searchQuery=${searchQuery}&page=${pageParam}`;
  } else if (userId) {
    url = `${ARTICLE_API_BASE_URL}/user/${userId}?page=${pageParam}`;
  } else {
    url = `${ARTICLE_API_BASE_URL}?page=${pageParam}`;
  }

  const response = await fetch(url, {
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

export const useGetArticles = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["fetch-articles"],
      queryFn: ({ pageParam }) => getArticlesRequest({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagingInfo.page === lastPage.pagingInfo.pages) {
          return null;
        }
        return lastPage.pagingInfo.page + 1;
      },
      staleTime: 1000 * 60 * 10, // 10 mins
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

export const useGetArticlesByCategory = (categoryId?: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["fetch-articles-by-category", categoryId],
      queryFn: ({ pageParam }) => getArticlesRequest({ pageParam, categoryId }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagingInfo.page === lastPage.pagingInfo.pages) {
          return null;
        }
        return lastPage.pagingInfo.page + 1;
      },
      enabled: !!categoryId,
      staleTime: 1000 * 60 * 10, // 10 mins
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

export const useGetArticlesByUser = (userId?: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["fetch-articles-by-user", userId],
      queryFn: ({ pageParam }) => getArticlesRequest({ pageParam, userId }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagingInfo.page === lastPage.pagingInfo.pages) {
          return null;
        }
        return lastPage.pagingInfo.page + 1;
      },
      enabled: !!userId,
      staleTime: 1000 * 60 * 10, // 10 mins
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

export const useSearchArticles = (searchQuery?: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["fetch-searched-articles", searchQuery],
      queryFn: ({ pageParam }) =>
        getArticlesRequest({ pageParam, searchQuery }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagingInfo.page === lastPage.pagingInfo.pages) {
          return null;
        }
        return lastPage.pagingInfo.page + 1;
      },
      enabled: !!searchQuery,
      staleTime: 1000 * 60 * 10, // 10 mins
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
};

export const useGetCurrentUserArticles = (
  articleQueryObj: ArticleQueryObject,
) => {
  const { getAccessTokenSilently } = useAuth0();
  const getUserArticlesRequest = async (): Promise<ArticleApiResponse> => {
    const accessToken = await getAccessTokenSilently();
    const params = new URLSearchParams();
    params.set("page", articleQueryObj.page.toString());

    const response = await fetch(
      `${ARTICLE_API_BASE_URL}/me?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get current user articles");
    }

    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["fetch-current-user-articles", articleQueryObj],
    queryFn: getUserArticlesRequest,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10, // 10 mins
  });

  return { data, isLoading };
};

// We make articleId optional because useParams would first render with undefined
// before the id is gotten. Its kind of a hooks things. It renders a bunch of times
export const useGetSingleArticle = (articleId?: string) => {
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
    articleFormData: FormData,
  ): Promise<Article> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${ARTICLE_API_BASE_URL}/${articleId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: articleFormData,
    });

    if (!response.ok) {
      const responseText = await response.text();
      const message = JSON.parse(responseText).message;
      throw new Error(`Failed to update article. ${message && message}`);
    }

    return response.json();
  };

  const queryClient = useQueryClient();

  const {
    mutate: updateArticle,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: updateArticleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch-articles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetch-single-article", articleId],
      });
      queryClient.invalidateQueries({ queryKey: ["fetch-user-articles"] });
      queryClient.invalidateQueries({
        queryKey: ["fetch-articles-by-category"],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetch-current-user-articles"],
      });
      toast.success("Article successfully updated.");
    },
  });

  return { updateArticle, isLoading, data };
};

export const useDeleteArticle = () => {
  const { getAccessTokenSilently } = useAuth0();
  const deleteArticleRequest = async (articleId: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${ARTICLE_API_BASE_URL}/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete Article");
    }
  };

  const queryClient = useQueryClient();

  const { mutate: onDelete, isPending: isLoading } = useMutation({
    mutationFn: deleteArticleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-articles"] });
      queryClient.invalidateQueries({ queryKey: ["fetch-user-articles"] });
      queryClient.invalidateQueries({
        queryKey: ["fetch-articles-by-category"],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetch-current-user-articles"],
      });
      toast.success("Article successfully deleted.");
    },
  });

  return { onDelete, isLoading };
};
