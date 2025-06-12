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

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: () => <div className="tet-right">Id</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="tet-right">Name</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="tet-right">Email</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div className="tet-right">Payment Method</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("paymentMethod")}</div>;
    },
  },
  {
    accessorKey: "program",
    header: () => <div className="tet-right">Program</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("program")}</div>;
    },
  },
  {
    accessorKey: "type",
    header: () => <div className="tet-right">Type</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("type")}</div>;
    },
  },
  {
    accessorKey: "paymentCycle",
    header: () => <div className="tet-right">Payment Cycle</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("paymentCycle")}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: () => <div className="tet-right">Start Date</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("startDate")}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="tet-right">Price</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("price")}</div>;
    },
  },

  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     return <TableDataRowActions row={row} />;
  //   },
  // },
];
