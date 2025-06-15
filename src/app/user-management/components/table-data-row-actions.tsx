import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Check, MoreHorizontal, X } from "lucide-react";
import React from "react";

export default function TableDataRowActions({ row }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="p-0 w-8 h-8">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className={"bg-accent focus:bg-green-500 hover:cursor-pointer"}
          onClick={() => console.log("Approved")}
        >
          <div className="flex items-center gap-2">
            <Check />
            <span>Approve</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-accent focus:bg-red-500 hover:cursor-pointer"
          onClick={() => console.log("Declined")}
        >
          <div className="flex items-center gap-2">
            <X />
            <span>Decline</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
