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
  studentId: string;
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
  studentId: string;
};

export type SpecialDealSendedEmailModel = {
  id?: number;
  userEmail?: string | null;
  programName?: string | null;
  dateSend?: string | null;
  status?: string | null;
};

export type Users = {
  age?: string | null;
  email?: string | null;
  gender?: string | null;
  id: string;
  is_profile_complete?: boolean | null;
  mobile?: string | null;
  name?: string | null;
  nationality?: string | null;
  profile_image_url?: string | null;
  role_id?: number | null;
  signup_method?: string | null;
  updated_at?: string | null;
};

export interface SpecialDealEmailPayload {
  userId: string;
  userName: string;
  userEmail: string;
  programId: number;
  programName: string;
  specialDealUrl: string;
  prices: {
    normal: {
      oneMonth: number;
      threeMonth: number;
      twelveMonth: number;
    };
    special: {
      oneMonth: number;
      threeMonth: number;
      twelveMonth: number;
    };
    discounts: {
      oneMonth: string;
      threeMonth: string;
      twelveMonth: string;
    };
  };
}
