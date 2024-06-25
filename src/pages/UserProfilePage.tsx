import { Loader2 } from "lucide-react";
import { useGetCurrentUser } from "../api/UserApi";
import UserProfileForm from "../forms/UserProfileForm";

export default function UserProfilePage() {
  const { currentUser, isLoading } = useGetCurrentUser();

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

  return <UserProfileForm user={currentUser} />;
}
