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
    accessorKey: "subscriptionId",
    header: () => <div className="tet-right">Subscription Id</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("subscriptionId")}</div>
      );
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
    accessorKey: "numberOfCycle",
    header: () => <div className="tet-right">Number of Cycles</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("numberOfCycle")}</div>;
    },
  },
  {
    accessorKey: "lastCycleStatus",
    header: () => <div className="tet-right">Last Cycle Date</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("lastCycleStatus")}</div>
      );
    },
  },
  {
    accessorKey: "cancelDate",
    header: () => <div className="tet-right">Cancel Date</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("cancelDate")}</div>;
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
