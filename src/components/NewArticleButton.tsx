import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewArticleButton() {
  return (
    <Link to="/new-article">
      <div className="flex gap-1">
        <SquarePen /> <p>Write</p>
      </div>
    </Link>
  );
}
