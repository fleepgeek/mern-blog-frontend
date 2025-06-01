import { Category } from "../lib/types";
import CategoryChip from "./CategoryChip";

type CategoryListProps = {
  categories: Category[];
};
export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <ul className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <li key={category._id}>
          <CategoryChip category={category} />
        </li>
      ))}
    </ul>
  );
}
