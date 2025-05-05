import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import {
  useAddBookmark,
  useGetCurrentUser,
  useRemoveBookmark,
} from "../api/UserApi";
import { useEffect, useState } from "react";

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
      marked={isBookmarked}
      onToggle={handleToggleBookmark}
      isLoading={isAddingBookmark || isRemovingBookmark}
    />
  );
}

type BookmarkButtonProps = {
  marked?: boolean;
  onToggle: () => void;
  isLoading?: boolean;
};

export function BookmarkButton({
  marked,
  onToggle,
  isLoading,
}: BookmarkButtonProps) {
  const [isMarked, setIsMarked] = useState(marked);

  useEffect(() => {
    setIsMarked(marked);
  }, [marked]);

  return (
    <Button
      variant="ghost"
      className="p-0 hover:bg-transparent"
      onClick={(e) => {
        e.preventDefault();
        setIsMarked((prev) => !prev);
        if (!isLoading) {
          onToggle();
        }
      }}
    >
      <Bookmark fill={`${isMarked ? "black" : "transparent"}`} />
    </Button>
  );
}
