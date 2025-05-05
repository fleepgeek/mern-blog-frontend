import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { FormControl } from "./ui/form";
import { Button } from "./ui/button";
import { forwardRef } from "react";

type ComboBoxProps = {
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (val: string) => void;
  title: string;
};

const ComboBox = forwardRef<HTMLButtonElement, ComboBoxProps>(function ComboBox(
  { options, value, onChange, title, ...rest }: ComboBoxProps,
  ref,
) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl {...rest}>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !value && "text-muted-foreground",
            )}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : `Select ${title}`}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${title}...`} className="h-9" />
          <CommandEmpty>No {title} found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value === value ? "" : option.value);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

export default ComboBox;
