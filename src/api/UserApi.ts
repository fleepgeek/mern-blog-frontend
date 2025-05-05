import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Article, User } from "../types";
import { toast } from "sonner";
import { UserFormData } from "../forms/UserProfileForm";

type UserCreateData = {
  auth0Id: string;
  email: string;
};

type UserUpdateData = Omit<UserFormData, "email">;

const USER_API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/users";

export const useCreateCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCurrentUserRequest = async (userData: UserCreateData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${USER_API_BASE_URL}/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user!");
    }
  };

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: createCurrentUserRequest,
  });

  return { createUser, isPending };
};

export const useGetCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getCurrentUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${USER_API_BASE_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get current user");
    }

    return response.json();
  };

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUserRequest,
    staleTime: 1000 * 60 * 10, // 10 mins
  });

  return { currentUser, isLoading };
};

export const useUpdateCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateCurrentUserRequest = async (userData: UserUpdateData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${USER_API_BASE_URL}/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("User update failed!");
    }
  };

  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: userUpdateIsLoading } = useMutation({
    mutationFn: updateCurrentUserRequest,
    onSuccess: () => {
      toast.success("User succefully updated.");
      queryClient.invalidateQueries({
        queryKey: ["get-current-user"],
      });
    },
  });

  return { updateUser, userUpdateIsLoading };
};

export const useAddBookmark = () => {
  const { getAccessTokenSilently } = useAuth0();
  const addBookmarkRequest = async (id: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${USER_API_BASE_URL}/me/bookmarks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Failed to add bookmark");
    }
  };

  const queryClient = useQueryClient();

  const { mutate: addBookmark, isPending: isLoading } = useMutation({
    mutationFn: addBookmarkRequest,
    onSuccess: () => {
      toast.success("Bookmark added");
      queryClient.invalidateQueries({
        queryKey: ["get-current-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-bookmarks"],
      });
    },
  });

  return { addBookmark, isLoading };
};

export const useRemoveBookmark = () => {
  const { getAccessTokenSilently } = useAuth0();
  const removeBookmarkRequest = async (id: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${USER_API_BASE_URL}/me/bookmarks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Failed to remove bookmark");
    }
  };

  const queryClient = useQueryClient();

  const { mutate: removeBookmark, isPending: isLoading } = useMutation({
    mutationFn: removeBookmarkRequest,
    onSuccess: () => {
      toast.success("Bookmark removed");
      queryClient.invalidateQueries({
        queryKey: ["get-current-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-user-bookmarks"],
      });
    },
  });

  return { removeBookmark, isLoading };
};

export const useGetBookmarks = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getBookmarksRequest = async (): Promise<Article[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${USER_API_BASE_URL}/me/bookmarks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Failed to get user bookmarks");
    }

    return response.json();
  };

  const { data: articles, isLoading } = useQuery({
    queryKey: ["get-user-bookmarks"],
    queryFn: getBookmarksRequest,
    staleTime: 1000 * 60 * 10, // 10 mins
  });

  return { articles, isLoading };
};

export const useGetUser = (id?: string) => {
  const getUserRequest = async (): Promise<User> => {
    const response = await fetch(`${USER_API_BASE_URL}/${id}`);
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Failed to get user");
    }
    return response.json();
  };

  const { data: user, isPending: isLoading } = useQuery({
    queryKey: ["get-user", id],
    queryFn: getUserRequest,
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 mins
  });

  return { user, isLoading };
};
