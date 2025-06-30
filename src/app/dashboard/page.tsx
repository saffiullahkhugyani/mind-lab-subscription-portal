import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import TopPrograms from "./components/top-programs";
import ProgramActions from "./components/program-actions";
import { AllProgramsDataTable } from "./components/all-programs-data-table";
import { columns } from "./components/all-programs-columns";
import {
  getAllClubs,
  getAllProgramsAction,
  getAllProgramSubscriptions,
  getAllTopProgramsAction,
} from "./actions/actions";
import StatusAction from "./components/status-action";
import SubscriptionAction from "./components/subscription-action";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const allPrograms = await getAllProgramsAction();
  const clubs = await getAllClubs();
  const topPrograms = await getAllTopProgramsAction();
  const programSubscriptionList = await getAllProgramSubscriptions();

  // Combine programs with their active subscriptions
  const programsWithSubscriptions =
    allPrograms.data?.map((program) => {
      // Find active subscription for this program
      const activeSubscription = programSubscriptionList.data?.find(
        (sub) =>
          sub.programId === program.programId &&
          sub.subscriptionStatus === "Active"
      );

      return {
        ...program,
        subscriptionType: activeSubscription?.subscriptionType || "none",
      };
    }) || [];

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/*Top programs section*/}
        <TopPrograms
          clubs={clubs.data!}
          allPrograms={allPrograms.data!}
          getTopPrograms={topPrograms.data!}
        />
        {/* Program Actions Section */}
        <ProgramActions />
        {/*all programs section*/}
        <AllProgramsDataTable
          columns={columns}
          data={programsWithSubscriptions}
        />
        {/* <AllPrograms /> */}
      </div>
      <div>
        <StatusAction />
        <SubscriptionAction />
      </div>
    </div>
  );
}
