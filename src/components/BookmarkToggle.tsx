import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import {
  useAddBookmark,
  useGetCurrentUser,
  useRemoveBookmark,
} from "../api/UserApi";

type BookmarkToogleProps = {
  articleId: string;
};

export default function BookmarkToogle({ articleId }: BookmarkToogleProps) {
  const { currentUser } = useGetCurrentUser();
  const { addBookmark, isLoading: isAddingBookmark } = useAddBookmark();
  const { removeBookmark, isLoading: isRemovingBookmark } = useRemoveBookmark();

  const isBookmarked = currentUser?.bookmarkedIds.includes(articleId);

  const handleToggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(articleId);
    } else {
      addBookmark(articleId);
    }
  };

  return (
    <BookmarkButton
      isBookmarked={isBookmarked}
      onToggle={handleToggleBookmark}
      isLoading={isAddingBookmark || isRemovingBookmark}
    />
  );
}

type BookmarkButtonProps = {
  isBookmarked?: boolean;
  onToggle: () => void;
  isLoading?: boolean;
};

export function BookmarkButton({
  isBookmarked = false,
  onToggle,
  isLoading,
}: BookmarkButtonProps) {
  return (
    <Button
      variant="ghost"
      className="p-0 hover:bg-transparent"
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
      disabled={isLoading}
    >
      <Bookmark fill={`${isBookmarked ? "black" : "transparent"}`} />
    </Button>
  );
}
