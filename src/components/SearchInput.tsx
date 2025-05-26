import { useFormContext } from "react-hook-form";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, X } from "lucide-react";
import { FormField, FormItem, FormControl } from "../components/ui/form";

type SearchInputProps = {
  placeholderText?: string;
  onInputChange?: (text: string) => void;
  onReset?: () => void;
};

export default function SearchInput({
  placeholderText = "Search",
  onReset,
}: SearchInputProps) {
  const { formState, control, reset } = useFormContext();

  const handleReset = () => {
    reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <div
      className={cn(
        "flex rounded-full bg-gray-100",
        formState.errors.searchQuery && "border border-red-500",
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
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholderText}
                  className="border-none pl-0 shadow-none focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <Button
        type="button"
        variant="outline"
        className="self-end rounded-full border-none bg-transparent shadow-none hover:bg-transparent"
        size="icon"
        onClick={handleReset}
      >
        <X />
      </Button>
    </div>
  );
}
