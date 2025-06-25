export type ProgramSubscriptionModel = {
  subscriptionId?: number | null;
  clubId?: number | null;
  clubName?: string | null;
  programId?: number | null;
  programName?: string | null;
  programStatus?: string | null;
  subscriptionType?: string | null;
  planOneMonth?: number | null;
  planThreeMonth?: number | null;
  planTwelveMonth?: number | null;
  effectiveFrom?: string | null;
  effectiveTo?: string | null;
  subscriptionStatus?: string | null;
  startDate?: string | null;
};

export type PlanUpgradeDataModel = {
  currentPlan?: string | null;
  currentPrice?: string | null;
  email?: string | null;
  id?: number;
  userId: string;
  upgradePlan?: string | null;
  upgradePrice?: string | null;
};

export type PlanCancelDataModel = {
  completionDate?: string | null;
  currentPlan?: string | null;
  email?: string | null;
  id?: number;
  planPrice?: string | null;
  reason?: string | null;
  userId: string;
};
