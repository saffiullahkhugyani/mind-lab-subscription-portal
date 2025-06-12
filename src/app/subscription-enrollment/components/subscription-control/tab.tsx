import React from "react";
import { SubscriptionControlDataTable } from "./subscription-control-data-table";
import { columns } from "./subscription-control-columns";

// Sample data
const subscriptions = [
  {
    id: "QXQX1",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    paymentMethod: "coupon",
    program: "Robotic Program",
    type: "Normal",
    paymentCycle: "1 Month",
    startDate: "03/08/2025",
    price: "100 AED",
  },
  {
    id: "QXQX2",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    paymentMethod: "card",
    program: "Inventor program",
    type: "Promotion",
    paymentCycle: "3 Month",
    startDate: "03/08/2025",
    price: "300 AED",
  },
  {
    id: "QXQX3",
    name: "Jessica Williams",
    email: "jessica.williams@example.com",
    paymentMethod: "card",
    program: "littel inventor program",
    type: "Special Deal",
    paymentCycle: "1 Month",
    startDate: "03/08/2025",
    price: "200 AED",
  },
];

export default function SubscriptionControltab() {
  return (
    <div>
      <SubscriptionControlDataTable columns={columns} data={subscriptions} />
    </div>
  );
}
