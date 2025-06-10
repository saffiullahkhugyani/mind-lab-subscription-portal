"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ProgramSubscriptionModel } from "@/types/custom-types";

interface ProgramInfoProps {
  programSubscriptionList: ProgramSubscriptionModel[] | null;
}

const ProgramInfoPanel = ({ programSubscriptionList }: ProgramInfoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = programSubscriptionList![currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < programSubscriptionList!.length - 1)
      setCurrentIndex((prev) => prev + 1);
  };

  if (!data) {
    return (
      <div className="flex justify-center">
        <span className="font-bold text-lg">
          No program subscription available
        </span>
      </div>
    );
  }
  return (
    <div className="">
      <div>
        <Label className=" flex  justify-center text-lg font-bold mb-5 text-gray-700">
          Program Info
        </Label>
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <Label>Program Status</Label>
          <Input disabled value={data.programStatus ?? ""} />
        </div>

        <div className="space-y-1">
          <Label>Subscription Status</Label>
          <Input disabled value={data.subscriptionStatus ?? ""} />
        </div>

        <div className="space-y-1">
          <Label>Subscription Type</Label>
          <Input disabled value={data.subscriptionType ?? ""} />
        </div>

        <div className="space-y-1">
          <Label>Program Plan</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              disabled
              value={data.planOneMonth ?? ""}
              placeholder="1 Month"
            />
            <Input
              disabled
              value={data.planThreeMonth ?? ""}
              placeholder="3 Month"
            />
            <Input
              disabled
              value={data.planTweleveMonth ?? ""}
              placeholder="12 Month"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label>Program Plan Effective Dates</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              disabled
              value={data.effectiveFrom ?? ""}
              placeholder="From"
            />
            <Input disabled value={data.effectiveTo ?? ""} placeholder="To" />
          </div>
        </div>

        <div className="flex items-center justify-center pt-4 space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{currentIndex + 1}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === programSubscriptionList!.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500">
          number of assigned status
        </p>
      </div>
    </div>
  );
};

export default ProgramInfoPanel;
