import { SquarePen, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Article } from "../types";

type ArticleTableProps = {
  articles: Article[];
};

export default function ArticleTable({ articles }: ArticleTableProps) {
  return (
    <Table>
      <TableCaption>A list of articles written by you.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Number</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article, index) => (
          <TableRow key={article._id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{article.title}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link
                  to={`/edit-article/${article._id}`}
                  className={`${buttonVariants({ variant: "ghost" })} rounded-3xl bg-gray-200 px-[0.4rem] hover:bg-gray-300`}
                >
                  <SquarePen size={16} className="mr-1" />{" "}
                  <p className="text-xs">Edit</p>
                </Link>
                <Button
                  type="button"
                  onClick={() => {}}
                  className="max-h-fit bg-red-500"
                >
                  <Trash2Icon width={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
