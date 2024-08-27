import { User } from "../types";

type UserProfileInfoProps = {
  user: User;
};

export default function UserProfileInfo({ user }: UserProfileInfoProps) {
  return (
    <div className="flex items-center gap-6 md:flex-col md:items-start">
      <div className="size-12 rounded-full bg-gray-400 md:size-20"></div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold md:text-xl">{user.name}</h3>
        <p className="hidden text-sm text-gray-500 md:block">
          {user.bio || "No bio yet"}
        </p>
      </div>
    </div>
  );
}
