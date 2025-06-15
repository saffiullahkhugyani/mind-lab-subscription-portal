import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Check, Search, X } from "lucide-react";
import { Input } from "postcss";
import React from "react";
import { PlanUpgradeRequestDataTable } from "./components/upgrade-request-data-table";
import { UpgradeRequestColumns } from "./components/upgrade-request-columns";
import { PlanCancelRequestDataTable } from "./components/cancel-request-data-table";
import { CancelRequestColumns } from "./components/cancel-request-columns";

export default function UserManagementPage() {
  const planUpgradeData = [
    {
      userId: "11",
      email: "Email@gmail.com",
      currentPlan: "1 month",
      upgradePlan: "3 month",
      currentPrice: "100 AED",
      upgradePrice: "300 AED",
    },
    {
      userId: "11",
      email: "Email@gmail.com",
      currentPlan: "1 month",
      upgradePlan: "3 month",
      currentPrice: "100 AED",
      upgradePrice: "300 AED",
    },
  ];

  const planCancellationData = [
    {
      userId: "11",
      email: "Email@gmail.com",
      currentPlan: "1 month",
      reason: "Reason 1",
      planPrice: "100 AED",
      completionDate: "03/08/2025",
    },
    {
      userId: "11",
      email: "Email@gmail.com",
      currentPlan: "1 month",
      reason: "Reason 1",
      planPrice: "100 AED",
      completionDate: "03/08/2025",
    },
  ];

  return (
    <>
      <PageHeader pageTitle="User Management" />
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="lex-1 p-6 overflow-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    10
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Plan upgrade
                    <br />
                    Request
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
                  <div className="text-sm font-medium text-gray-600">
                    Plan Cancellation
                    <br />
                    Request
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plan Upgrade Request Table */}
          <PlanUpgradeRequestDataTable
            columns={UpgradeRequestColumns}
            data={planUpgradeData}
          />

          {/* Plan Cancellation Request Table */}
          <PlanCancelRequestDataTable
            columns={CancelRequestColumns}
            data={planCancellationData}
          />
        </div>
      </div>
    </>
  );
}
