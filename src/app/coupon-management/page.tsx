"use client";
import PageHeader from "@/components/page-header";
import { CouponDetailsModel } from "@/types/custom-types";
import React, { useEffect, useState } from "react";
import { CouponsDataTable } from "./component/coupon-data-table";
import { CouponsColumns } from "./component/coupons-columns";
import { Skeleton } from "@/components/ui/skeleton";
import { data } from "autoprefixer";

export default function CouponManagement() {
  const [fetchingData, setFetchingData] = useState<boolean>(true);
  const [couponData, setCouponsData] = useState<CouponDetailsModel[] | null>(
    []
  );
  useEffect(() => {
    const fetchCouponCodesData = async () => {
      setFetchingData(true);
      try {
        const response = await fetch("/api/coupon-management/get-all-coupons", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok) {
          setCouponsData(result.data);
        }
      } catch (error) {
      } finally {
        setFetchingData(false);
      }
    };
    fetchCouponCodesData();
  }, []);

  return (
    <div>
      <PageHeader pageTitle="Coupon Management" />
      {fetchingData ? (
        <div className="flex flex-col space-y-3 p-6">
          <div className="flex justify-between">
            <Skeleton className="w-[200px] h-[30px] bg-gray-300" />
            <Skeleton className="w-[200px] h-[30px] bg-gray-300" />
          </div>
          <Skeleton className="w-full h-[200px] bg-gray-300" />
        </div>
      ) : (
        <div className=" p-6">
          {" "}
          <CouponsDataTable columns={CouponsColumns} data={couponData!} />
        </div>
      )}
    </div>
  );
}
