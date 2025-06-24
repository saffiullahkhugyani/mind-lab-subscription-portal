"use client";
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import ClickableCard from "./components/clickable-card";
import { Edit, Plus, Send, Trash2 } from "lucide-react";
import { SpecialDealDataTable } from "./components/special-deal-data-table";
import { SpecialDealColumns } from "./components/special-deal-columns";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import SendSpecialDeal from "./components/SendSpecialDeal";
import CreateEmailTemplate from "./components/CreateEmailTemplate";
import {
  ProgramSubscriptionModel,
  SpecialDealSendedEmailModel,
  Users,
} from "@/types/custom-types";
import { useToast } from "@/hooks/use-toast";
import { Programs } from "@/types/types";

const enum DialogEnum {
  SEND_SPECIAL_DEAL = "SEND_SPECIAL_DEAL",
  SEND_SPECIAL_DEAL_BULK = "SEND_SPECIAL_DEAL_BULK",
}

export default function SpecialDealPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogEnum | null>(null);
  const [specialDealSendedEmails, setSpecialDealSendedEmails] = useState<
    SpecialDealSendedEmailModel[]
  >([]);
  const [users, setUsers] = useState<Users[] | null>(null);
  const [programs, setPrograms] = useState<Programs[] | null>(null);
  const [programSubscription, setProgramSubscription] = useState<
    ProgramSubscriptionModel[] | null
  >(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [emailRes, usersRes, programsRes, programSubscriptionRes] =
          await Promise.all([
            fetch("/api/special-deal/get-sended-emails", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }),
            fetch("/api/users/get-users", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }),
            fetch("/api/programs/get", {
              method: "GET",
              headers: {
                "Content-type": "application/json",
              },
            }),
            fetch("/api/program-subscription/get", {
              method: "GET",
              headers: {
                "Content-type": "application/json",
              },
            }),
          ]);

        if (
          !emailRes.ok ||
          !usersRes.ok ||
          !programsRes.ok ||
          !programSubscriptionRes.ok
        ) {
          console.log("API Failed to get data");
        }

        const [emailData, usersData, programsData, programSubscriptionData] =
          await Promise.all([
            emailRes.json().then((data) => data.data),
            usersRes.json().then((data) => data.data),
            programsRes.json().then((data) => data.data),
            programSubscriptionRes.json().then((data) => data.data),
          ]);

        setSpecialDealSendedEmails(emailData);
        setUsers(usersData);
        setPrograms(programsData);
        setProgramSubscription(programSubscriptionData);
      } catch (error: any) {
        console.log("failed to fetch data: ", error);
      }
    };
    fetchAllData();
  }, [isOpen]);

  return (
    <>
      <PageHeader pageTitle="Special Deal" />
      <div className="flex-1 p-6 overflow-auto">
        {/* send email Cards */}
        <div className="flex gap-6 mb-8">
          <ClickableCard
            title="Send Special Deal"
            icon={Send}
            onClick={() => {
              setDialogType(DialogEnum.SEND_SPECIAL_DEAL);
              setIsOpen(true);
            }}
          />
          <ClickableCard title="Send Special Deal in bulk" icon={Send} />
        </div>

        <div>
          <SpecialDealDataTable
            columns={SpecialDealColumns}
            data={specialDealSendedEmails}
          />
        </div>
      </div>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={
          dialogType === DialogEnum.SEND_SPECIAL_DEAL
            ? "Send Special Deal Email"
            : "Send Special Deal Email in Bulk"
        }
      >
        {dialogType === DialogEnum.SEND_SPECIAL_DEAL && (
          <SendSpecialDeal
            setIsOpen={setIsOpen}
            users={users}
            programs={programs}
            programSubscription={programSubscription}
          />
        )}
        {/* {dialogType === DialogEnum.CREATE_EMAIL_TEMPLATE && (
          <CreateEmailTemplate setIsOpen={setIsOpen} />
        )} */}
      </ResponsiveDialog>
    </>
  );
}
