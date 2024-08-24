import { Button } from "./ui/button";

type CommentDeleteOverlayProps = {
  open: boolean;
  onDelete: () => void;
  onCancel: () => void;
  isDeleting: boolean;
};

export default function CommentDeleteOverlay({
  open,
  onDelete,
  onCancel,
  isDeleting,
}: CommentDeleteOverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center rounded-t-3xl bg-white/90 md:rounded-none">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl tracking-tight">Delete</h2>
        <span className="*:text-sm">
          <p>Deleted comments are gone forever</p>
          <p>Are you sure?</p>
        </span>

        <div className="mt-8 flex items-center justify-evenly">
          <Button
            type="button"
            variant="ghost"
            className="bg-transparent"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="rounded-full"
            onClick={onDelete}
            disabled={isDeleting}
          >
            Delete Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
