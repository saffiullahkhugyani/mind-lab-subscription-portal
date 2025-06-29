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

export const CouponsColumns: ColumnDef<any>[] = [
  {
    accessorKey: "Sr",
    header: () => <div className="tet-right">Sr. no</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "couponCode",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Coupon Code</span> <ArrowUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("couponCode")}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Start Date</span> <ArrowUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("startDate") || "-"}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        End Date <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("endDate") || "-"}</div>;
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
        User Email <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("userEmail")}</div>;
    },
  },
  {
    accessorKey: "programName",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Program Name <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("programName")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div>
          <Badge>
            <span className="text-center text-xs">
              {row.getValue("status")}
            </span>
          </Badge>
        </div>
      );
    },
  },
];
