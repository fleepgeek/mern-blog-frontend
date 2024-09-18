import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string().min(1, { message: "Search text required" }),
});

type SearchData = z.infer<typeof formSchema>;

type SearchFormProps = {
  searchQuery?: string;
};
export default function SearchForm({ searchQuery }: SearchFormProps) {
  const form = useForm<SearchData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    form.reset({ searchQuery: searchQuery });
  }, [form, searchQuery]);

  const handleSearch = (data: SearchData) => {
    navigate(`/search?q=${data.searchQuery}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)}>
        <div
          className={cn(
            "flex rounded-full bg-gray-100",
            form.formState.errors.searchQuery && "border border-red-500",
          )}
        >
          <Button
            variant="ghost"
            className="rounded-full bg-transparent hover:bg-transparent"
            type="submit"
          >
            <Search />
          </Button>
          <div className="w-[200px]">
            <FormField
              name="searchQuery"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Search"
                      className="border-none pl-0 shadow-none focus-visible:ring-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
