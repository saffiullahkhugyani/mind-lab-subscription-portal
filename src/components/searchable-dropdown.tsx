"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SearchableDropdownProps<T> {
  items: T[];
  placeholder?: string;
  buttonClassName?: string;
  onSelect: (item: T) => void;
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
  hideSearchLabel?: boolean;
  isEmail?: boolean;
}

export function SearchableDropdown<T>({
  items,
  placeholder = "Search by name or ID...",
  buttonClassName = "justify-between",
  onSelect,
  getLabel,
  getValue,
  hideSearchLabel = false,
  isEmail = false,
}: SearchableDropdownProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const selectedItem = items.find((item) => getValue(item) === selectedValue);

  // Filter items based on search query
  // const filteredItems = searchQuery
  //   ? items.filter((item) =>
  //       getLabel(item).toLowerCase().includes(searchQuery.trim().toLowerCase())
  //     )
  //   : items;

  const filteredItems = searchQuery
    ? items.filter((item) => {
        const label = getLabel(item).toString().toLowerCase();
        const value = getValue(item).toString().toLowerCase();
        const query = searchQuery.trim().toLowerCase();
        return label.includes(query) || value.includes(query);
      })
    : items;

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <div className="grid space-y-2">
          {!hideSearchLabel && (
            <Label className="text-xl font-bold">Search</Label>
          )}
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("max-w-[300px] justify-between", buttonClassName)}
          >
            {selectedItem ? `${getLabel(selectedItem)}` : "Search for user..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No sponsors found.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => {
                const value = getValue(item);
                const label = getLabel(item);
                return (
                  <CommandItem
                    key={value}
                    value={`${label} ${value}`}
                    onSelect={() => {
                      setSelectedValue(value);
                      onSelect(item);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="flex flex-col">
                      <span className="font-medium">{label}</span>
                      <span className="text-xs text-muted-foreground">
                        {isEmail ? `Email: ${value}` : `ID: ${value}`}
                      </span>
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
