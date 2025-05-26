import SearchInput from "./SearchInput";
import { SearchData, searchFormSchema } from "../lib/validations";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type DataTableSearchBoxProps = {
  // form: UseFormReturn<{ searchQuery: string }>;
  handleSearch: (data: SearchData) => void;
  handleReset: () => void;
};

export default function DataTableSearchBox({
  handleSearch,
  handleReset,
}: DataTableSearchBoxProps) {
  const form = useForm<SearchData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSearch)}>
          <SearchInput
            placeholderText="Search for an article"
            onReset={handleReset}
          />
        </form>
      </Form>
    </div>
  );
}
