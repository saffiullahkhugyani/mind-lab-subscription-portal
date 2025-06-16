"use client";
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { PlanUpgradeRequestDataTable } from "./components/upgrade-request-data-table";
import { UpgradeRequestColumns } from "./components/upgrade-request-columns";
import { PlanCancelRequestDataTable } from "./components/cancel-request-data-table";
import { CancelRequestColumns } from "./components/cancel-request-columns";
import {
  PlanCancelDataModel,
  PlanUpgradeDataModel,
} from "@/types/custom-types";

export default function UserManagementPage() {
  const [planCancelData, setPlanCancelData] = useState<PlanCancelDataModel[]>(
    []
  );
  const [planUpgradeData, setPlanUpgradeData] = useState<
    PlanUpgradeDataModel[]
  >([]);

  const planCancelDataList = async () => {
    try {
      const response = await fetch(
        "/api/user-management/cancel-requests/read",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        if (result.success) {
          console.log(result);
          setPlanCancelData(result.data);
        }
      }
    } catch (error) {
      console.error(`Can not fetch data: ${error}`);
    }
  };

  const planUpgradeDataList = async () => {
    try {
      const response = await fetch(
        "/api/user-management/upgrade-requests/read",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        if (result.success) {
          console.log(result);
          setPlanUpgradeData(result.data);
        }
      }
    } catch (error) {
      console.log(`Can not fetch data: ${error}`);
    }
  };

  useEffect(() => {
    planCancelDataList();
    planUpgradeDataList();
  }, []);

  return (
    <>
      <PageHeader pageTitle="User Management" />
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex-1 p-6 overflow-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {planUpgradeData.length}
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
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {planCancelData.length}
                  </div>
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
            data={planCancelData}
          />
        </div>
      </div>
    </>
  );
}
