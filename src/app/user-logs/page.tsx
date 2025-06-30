import PageHeader from "@/components/page-header";
import { DatePicker } from "@/components/ui/date-picker";
import React from "react";
import { UserLogDataTable } from "./components/user-log-data-table";
import { UserLogColumns } from "./components/user-log-columns";

const UserLogDummyData = [
  {
    userName: "Janet",
    userEmail: "janet@abc.com",
    activity: "Login",
    date: "1-02-2005",
    logs: "User logged in",
  },
  {
    userName: "Jamal",
    userEmail: "jamal@abc.com",
    activity: "Payment",
    date: "1-02-2005",
    logs: "User submit payment",
  },
  {
    userName: "Akram",
    userEmail: "akram@abc.com",
    activity: "Special Deal",
    date: "1-02-2005",
    logs: "User Checked Special deal",
  },
  {
    userName: "Yonis",
    userEmail: "yonis@abc.com",
    activity: "logout",
    date: "1-02-2005",
    logs: "User logged out",
  },
];

export default function UserLogs() {
  return (
    <>
      <PageHeader pageTitle="Export User Logs" />
      <div className="flex flex-col  border shadow-md rounded m-6 p-6 gap-6">
        <span className="text-lg font-semibold ">Filter Criteria</span>
        <div className="flex gap-6 items-center justify-center">
          <DatePicker label="Start Date" />
          <span>TO</span>
          <DatePicker label="End Date" />
        </div>
      </div>
      <div className="m-6">
        <UserLogDataTable columns={UserLogColumns} data={UserLogDummyData} />
      </div>
    </>
  );
}
