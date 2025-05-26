import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../components/ui/form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SearchInput from "../components/SearchInput";
import { SearchData, searchFormSchema } from "../lib/validations";

type SearchFormProps = {
  searchQuery?: string;
};
export default function SearchForm({ searchQuery }: SearchFormProps) {
  const form = useForm<SearchData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleSearch = (data: SearchData) => {
    navigate(`/search?q=${data.searchQuery}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)}>
        <SearchInput />
      </form>
    </Form>
  );
}
