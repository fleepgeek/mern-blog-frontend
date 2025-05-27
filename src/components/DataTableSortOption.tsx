import { SortOption } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type DataTableSortOptionProps = {
  sortBy?: string;
  sortOptions: SortOption[];
  onChange: (value: string) => void;
};

export default function DataTableSortOption({
  sortOptions,
  sortBy,
  onChange,
}: DataTableSortOptionProps) {
  return (
    <Select defaultValue="-1" value={sortBy} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
