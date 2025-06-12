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
    accessorKey: "paymentHistoryId",
    header: () => <div className="tet-right">Payment History Id</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("paymentHistoryId")}</div>
      );
    },
  },
  {
    accessorKey: "subscriptionId",
    header: () => <div className="tet-right">Subscripion Id</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("subscriptionId")}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="tet-right">User Email</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "paymentDate",
    header: () => <div className="tet-right">Payment Date</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("paymentDate")}</div>;
    },
  },
  {
    accessorKey: "paymentAmount",
    header: () => <div className="tet-right">Payment Amount</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("paymentAmount")}</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div className="tet-right">Payment Status</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("paymentStatus")}</div>;
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
    accessorKey: "transactionId",
    header: () => <div className="tet-right">Transection Id</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("transactionId")}</div>;
    },
  },
  {
    accessorKey: "couponCode",
    header: () => <div className="tet-right">Coupon Code</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("couponCode")}</div>;
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
