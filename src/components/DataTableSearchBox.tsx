import SearchInput from "./SearchInput";
import { SearchData, searchFormSchema } from "../lib/validations";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type DataTableSearchBoxProps = {
  // form: UseFormReturn<{ searchQuery: string }>;
  onSearch: (data: SearchData) => void;
  onReset: () => void;
};

export default function DataTableSearchBox({
  onSearch,
  onReset,
}: DataTableSearchBoxProps) {
  const form = useForm<SearchData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)}>
        <SearchInput
          placeholderText="Search for an article"
          onReset={onReset}
        />
      </form>
    </Form>
  );
}
