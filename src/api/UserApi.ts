import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "../types";
import { toast } from "sonner";
import { UserFormData } from "../forms/UserProfileForm";

type UserCreateData = {
  auth0Id: string;
  email: string;
};

// type UserUpdateData = {
//   name: string;
//   bio: string;
// };

type UserUpdateData = Omit<UserFormData, "email">;

const API_BASE_URL = "http://localhost:7000";

export const useCreateCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCurrentUserRequest = async (userData: UserCreateData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
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

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
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
  });

  return { currentUser, isLoading };
};

export const useUpdateCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateCurrentUserRequest = async (userData: UserUpdateData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
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

  const { mutate: updateUser, isPending: userUpdateIsLoading } = useMutation({
    mutationFn: updateCurrentUserRequest,
    onSuccess: () => {
      toast.success("User succefully updated.");
    },
  });

  return { updateUser, userUpdateIsLoading };
};
