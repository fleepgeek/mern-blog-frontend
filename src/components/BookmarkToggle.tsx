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
  const [marked, setMarked] = useState(isBookmarked);

  useEffect(() => {
    setMarked(isBookmarked);
  }, [isBookmarked]);

  return (
    <Button
      variant="ghost"
      className="p-0 hover:bg-transparent"
      onClick={(e) => {
        e.preventDefault();
        setMarked((prev) => !prev);
        if (!isLoading) {
          onToggle();
        }
      }}
    >
      <Bookmark fill={`${marked ? "black" : "transparent"}`} />
    </Button>
  );
}
