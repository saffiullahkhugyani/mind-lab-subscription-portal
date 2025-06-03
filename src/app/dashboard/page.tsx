import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import TopPrograms from "./components/top-programs";
import ProgramActions from "./components/program-actions";
import AllPrograms from "./components/all-programs";
import { AllProgramsDataTable } from "./components/all-programs-data-table";
import { columns } from "./components/all-programs-columns";
import {
  getAllClubs,
  getAllProgramsAction,
  getAllTopProgramsAction,
} from "./actions/actions";
import StatusAction from "./components/status-action";
import SubscriptionAction from "./components/subscription-action";

const programs = [
  {
    id: 1,
    name: "Program 1",
    color: "bg-purple-500",
    icon: "Camera",
    status: "active",
    subType: "standard",
    startDate: "",
  },
  {
    id: 2,
    name: "Program 2",
    color: "bg-teal-500",
    icon: "Building",
    status: "active",
    subType: "standard",
    startDate: "",
  },
  {
    id: 3,
    name: "Program 3",
    color: "bg-pink-500",
    icon: "Video",
    status: "active",
    subType: "standard",
    startDate: "01/may/2025",
  },
  {
    id: 4,
    name: "Program 4",
    color: "bg-blue-600",
    icon: "Mic",
    status: "active",
    subType: "standard",
    startDate: "01/may/2025",
  },
];

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
        <AllProgramsDataTable columns={columns} data={programs} />
        {/* <AllPrograms /> */}
      </div>
      <div>
        <StatusAction />
        <SubscriptionAction />
      </div>
    </div>
  );
}
