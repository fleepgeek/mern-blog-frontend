import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { Category } from "../types";

type CategoryChipProps = {
  category: Category;
};
export default function CategoryChip({ category }: CategoryChipProps) {
  return (
    <Link
      to={`/category/${category._id}`}
      className={`${buttonVariants({ variant: "ghost" })} rounded-3xl bg-gray-200 hover:bg-gray-300`}
    >
      {category.name}
    </Link>
  );
}
