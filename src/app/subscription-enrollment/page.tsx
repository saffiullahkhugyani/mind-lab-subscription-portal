import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import SubscriptionControltab from "./components/subscription-control/tab";
import TrackSubscriptionsTab from "./components/track-subscriptions/tab";
import PaymentHistoryTab from "./components/payment-history/tab";

export default function SubscriptionEnrollmentPage() {
  return (
    <div className="flex min-h-screen w-full justify-center p-4">
      <Tabs defaultValue="subscription-control" className="w-full">
        <TabsList className="flex w-full p-6">
          <TabsTrigger value="subscription-control">
            Subscription Control Table
          </TabsTrigger>
          <TabsTrigger value="track-subscription">
            Track Subscription
          </TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
        </TabsList>
        <div className="mt-10">
          <TabsContent value="subscription-control">
            <SubscriptionControltab />
          </TabsContent>
          <TabsContent value="track-subscription">
            <TrackSubscriptionsTab />
          </TabsContent>
          <TabsContent value="payment-history">
            <PaymentHistoryTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
