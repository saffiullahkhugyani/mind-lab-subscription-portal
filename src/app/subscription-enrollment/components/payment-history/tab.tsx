import React from "react";
import { HistoryDataTable } from "./history-data-table";
import { columns } from "./history-columns";

// Sample data
const history = [
  {
    paymentHistoryId: "1",
    subscriptionId: "321",
    email: "emily.johnson@example.com",
    paymentDate: "2025-03-10",
    paymentAmount: "100 AED",
    paymentStatus: "Completed",
    paymentMethod: "card",
    transactionId: "TXN-ABCDE12345",
    couponCode: "null",
  },
  {
    paymentHistoryId: "2",
    subscriptionId: "432",
    email: "jhon.higgens@example.com",
    paymentDate: "2025-03-10",
    paymentAmount: "100 AED",
    paymentStatus: "Completed",
    paymentMethod: "coupon",
    transactionId: "TXN-HTGRF12345",
    couponCode: "x2s34",
  },
  {
    paymentHistoryId: "3",
    subscriptionId: "231",
    email: "ahmed.noor@example.com",
    paymentDate: "2025-03-10",
    paymentAmount: "100 AED",
    paymentStatus: "Completed",
    paymentMethod: "card",
    transactionId: "TXN-GFRDE12345",
    couponCode: "null",
  },
];

export default function PaymentHistoryTab() {
  return (
    <div>
      <HistoryDataTable columns={columns} data={history} />
    </div>
  );
}
