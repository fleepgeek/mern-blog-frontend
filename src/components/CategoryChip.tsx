import { NavLink } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { Category } from "../types";
import { cn } from "../lib/utils";

type CategoryChipProps = {
  category: Category;
};
export default function CategoryChip({ category }: CategoryChipProps) {
  return (
    <NavLink
      to={`/category/${category._id}`}
      className={({ isActive }) =>
        cn(
          buttonVariants({ variant: "ghost" }),
          "rounded-3xl bg-gray-200 hover:bg-gray-400",
          isActive && "bg-gray-400",
        )
      }
    >
      {category.name}
    </NavLink>
  );
}
