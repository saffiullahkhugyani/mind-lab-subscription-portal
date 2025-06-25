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
import { Skeleton } from "@/components/ui/skeleton";

export default function UpgradeManagementPage() {
  const [planCancelData, setPlanCancelData] = useState<PlanCancelDataModel[]>(
    []
  );
  const [planUpgradeData, setPlanUpgradeData] = useState<
    PlanUpgradeDataModel[]
  >([]);
  const [fetchingData, setFetchingData] = useState<boolean>(true);

  const fetchPlanCancelAndUpgradeRequests = async () => {
    try {
      const [cancelRes, upgradeRes] = await Promise.all([
        fetch("/api/upgrade-management/cancel-requests/read", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        fetch("/api/upgrade-management/upgrade-requests/read", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ]);

      if (!cancelRes.ok || !upgradeRes.ok) {
        throw new Error();
      }
      const [cancelData, upgradeData] = await Promise.all([
        cancelRes.json().then((data) => data.data),
        upgradeRes.json().then((data) => data.data),
      ]);
      setPlanCancelData(cancelData);
      setPlanUpgradeData(upgradeData);
    } catch (error: any) {
      console.log("Error: ", error);
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => {
    fetchPlanCancelAndUpgradeRequests();
  }, []);

  return (
    <>
      <PageHeader pageTitle="Upgrade Management" />
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col p-6 gap-6 overflow-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!fetchingData ? (
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
            ) : (
              <Skeleton className="h-[140px]" />
            )}

            {!fetchingData ? (
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
            ) : (
              <Skeleton className="h-[140px]" />
            )}
          </div>

          {/* Plan Upgrade Request Table */}
          {!fetchingData ? (
            <PlanUpgradeRequestDataTable
              columns={UpgradeRequestColumns}
              data={planUpgradeData}
            />
          ) : (
            <Skeleton className="h-[150px]" />
          )}

          {/* Plan Cancellation Request Table */}
          {!fetchingData ? (
            <PlanCancelRequestDataTable
              columns={CancelRequestColumns}
              data={planCancelData}
            />
          ) : (
            <Skeleton className="h-[150px]" />
          )}
        </div>
      </div>
    </>
  );
}
