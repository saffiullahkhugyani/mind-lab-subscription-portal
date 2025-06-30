"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowUpDownIcon,
  ChevronsUpDownIcon,
  MoreHorizontal,
} from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const UserLogColumns: ColumnDef<any>[] = [
  {
    accessorKey: "Sr",
    header: () => <div className="tet-right">Sr. no</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>User Name</span> <ArrowUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("userName")}</div>;
    },
  },
  {
    accessorKey: "userEmail",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>User Email</span> <ArrowUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("userEmail")}</div>;
    },
  },
  {
    accessorKey: "activity",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Activity <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("activity")}</div>;
    },
  },

  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("date")}</div>;
    },
  },
  {
    accessorKey: "logs",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Logs <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("logs")}</div>;
    },
  },
];
