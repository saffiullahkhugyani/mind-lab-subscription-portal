import React from "react";
import { TrackSubscriptionDataTable } from "./track-subscription-data-table";
import { columns } from "./track-subscription-columns";

// Sample data
const trackSubscriptionsDummyData = [
  {
    email: "jorden.white@example.com",
    paymentMethod: "card",
    subscriptionId: "QXQ65",
    paymentCycle: "1 Month",
    numberOfCycle: "Inventor program",
    lastCycleStatus: "Normal",
    cancelDate: "23/10/2025",
    price: "100 AED",
  },
  {
    email: "michael.brown@example.com",
    paymentMethod: "card",
    subscriptionId: "QXQX2",
    paymentCycle: "3 Month",
    numberOfCycle: "Inventor program",
    lastCycleStatus: "Promotion",
    cancelDate: "03/08/2025",
    price: "300 AED",
  },
  {
    email: "harry.brown@example.com",
    paymentMethod: "Coupon",
    subscriptionId: "QXQ65",
    paymentCycle: "3 Month",
    numberOfCycle: "Inventor program",
    lastCycleStatus: "Promotion",
    cancelDate: "21/06/2025",
    price: "250 AED",
  },
];

export default function TrackSubscriptionsTab() {
  return (
    <div>
      <TrackSubscriptionDataTable
        columns={columns}
        data={trackSubscriptionsDummyData}
      />
    </div>
  );
}
