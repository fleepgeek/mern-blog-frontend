import { FilterOption } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type DataTableFilterListProps = {
  filterBy: string;
  filterOptions: FilterOption[];
  onChange: (value: string) => void;
};

export default function DataTableFilterList({
  filterBy,
  filterOptions,
  onChange,
}: DataTableFilterListProps) {
  return (
    <Select value={filterBy} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {filterOptions.map((option) => (
          <SelectItem key={option.value} value={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
