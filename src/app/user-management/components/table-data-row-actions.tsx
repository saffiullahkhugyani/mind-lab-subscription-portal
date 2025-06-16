"use client";
import CustomLoader from "@/components/CustomLoader";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  PlanCancelDataModel,
  PlanUpgradeDataModel,
} from "@/types/custom-types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Row } from "@tanstack/react-table";
import { Check, MoreHorizontal, X } from "lucide-react";
import React, { useState } from "react";

interface DataTableRowActionsProps {
  upgradeRow?: Row<PlanUpgradeDataModel>;
  cancelRow?: Row<PlanCancelDataModel>;
  tableType: "upgrade" | "cancel";
}

export default function TableDataRowActions({
  upgradeRow,
  cancelRow,
  tableType,
}: DataTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isDeclining, setIsDeclining] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"approve" | "decline" | null>(
    null
  );

  const data =
    tableType === "upgrade" ? upgradeRow?.original : cancelRow?.original;

  const { toast } = useToast();

  // Approved API calls
  const handleApprove = async () => {
    if (!data) return;
    setIsApproving(true);
    try {
      if (tableType === "upgrade") {
        console.log("Calling upgrade approve API", data);
        const response = await fetch(
          "/api/user-management/upgrade-requests/update",
          {
            method: "PUT",
            body: JSON.stringify({
              id: data.id,
              studentId: data.studentId,
              status: "Approved",
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          if (result.success) {
            toast({
              title: "Plan Upgrade Approved",
              description: "Student plan upgrade approved",
              variant: "success",
            });
          }
        }
      } else {
        console.log("Calling cancel approve API", data);
        const response = await fetch(
          "/api/user-management/cancel-requests/update",
          {
            method: "PUT",
            body: JSON.stringify({
              id: data.id,
              studentId: data.studentId,
              status: "Approved",
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          if (result.success) {
            toast({
              title: "Plan Cancel Approved",
              description: "Student plan cancelled approved",
              variant: "success",
            });
          }
        }
      }
    } catch (error) {
      console.error("Approval failed:", error);
    } finally {
      setIsOpen(false);
      setActionType(null);
      setIsApproving(false);
    }
  };

  const handleDecline = async () => {
    if (!data) return;
    setIsDeclining(true);
    try {
      if (tableType === "upgrade") {
        console.log("Calling upgrade decline API", data);
        const response = await fetch(
          "/api/user-management/upgrade-requests/update",
          {
            method: "PUT",
            body: JSON.stringify({
              id: data.id,
              studentId: data.studentId,
              status: "Declined",
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          if (result.success) {
            toast({
              title: "Plan Upgrade Declined",
              description: "Student upgrade plan declined",
              variant: "success",
            });
          }
        }
      } else {
        console.log("Calling cancel decline API", data);
        const response = await fetch(
          "/api/user-management/cancel-requests/update",
          {
            method: "PUT",
            body: JSON.stringify({
              id: data.id,
              studentId: data.studentId,
              status: "Declined",
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          if (result.success) {
            toast({
              title: "Plan Cancel Declined",
              description: "Student plan cancel declined",
              variant: "success",
            });
          }
        }
      }
    } catch (error) {
      console.error("Decline failed:", error);
    } finally {
      setIsOpen(false);
      setActionType(null);
      setIsDeclining(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 w-8 h-8">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="bg-accent focus:bg-green-500 hover:cursor-pointer"
            onClick={() => {
              setActionType("approve");
              setIsOpen(true);
            }}
          >
            <div className="flex items-center gap-2">
              <Check />
              <span>Approve</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="bg-accent focus:bg-red-500 hover:cursor-pointer"
            onClick={() => {
              setActionType("decline");
              setIsOpen(true);
            }}
          >
            <div className="flex items-center gap-2">
              <X />
              <span>Decline</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ResponsiveDialog
        title={
          actionType === "approve"
            ? `Approve ${tableType === "upgrade" ? "Upgrade" : "Cancel"} Request`
            : `Decline ${tableType === "upgrade" ? "Upgrade" : "Cancel"} Request`
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to{" "}
            <span className="font-semibold">{actionType}</span> this {tableType}{" "}
            request?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            {actionType === "approve" ? (
              <Button
                onClick={handleApprove}
                variant="success"
                disabled={isApproving || isDeclining}
              >
                {isApproving ? (
                  <CustomLoader className="w-6 h-6 border-white" />
                ) : (
                  "Approve"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleDecline}
                variant="destructive"
                disabled={isApproving || isDeclining}
              >
                {isDeclining ? (
                  <CustomLoader className="w-6 h-6 border-white" />
                ) : (
                  "Decline"
                )}
              </Button>
            )}
          </div>
        </div>
      </ResponsiveDialog>
    </>
  );
}
