import {
  PlanCancelDataModel,
  PlanUpgradeDataModel,
} from "@/types/custom-types";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabase.from("plan_cancel_request").select();

    var planUpgradeModelList: PlanCancelDataModel[] = [];

    if (error) throw new Error(error.message);

    data.map((item) =>
      planUpgradeModelList.push({
        id: item.id,
        userId: item.user_id,
        email: item.email,
        currentPlan: item.current_plan,
        reason: item.reason,
        planPrice: item.plan_price,
        completionDate: item.completion_date,
      })
    );

    return NextResponse.json({ success: true, data: planUpgradeModelList });
  } catch (error: any) {
    console.log(`Failed to get list of cancel requests: ${error}`);
    return NextResponse.json(
      { error: `Failed to get list of cancel requests: ${error}` },
      { status: 500 }
    );
  }
}
