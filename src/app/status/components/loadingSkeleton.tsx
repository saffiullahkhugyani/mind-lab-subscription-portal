import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col px-4 space-y-4">
      <div className="w-full space-y-4">
        <Skeleton className="w-[50px] h-[20px]" />
        <Skeleton className="w-full h-[50px]" />
      </div>
      <div className="w-full space-y-4">
        <Skeleton className="w-[70px] h-[20px]" />
        <Skeleton className="w-full h-[50px]" />
      </div>
      <div className="w-full space-y-4">
        <Skeleton className="w-[60px] h-[20px]" />
        <Skeleton className="w-full h-[50px]" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="w-[150px] h-[50px]" />
      </div>
    </div>
  );
}
