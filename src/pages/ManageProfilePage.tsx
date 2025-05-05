import { Loader2 } from "lucide-react";
import { useGetCurrentUser, useUpdateCurrentUser } from "../api/UserApi";
import UserProfileForm from "../forms/UserProfileForm";

export default function ManageProfilePage() {
  const { currentUser, isLoading } = useGetCurrentUser();
  const { updateUser, userUpdateIsLoading } = useUpdateCurrentUser();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <h3 className="text-xl">Failed to get user</h3>;
  }

  return (
    <UserProfileForm
      user={currentUser}
      onSave={updateUser}
      isLoading={userUpdateIsLoading}
    />
  );
}
